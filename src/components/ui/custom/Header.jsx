import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "../button";
import logoPro from "/logoPro.png";
import city from "/city.jpg";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  // LOGIN:
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

  // User Profile:
  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
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
    <header className="flex items-center sm:justify-between justify-evenly p-5 bg-white text-gray-800 shadow-sm">
      <Link to="/" className="text-xl font-bold cursor-pointer flex gap-2">
        <img src={logoPro} alt="Logo" className="rounded-lg w-8" />
        <span>JetSetGo</span>
      </Link>
      <div className="max-md:hidden md:block">
        <ul className="flex gap-10 justify-evenly text-lg">
          <li className="cursor-pointer text-gray-500 hover:scale-105 hover:text-gray-900 transition-all ease-in-out">
            Accomodation
          </li>
          <li className="cursor-pointer text-gray-500 hover:scale-105 hover:text-gray-900 transition-all ease-in-out">
            Destinations
          </li>
          <li className="cursor-pointer text-gray-500 hover:scale-105 hover:text-gray-900 transition-all ease-in-out">
            About Us
          </li>
          <li className="cursor-pointer text-gray-500 hover:scale-105 hover:text-gray-900 transition-all ease-in-out">
            Contact Us
          </li>
        </ul>
      </div>
      <div>
        {user ? (
          <div className="flex flex-col items-center justify-center">
            <Button
              variant="outline"
              className="rounded-full mb-2 font-bold"
              onClick={() => navigate("/my-trip")}
            >
              My Trips
            </Button>
            <Popover>
              <PopoverTrigger>
                <div className="flex flex-col items-center justify-center">
                  {!user.picture ? (
                    <img
                      src={user.picture || city}
                      alt="🔥"
                      className="h-[36px] w-[36px] rounded-full"
                    />
                  ) : (
                    <span className="font-bold">🔥{user.given_name}</span>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer font-mono font-bold hover:text-red-500"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                    toast("User Logout successfull! 💔");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      {/* Login Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="/logo2.jpg"
                alt="🔥"
                width={152}
                className="rounded-lg"
              />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely.</p>

              <Button className="w-full mt-5 flex items-center" onClick={login}>
                <FcGoogle />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
