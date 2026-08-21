import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/shared/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import CorporateTravel from "./pages/CorporateTravel";
import VisaAssistance from "./pages/VisaAssistance";
import Contact from "./pages/Contact";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import NotFound from "./pages/NotFound";

// Admin
import { AuthProvider } from "./admin/AuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import DestinationsManager from "./admin/pages/DestinationsManager";
import AlbumsManager from "./admin/pages/AlbumsManager";
import ServicesManager from "./admin/pages/ServicesManager";
import CoreValuesManager from "./admin/pages/CoreValuesManager";
import WhyChooseManager from "./admin/pages/WhyChooseManager";
import CorporateServicesManager from "./admin/pages/CorporateServicesManager";
import VisaSupportManager from "./admin/pages/VisaSupportManager";
import SiteSettings from "./admin/pages/SiteSettings";
import MessagesManager from "./admin/pages/MessagesManager";

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/corporate-travel" element={<CorporateTravel />} />
          <Route path="/visa-assistance" element={<VisaAssistance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:id" element={<AlbumDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="destinations" element={<DestinationsManager />} />
            <Route path="albums" element={<AlbumsManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="core-values" element={<CoreValuesManager />} />
            <Route path="why-choose" element={<WhyChooseManager />} />
            <Route path="corporate-services" element={<CorporateServicesManager />} />
            <Route path="visa-support" element={<VisaSupportManager />} />
            <Route path="settings" element={<SiteSettings />} />
            <Route path="messages" element={<MessagesManager />} />
          </Route>
        </Route>
        {/* Public site */}
        <Route path="/*" element={<SiteLayout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
