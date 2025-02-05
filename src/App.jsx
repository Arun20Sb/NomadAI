import { Route, Routes } from "react-router-dom";

// Import your page components
import CreateTrip from "./create-trip/CreateTrip";
import LandingPage from "./root/pages/LandingPage";
import PageNotFound from "./root/pages/PageNotFound";
import ViewTrip from "./root/pages/ViewTrip";
import TripSave from "./mrTrip/TripSave";

// Import additional UI components and providers
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#000000] min-h-screen relative pb-5">
      {/* Global Navbar that appears on every page */}
      <Navbar />
      
      <Toaster />
      {/* Define routes for the application */}
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trip-details/:tripId" element={<ViewTrip />} />
        <Route path="/saved-trips" element={<TripSave />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Global Footer that appears on every page */}
      <Footer />
    </div>
  );
}
