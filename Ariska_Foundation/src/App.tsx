import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import PublicSite from './PublicSite'
import { AuthProvider } from './admin/AuthContext'
import ProtectedRoute from './admin/components/ProtectedRoute'
import AdminLayout from './admin/components/AdminLayout'
import Login from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import CompanySettings from './admin/pages/CompanySettings'
import MissionVision from './admin/pages/MissionVision'
import ServicesManager from './admin/pages/ServicesManager'
import ProductsManager from './admin/pages/ProductsManager'
import HighlightsManager from './admin/pages/HighlightsManager'
import WhatWeDoManager from './admin/pages/WhatWeDoManager'
import MarketsManager from './admin/pages/MarketsManager'
import JourneyManager from './admin/pages/JourneyManager'
import ClientsManager from './admin/pages/ClientsManager'
import TeamManager from './admin/pages/TeamManager'
import TeamValuesManager from './admin/pages/TeamValuesManager'
import WhyAriskaManager from './admin/pages/WhyAriskaManager'
import BusinessValuesManager from './admin/pages/BusinessValuesManager'

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="company" element={<CompanySettings />} />
            <Route path="mission-vision" element={<MissionVision />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="highlights" element={<HighlightsManager />} />
            <Route path="what-we-do" element={<WhatWeDoManager />} />
            <Route path="markets" element={<MarketsManager />} />
            <Route path="journey" element={<JourneyManager />} />
            <Route path="clients" element={<ClientsManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="team-values" element={<TeamValuesManager />} />
            <Route path="why-ariska" element={<WhyAriskaManager />} />
            <Route path="business-values" element={<BusinessValuesManager />} />
          </Route>
        </Route>

        {/* Public site */}
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </AuthProvider>
  )
}
