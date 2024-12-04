import { db } from "@/service/firebaseConfig";
import UserTripDetail from "@/view-trip/[tripId]/components/UserTripDetail";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function trip() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  /**
   * Used to get all user trips
   */
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AiGeneratedTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      setUserTrips((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10 mb-5">
      <h2 className="font-semibold text-xl text-gray-700 mb-5 border-2 px-7 py-2 inline-block border-b-blue-500 border-t-green-500 border-l-yellow-500 border-r-orange-500">
        My Trips
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 grid-cols-1 py-2">
        {userTrips.map((trip, idx) => (
          <div
            key={trip.id}
            className="flex flex-wrap gap-2 items-center justify-center p-4 rounded-lg shadow-sm hover:-translate-y-2 duration-200 cursor-pointer bg-gray-100"
          >
            <UserTripDetail trip={trip} key={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default trip;
