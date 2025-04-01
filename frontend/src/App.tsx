
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import VendorManagement from "./pages/VendorManagement";
import InboundPackages from "./pages/InboundPackages";
import OutboundPackages from "./pages/OutboundPackages";
import AddVendor from "./pages/AddVendor";
import AddInbound from "./pages/AddInbound";
import AddOutbound from "./pages/AddOutbound";
import NotFoundPage from "./pages/NotFoundPage";
import { DataProvider } from "./context/DataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="vendor-management" element={<VendorManagement />} />
              <Route path="inbound" element={<InboundPackages />} />
              <Route path="outbound" element={<OutboundPackages />} />
              <Route path="add-vendor" element={<AddVendor />} />
              <Route path="add-inbound" element={<AddInbound />} />
              <Route path="add-outbound" element={<AddOutbound />} />
              <Route path="project-management" element={<Dashboard />} />
              <Route path="task-management" element={<Dashboard />} />
              <Route path="calendar" element={<Dashboard />} />
              <Route path="compliance" element={<Dashboard />} />
              <Route path="service-desk" element={<Dashboard />} />
              <Route path="skill-grow" element={<Dashboard />} />
              <Route path="attendance" element={<Dashboard />} />
              <Route path="communication" element={<Dashboard />} />
              <Route path="meeting" element={<Dashboard />} />
              <Route path="workspace-bookings" element={<Dashboard />} />
              <Route path="business-card" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
