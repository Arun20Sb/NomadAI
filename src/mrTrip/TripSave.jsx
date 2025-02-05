import UserTripDetail from "@/components/UserTripDetail";
import { f_database } from "@/db/firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";  // Import your Button component

function Trip() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  // Function to fetch user trips
  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(f_database, "NomadAI"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    getUserTrips();
  }, []); // Fetch data once on component mount

  const handleShowDetails = (tripId) => {
    navigate(`/trip-details/${tripId}`); // Navigate to the trip details page
  };

  return (
    <div className="bg-gray-50 py-10 px-5 sm:px-10 md:px-32 lg:px-56 min-h-screen">
      <h2 className="font-semibold text-3xl text-gray-800 mb-6 text-center">
        My Trips
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <UserTripDetail trip={trip} />
              <Button
                className="mt-4 w-full"
                onClick={() => handleShowDetails(trip.id)} // On button click, navigate to details page
              >
                Show Details
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No trips found.</p>
        )}
      </div>
    </div>
  );
}

export default Trip;
