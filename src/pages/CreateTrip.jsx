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
import { f_database } from "@/service/firebaseConfig";
// Other Utilities:
import { toast } from "sonner";
import AutocompleteInput from "@/service/AutocompleteInput";
import animationData from "../assets/calender1.json";
import loadingAnimation from "../assets/airplane.json";

// Constants and Configuration
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/Options";
import Lottie from "lottie-react";
import LoginDialog from "@/components/LoginDialog";

// API Configuration from Environment
const GeminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
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
      toast("Successfully signed in! 🤝");
    },
    onError: (error) => {
      console.error(error);
      toast("Login failed. Please try again.");
    },
  });

  // 👤 User Profile Retrieval Method
  const getUserProfile = async (tokenInfo) => {
    const token = tokenInfo?.access_token;
    if (!token) {
      toast("Invalid token.");
      return;
    }

    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      onGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Failed to authenticate. Please try again. 💀");
    }
  };

  // 🚀 Trip Generation Core Logic
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Any Details missing?
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
    // Final Prompt SetUp, given to AI:
    const Final_Prompt = AI_PROMPT.replace("{location}", formInfo?.destination)
      .replace("{totalDays}", formInfo?.days)
      .replace("{traveler}", formInfo?.travelers)
      .replace("{budget}", formInfo?.budget)
      .replace("{date}", formInfo?.startDate);

    try {
      setIsLoading(true);
      // ---------------------- Gen-AI Usage starts ----------------------
      const genAI = new GoogleGenerativeAI(`${GeminiApiKey}`);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = Final_Prompt;

      const result = await model.generateContent(prompt);
      console.log(result?.response.text());
      // ---------------------- Gen-AI Usage starts ----------------------

      if (result?.response.text()) {
        // 💾 Save Trip to Firebase Database:
        saveAiTrip(result.response.text(), formInfo);
        toast("Your trip plan has been generated successfully! 🎉");
      } else {
        toast("Sorry, we couldn't generate your trip plan at the moment !! 💀");
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast(
        "An error occurred while generating your trip plan. Please try again. 💀"
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
      await setDoc(doc(f_database, "NomadAI", docID), {
        userSelect: formInfo,
        tripDetails: JSON.parse(tripDetails),
        userEmail: user?.email,
        id: docID,
      });
      navigate(`/trip-details/${docID}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-[#A4DCEF] pt-20 w-full">
          <Lottie animationData={loadingAnimation} className="w-full h-full" />
        </div>
      ) : (
        <div className="pt-32 flex flex-col gap-12 text-gray-950 rounded-lg shadow-xl lg:px-20 px-6 bg-[#EEE9D4]">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Fill Your Trip Details
          </h1>

          {/* 🌍 Destination Selection Section */}
          <div className="flex flex-col gap-12 lg:flex-row-reverse lg:justify-evenly">
            <div className="flex flex-col gap-2 lg:w-1/2">
              <h2 className="text-xl font-semibold border border-green-500 p-3 inline-block rounded-md text-green-600">
                Where Are You Headed?
              </h2>
              <AutocompleteInput
                apiKey={GEOAPIFY_API_KEY}
                onChange={handlePlaceChange}
                placeholder="Enter your dream destination (e.g., Paris, Tokyo)"
                className="mt-3 w-full px-4 py-2 rounded-md border border-gray-700 text-white focus:ring focus:ring-green-400"
              />
            </div>

            <div className="lg:w-1/2 flex flex-col gap-12">
              {/* ⏱️ Trip Duration Section */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold border border-green-500 p-3 inline-block rounded-md text-green-600">
                  How Long Will Your Adventure Be?
                </h2>
                <Input
                  placeholder="Ex. 3"
                  type="number"
                  min={1}
                  max={7}
                  onChange={(e) => handleInputChange(e, "days")}
                  onWheel={(e) => e.preventDefault()}
                  className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-50 text-gray-950 focus:ring focus:ring-green-400"
                />
              </div>

              {/* 📅 Date Selection Section */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold border border-green-500 p-3 inline-block rounded-md text-green-600">
                  When Are You Setting Off?
                </h2>
                <div className="flex items-start gap-16">
                  <div className="p-5 relative">
                    <input
                      type="date"
                      value={startDate || ""}
                      onChange={(e) => {
                        handleInputChange(e, "date");
                        setStartDate(e.target.value);
                      }}
                      className="p-3 w-full max-w-xs border-2 border-gray-600 bg-gray-50 text-gray-950 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {startDate && (
                      <p className="text-lg text-gray-950">
                        You’re going on:{" "}
                        <span className="text-violet-950 font-mono font-bold">
                          {new Date(startDate).toDateString()}
                        </span>
                      </p>
                    )}
                    <Button
                      onClick={() => setStartDate(null)}
                      className="mt-2 bg-black text-white hover:bg-gray-700"
                    >
                      Clear Date
                    </Button>
                  </div>
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-[500px] h-auto flex max-md:hidden"
                  />
                </div>
              </div>

              {/* 💰 Budget Selection Section */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold border border-green-500 p-3 inline-block rounded-md text-green-600">
                  What’s Your Travel Budget?
                </h2>
                <div className="flex flex-wrap gap-6 mt-5">
                  {SelectBudgetOptions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        handleInputChange(
                          { target: { value: item.title } },
                          "budget"
                        )
                      }
                      className={`p-4 border bg-gray-50 text-gray-950 rounded-lg cursor-pointer text-center transition-transform duration-200 ease-in-out transform hover:scale-105
                ${
                  formInfo?.budget === item.title
                    ? "bg-green-400 shadow-lg "
                    : " border-gray-700"
                }`}
                    >
                      <h2 className="text-3xl pb-1">{item.icon}</h2>
                      <h2 className="font-bold text-lg pb-1">{item.title}</h2>
                      <p className="text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 👥 Travelers Selection Section */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold border border-green-500 p-3 inline-block rounded-md text-green-600">
                  Who’s Joining You On This Journey?
                </h2>
                <div className="flex flex-wrap gap-6 mt-5">
                  {SelectTravelList.map((place, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        handleInputChange(
                          { target: { value: place.people } },
                          "travelers"
                        )
                      }
                      className={`p-4 border rounded-lg cursor-pointer bg-gray-50 text-gray-950 text-center transition-transform duration-200 ease-in-out transform hover:scale-105
                ${
                  formInfo?.travelers === place.people
                    ? "bg-green-400 shadow-lg"
                    : "border-gray-700"
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
              <div className="my-10 flex justify-center items-center border-2 border-green-500 text-green-500 w-fit px-5 py-1 shadow-lg hover:text-gray-50 hover:bg-gray-950">
                <Button onClick={onGenerateTrip} disabled={isLoading}>
                  Generate Your Trip
                </Button>
              </div>

              {/* 🔑 Login Dialog */}
              {openDialog && (
                <LoginDialog
                  open={openDialog}
                  setOpenDialog={setOpenDialog}
                  login={login}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTripForm;
