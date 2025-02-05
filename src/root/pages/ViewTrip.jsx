import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSec from "../../components/InfoSec";
import Hotels from "../../components/Hotels";
import DailyPlan from "../../components/DailyPlan";

function ViewTrip() {
  const { tripId } = useParams();
  const [tripDb, setTripDb] = useState({});

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // Fetching:
  const GetTripData = async () => {
    const docRef = doc(db, "AiGeneratedTrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTripDb(docSnap.data());
    } else {
      console.log("No such document!");
      toast("No trip found!🍃");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Information Section */}
      <div className="mb-8 rounded-lg bg-white p-6">
        <InfoSec tripDb={tripDb} />
      </div>

      {/* Recommended Hotels Section */}
      <div className="mb-8 shadow-lg rounded-lg bg-white p-6">
        <Hotels tripDb={tripDb} />
      </div>

      {/* Daily Plan Section */}
      <div className="shadow-lg rounded-lg bg-white p-6">
        <DailyPlan tripDb={tripDb} />
      </div>
    </div>
  );
}

export default ViewTrip;
