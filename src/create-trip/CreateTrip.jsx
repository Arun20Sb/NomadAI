import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Core UI and Form Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// AI and External API Integrations
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// Firebase Firestore Utilities
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
// Other Utilities:
import { format } from "date-fns";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AutocompleteInput from "@/service/AutocompleteInput";
import animationData from "../assets/calender1.json";

// Constants and Configuration
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/Options";
// Dialog Components for User Interactions
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
import { Calendar } from "@/components/ui/calendar";

// API Configuration from Environment
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

const CreateTripForm = () => {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({});

  const navigate = useNavigate();

  // 📝 Form Input Handling Methods
  const handleInputChange = (e, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handlePlaceChange = (value) => {
    setPlace(value);
    setFormInfo((prev) => ({ ...prev, destination: value }));
  };

// 🔐 Google Authentication Methods
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

// 👤 User Profile Retrieval Method
const getUserProfile = (tokenInfo) => {
  const token = tokenInfo?.access_token;
  if (!token) {
    toast("Invalid token.");
    return;
  }

  axios
    .get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      toast("Failed to authenticate. Please try again.");
    });
};


  // 🚀 Trip Generation Core Logic
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    const requiredFields = ["destination", "budget", "travelers", "days"];

    const missingFields = requiredFields.filter((field) => !formInfo[field]);

    if (missingFields.length > 0) {
      toast(
        `Please fill in the following fields: ${missingFields.join(", ")} 📝`
      );
      return;
    }

    if (formInfo?.days > 7) {
      toast("Please enter Trip Days less than or equal to 7");
      return;
    }

    if (!place) {
      toast("Please select a place to travel.");
      return;
    }

    if (!startDate) {
      toast("Please select a valid date.");
      return;
    }

    const formattedDate = format(startDate, "dd-MM-yyyy");

    const updatedFormInfo = {
      ...formInfo,
      date: formattedDate,
    };

    const Final_Prompt = AI_PROMPT.replace(
      "{location}",
      updatedFormInfo?.destination
    )
      .replace("{totalDays}", updatedFormInfo?.days)
      .replace("{traveler}", updatedFormInfo?.travelers)
      .replace("{budget}", updatedFormInfo?.budget)
      .replace("{date}", formattedDate);

    try {
      setIsLoading(true);
      const genAI = new GoogleGenerativeAI(`${apiKey}`);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = Final_Prompt;

      const result = await model.generateContent(prompt);
      if (result?.response.text()) {
        toast("Your trip plan has been generated successfully! 🎉");
        saveAiTrip(result.response.text(), updatedFormInfo);
      } else {
        toast("Sorry, we couldn't generate your trip plan at the moment.");
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast(
        "An error occurred while generating your trip plan. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 💾 Trip Saving to Firestore
  const saveAiTrip = async (tripDetails, formInfo) => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();

    try {
      await setDoc(doc(db, "AiGeneratedTrips", docID), {
        userSelect: formInfo,
        tripDetails: JSON.parse(tripDetails),
        userEmail: user?.email,
        id: docID,
      });
      navigate(`/view-trip/${docID}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 mx-28 flex flex-col gap-12 p-6 bg-gray-900 text-gray-50 rounded-lg shadow-xl px-20">
      {/* 🌍 Destination Selection Section */}
      <div>
        <h2 className="text-xl font-semibold bg-gray-800 p-3 inline-block rounded-md shadow-md">
          What is your destination of choice?
        </h2>
        <AutocompleteInput
          apiKey={GEOAPIFY_API_KEY}
          onChange={handlePlaceChange}
          placeholder="Enter your destination (e.g., Paris, Tokyo)"
          className="mt-3 w-full px-4 py-2 rounded-md border border-gray-700 bg-black text-white focus:ring focus:ring-green-400"
        />
      </div>

      {/* ⏱️ Trip Duration Section */}
      <div>
        <h2 className="text-xl font-semibold bg-gray-800 p-3 inline-block rounded-md shadow-md">
          How many days are you planning your trip?
        </h2>
        <Input
          placeholder="Ex. 3"
          type="number"
          min={1}
          max={7}
          onChange={(e) => handleInputChange(e, "days")}
          onWheel={(e) => e.preventDefault()}
          className="mt-3 w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-50 focus:ring focus:ring-green-400"
        />
      </div>

      {/* 📅 Date Selection Section */}
      <div>
        <h2 className="text-xl font-semibold bg-gray-800 p-3 inline-block rounded-md shadow-md">
          When are you going?
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-16 mt-3">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            className="rounded-md border"
          />
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-[500px] h-auto"
          />
        </div>
      </div>

      {/* 💰 Budget Selection Section */}
      <div>
        <h2 className="text-xl font-semibold bg-gray-800 p-3 inline-block rounded-md shadow-md">
          What is your Budget?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                handleInputChange({ target: { value: item.title } }, "budget")
              }
              className={`p-4 border rounded-lg cursor-pointer text-center transition-transform duration-200 ease-in-out transform hover:scale-105
            ${
              formInfo?.budget === item.title
                ? "border-green-400 shadow-lg bg-gray-800"
                : "bg-gray-900 border-gray-700"
            }`}
            >
              <h2 className="text-3xl pb-1">{item.icon}</h2>
              <h2 className="font-bold text-lg pb-1 underline">{item.title}</h2>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 👥 Travelers Selection Section */}
      <div>
        <h2 className="text-xl font-semibold bg-gray-800 p-3 inline-block rounded-md shadow-md">
          Who do you plan to travel with?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-5">
          {SelectTravelList.map((place, index) => (
            <div
              key={index}
              onClick={() =>
                handleInputChange(
                  { target: { value: place.people } },
                  "travelers"
                )
              }
              className={`p-4 border rounded-lg cursor-pointer text-center transition-transform duration-200 ease-in-out transform hover:scale-105
            ${
              formInfo?.travelers === place.people
                ? "border-green-400 shadow-lg bg-gray-800"
                : "bg-gray-900 border-gray-700"
            }`}
            >
              <h2 className="text-3xl pb-1">{place.icon}</h2>
              <h2 className="font-bold text-lg underline pb-1">
                {place.title}
              </h2>
              <p className="text-sm">{place.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 Generate Trip Button */}
      <div className="my-10 flex justify-center items-center to-gray-50 bg-black w-fit translate-x-1/2 ">
        <Button onClick={onGenerateTrip} disabled={isLoading}>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/* 🔑 Login Dialog */}
      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="text-white">
            {" "}
            {/* Add text-white class here */}
            <DialogHeader>
              <DialogTitle className="text-white">
                {" "}
                {/* Add text-white here too */}
                Sign in with Google
              </DialogTitle>
            </DialogHeader>
            <Button onClick={login} className="text-white bg-purple-300">
              {" "}
              {/* Button text white */}
              Continue with Google
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              className="text-white"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CreateTripForm;
