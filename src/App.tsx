import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentTasks from "./pages/student/Tasks";
import StudentApplications from "./pages/student/Applications";
import StudentChat from "./pages/student/Chat";
import StudentEarnings from "./pages/student/Earnings";
import EmployerDashboard from "./pages/employer/Dashboard";
import EmployerProfile from "./pages/employer/Profile";
import PostTask from "./pages/employer/PostTask";
import EmployerTasks from "./pages/employer/Tasks";
import EmployerChat from "./pages/employer/Chat";
import EmployerAnalytics from "./pages/employer/Analytics";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersManagement from "./pages/admin/Users";
import TasksManagement from "./pages/admin/Tasks";
import DisputesPage from "./pages/admin/Disputes";
import AnalyticsPage from "./pages/admin/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/tasks" element={<StudentTasks />} />
            <Route path="/student/applications" element={<StudentApplications />} />
            <Route path="/student/chat" element={<StudentChat />} />
            <Route path="/student/earnings" element={<StudentEarnings />} />
            
            {/* Employer Routes */}
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/profile" element={<EmployerProfile />} />
            <Route path="/employer/post-task" element={<PostTask />} />
            <Route path="/employer/tasks" element={<EmployerTasks />} />
            <Route path="/employer/chat" element={<EmployerChat />} />
            <Route path="/employer/analytics" element={<EmployerAnalytics />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersManagement />} />
            <Route path="/admin/tasks" element={<TasksManagement />} />
            <Route path="/admin/disputes" element={<DisputesPage />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
