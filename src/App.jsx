import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTrip from "./create-trip/CreateTrip";
import Header from "./components/ui/custom/Header";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/ViewTrip";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
        >
          <Header />
          <Toaster />
          <Routes>
            <Route index path="/" element={<LandingPage />}></Route>
            <Route path="/create-trip" element={<CreateTrip />}></Route>
            <Route path="/view-trip/:tripId" element={<ViewTrip />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}
