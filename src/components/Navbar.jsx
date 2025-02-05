import { Link, useNavigate } from "react-router-dom";
import logoPro from "/logoPro.png";
import city from "/city.jpg";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    <nav className="sticky top-0 z-50 py-4 px-6 backdrop-blur-lg border-b border-neutral-700/80 flex items-center justify-between text-gray-300">
      {/* Logo and Brand */}
      <Link
        to="/"
        className="text-xl font-bold cursor-pointer flex items-center gap-2 hover:text-purple-400 transition duration-300"
      >
        <img src={logoPro} alt="Logo" className="rounded-lg w-8" />
        <span className="font-semibold text-2xl">JetSetGo</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-10 items-center text-lg">
        {navLinks.map((navlink, index) => (
          <li
            key={index}
            className="cursor-pointer hover:scale-105 transition-all ease-in-out hover:text-purple-400 hover:underline"
          >
            {navlink}
          </li>
        ))}
      </div>

      {/* User Profile & Login */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-full py-2 px-4 font-semibold text-sm hover:bg-purple-500 hover:text-white transition"
              onClick={() => navigate("/saved-trips")}
            >
              My Trips
            </Button>

            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-2">
                  <img
                    src={user.picture || city}
                    alt="Profile"
                    className="h-[36px] w-[36px] rounded-full"
                  />
                  <span className="font-bold text-sm">{user.given_name}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-black text-white p-4 rounded-md shadow-lg">
                <h2
                  className="cursor-pointer font-mono font-bold hover:text-red-500"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                    toast("User Logout successful! 💔");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="text-white bg-purple-500 hover:bg-purple-600 py-2 px-6 rounded-full font-semibold"
          >
            Sign In
          </Button>
        )}
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
