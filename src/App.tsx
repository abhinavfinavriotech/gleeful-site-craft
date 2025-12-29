import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth-context";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import BrokerManagement from "./pages/admin/BrokerManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import AllegationManagement from "./pages/admin/AllegationManagement";
import ComplaintsManagement from "./pages/admin/ComplaintsManagement";
import SearchLogs from "./pages/admin/SearchLogs";

// Broker Pages
import BrokerDashboard from "./pages/broker/BrokerDashboard";
import AddAbuser from "./pages/broker/AddAbuser";
import SearchAbuser from "./pages/broker/SearchAbuser";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role || '')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/brokers"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <BrokerManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CategoryManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/allegations"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AllegationManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/complaints"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ComplaintsManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/search-logs"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SearchLogs />
          </ProtectedRoute>
        }
      />

      {/* Broker Routes */}
      <Route
        path="/broker"
        element={
          <ProtectedRoute allowedRoles={['broker']}>
            <BrokerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/broker/add-abuser"
        element={
          <ProtectedRoute allowedRoles={['broker']}>
            <AddAbuser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/broker/search"
        element={
          <ProtectedRoute allowedRoles={['broker']}>
            <SearchAbuser />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
