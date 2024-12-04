import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/Options";
import { toast } from "sonner";
import { format } from "date-fns";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AutocompleteInput from "@/service/AutocompleteInput";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e, name) => {
    const value = typeof e === "object" ? e.target.value : e;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceChange = (value) => {
    setPlace(value);
    setFormInfo((prev) => ({ ...prev, destination: value }));
  };

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
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast("Failed to authenticate. Please try again.");
      });
  };

  // Generate Trip Button:
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

  // Save Trip Details:
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
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10 mb-5">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Customize your dream trip with our AI-powered travel planner
      </p>

      {/* Form Sections */}
      <div className="mt-20 flex flex-col gap-9">
        {/* Destination */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <AutocompleteInput
            apiKey={GEOAPIFY_API_KEY}
            onChange={handlePlaceChange}
            placeholder="Enter your destination (e.g., Paris, Tokyo)"
          />
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            min={1}
            max={7}
            onChange={(e) => handleInputChange(e, "days")}
            onWheel={(e) => e.preventDefault()}
          />
        </div>

        {/* Date Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">When are you going?</h2>
          <div className="flex justify-evenly">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              className="rounded-lg border"
            />

            <img
              src="/calender.jpg"
              alt="Travel inspiration"
              className="w-[450px] mt-6 hidden md:block rounded-lg filter brightness-125 relative bottom-5"
            />
          </div>
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-6 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  handleInputChange({ target: { value: item.title } }, "budget")
                }
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${
                  formInfo?.budget === item.title
                    ? "shadow-lg border-black"
                    : ""
                }
              `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan to travel with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-5">
            {SelectTravelList.map((place, index) => (
              <div
                key={index}
                onClick={() =>
                  handleInputChange(
                    { target: { value: place.people } },
                    "travelers"
                  )
                }
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${
                    formInfo?.travelers === place.people &&
                    "shadow-lg border-black"
                  }
                  `}
              >
                <h2 className="text-4xl">{place.icon}</h2>
                <h2 className="font-bold text-lg">{place.title}</h2>
                <h2 className="text-sm text-gray-500">{place.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="my-10 flex justify-end">
        <Button onClick={onGenerateTrip} disabled={isLoading}>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/* Login Dialog */}
      {openDialog && (
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
              <DialogDescription>
                <img
                  src="/logo2.jpg"
                  alt="JetSetGo"
                  width={152}
                  className="rounded-lg"
                />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely.</p>
                <Button
                  className="w-full mt-5 flex items-center"
                  onClick={login}
                >
                  <FcGoogle />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default CreateTrip;
