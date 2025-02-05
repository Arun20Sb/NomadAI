import { Route, Routes } from "react-router-dom";

// Import your page components
import CreateTrip from "./pages/CreateTrip";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import ViewTrip from "./pages/ViewTrip";
import TripSave from "./pages/TripSave";

// Import additional UI components and providers
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="backdrop-blur-lg min-h-screen relative">
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
