import UserTripDetail from "@/components/UserTripDetail";
import { f_database } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Import your Button component

function Trip() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  // Fetch user trips from Firebase
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
      console.log(userTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    getUserTrips();
  }, []);

  const handleShowDetails = (tripId) => {
    navigate(`/trip-details/${tripId}`); // Navigate to trip details page
  };

  return (
    <div className="py-16 px-5 sm:px-10 md:px-20 lg:px-20 min-h-screen">
      {/* Catchy Heading Section */}
      <div className="text-start mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
          Explore Your Dream Destinations
        </h2>
        <p className="text-xl text-gray-600 italic mb-6">
          "Adventure awaits those who dare to dream."
        </p>
        <div className="w-24 border-b-4 border-indigo-600 mb-8"></div>
      </div>

      {/* Card Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white p-3 rounded-lg shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <UserTripDetail trip={trip} />
              <Button
                className="mt-4 w-fit py-3 text-lg text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleShowDetails(trip.id)}
              >
                Show Details
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No trips found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Trip;
