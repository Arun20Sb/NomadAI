import { Link, useNavigate } from "react-router-dom";
import city from "/city.jpg";
import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "./ui/button";
import LoginDialog from "./LoginDialog";

const navLinks = ["About Us", "Pricing", "Destination", "Contact Us"];

function Navbar() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // LOGIN
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserProfile(tokenResponse);
      toast("User Signed In! 🍾 lfg🚀");
    },
    onError: (error) => {
      console.log(error);
      toast("Login failed. Please try again.");
    },
  });

  // User Profile
  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast("Failed to authenticate. Please try again.");
      });
  };

  return (
    <nav className="absolute top-0 z-50 py-3 px-7 backdrop-blur-lg border-b border-neutral-700/80 flex max-sm:flex-col max-sm:gap-2 items-center justify-between text-gray-950 w-full">
      {/* Logo and Brand */}
      <div className="flex gap-20">
        <Link
          to="/"
          className="text-xl font-bold cursor-pointer flex items-center gap-2"
        >
          <img
            src="https://img.icons8.com/?size=100&id=16588&format=png&color=000000"
            alt="Logo"
            className="rounded-lg w-12"
          />
          <span className="font-semibold text-2xl">NomadAI</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10 items-center text-lg list-none">
          {navLinks.map((navlink, index) => (
            <li
              key={index}
              className="list-none cursor-pointer hover:scale-105 transform transition-all text-[17px]  hover:text-purple-400 duration-300"
            >
              {navlink}
            </li>
          ))}
        </div>
      </div>

      {/* User Profile & Login */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={user.picture || city}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="font-bold text-xl">{user.given_name}</span>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="rounded-md py-1 px-3 font-semibold text-sm bg-white text-gray-900 transition hover:bg-black hover:text-white"
          >
            Sign In
          </Button>
        )}
        <Button
          variant="outline"
          className="rounded-md py-1 px-3 font-semibold text-sm bg-white text-gray-900 transition hover:bg-black hover:text-white"
          onClick={() => {
            googleLogout();
            localStorage.clear();
            navigate("/");
            toast("User Logout successful! 💔");
          }}
        >
          Log Out
        </Button>
      </div>

      {/* Login Dialog */}
      <LoginDialog
        open={openDialog}
        setOpenDialog={setOpenDialog}
        login={login}
      />
    </nav>
  );
}

export default Navbar;
