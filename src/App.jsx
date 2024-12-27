import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTrip from "./create-trip/CreateTrip";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/ViewTrip";
import TripSave from "./mrTrip/TripSave";
import Footer from "./view-trip/[tripId]/components/Footer";
import Navbar from "./components/ui/custom/Navbar";

export default function App() {
  return (
    <div className="bg-[#000000] min-h-screen relative pb-5">
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
        >
          <Navbar />
          <Toaster />
          <Routes>
            <Route index path="/" element={<LandingPage />}></Route>
            <Route path="/create-trip" element={<CreateTrip />}></Route>
            <Route path="/view-trip/:tripId" element={<ViewTrip />}></Route>
            <Route path="/my-trip" element={<TripSave />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}
