import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SegmentsProvider } from "./context/SegmentsContext";
import { ProfileProvider } from "./context/ProfileContext";
import { LanguageProvider } from "./context/LanguageContext";
import LandingPage from "./pages/LandingPage";
import LandingPageV2 from "./pages/LandingPageV2";
import LandingPageV3 from "./pages/LandingPageV3";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import CreatorProfilePage from "./pages/CreatorProfilePage";
import MyBusiness from "./pages/MyBusiness";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import ContentStudio from "./pages/ContentStudio";
import Settings from "./pages/Settings";
import MyPage from "./pages/MyPage";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";
import MarketingCampaigns from "./pages/MarketingCampaigns";
import NotFound from "./pages/NotFound";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <SegmentsProvider>
        <ProfileProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/v2" element={<LandingPageV2 />} />
                <Route path="/v3" element={<LandingPageV3 />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/creator/:slug" element={<CreatorProfilePage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Authenticated app routes */}
                <Route path="/app" element={<MyPage />} />
                <Route path="/my-business" element={<MyBusiness />} />
                <Route path="/dashboard" element={<Navigate to="/my-business" replace />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/content-studio" element={<ContentStudio />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/campaigns" element={<MarketingCampaigns />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ProfileProvider>
      </SegmentsProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
