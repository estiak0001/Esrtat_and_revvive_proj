import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import Consultant from './pages/Consultant';

// Admin
import { AuthProvider } from './admin/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import SlidesManager from './admin/pages/SlidesManager';
import CompanySettings from './admin/pages/CompanySettings';
import StatsManager from './admin/pages/StatsManager';
import ServicesManager from './admin/pages/ServicesManager';
import WhyChooseManager from './admin/pages/WhyChooseManager';
import IndustriesManager from './admin/pages/IndustriesManager';
import CoreValuesManager from './admin/pages/CoreValuesManager';
import PartnersManager from './admin/pages/PartnersManager';
import ConsultantsManager from './admin/pages/ConsultantsManager';
import TestimonialsManager from './admin/pages/TestimonialsManager';

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultant" element={<Consultant />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollReset />
        <Routes>
          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="slides" element={<SlidesManager />} />
              <Route path="company" element={<CompanySettings />} />
              <Route path="stats" element={<StatsManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="why-choose" element={<WhyChooseManager />} />
              <Route path="industries" element={<IndustriesManager />} />
              <Route path="core-values" element={<CoreValuesManager />} />
              <Route path="partners" element={<PartnersManager />} />
              <Route path="consultants" element={<ConsultantsManager />} />
              <Route path="testimonials" element={<TestimonialsManager />} />
            </Route>
          </Route>
          {/* Main site */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

