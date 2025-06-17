import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
// Component imports
import Landing from "./components/landingPage/Landing";
import Sign from "./components/Sign/Sign";
import LogIn from "./components/LogIn/LogIn";
import Main from "./components/main/Main";
import Question from "./components/Question/Question";
import Dashboard from "./components/Dashboard/Dashboard";
import Summary from "./components/Summary/Summary";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import NotAccessible from "./components/NotAccesible/NotAccesible";
import UnloggedNavbar from "./components/navbar/UnloggedNavbar";
// Helper imports
import { verifyLogIn } from "./helpers/verifyUser";
import TopicResources from "./components/TopicResources/TopicResouces";

// Protected Route wrapper component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <NotAccessible />;
  }
  return children;
};

// App content component that has access to useLocation
const AppContent = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await verifyLogIn();
        setUsername(user || "");
      } catch (error) {
        console.error("Authentication verification failed:", error);
        setUsername("");
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const isAuthenticated = Boolean(username);

  // Define routes where navbar and footer should be shown
  const showNavbarAndFooter = ["/", "/landing", "/signUp", "/logIn"].includes(
    location.pathname,
  );

  // Show loading state while verifying authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbarAndFooter && <UnloggedNavbar />}
      <main className="flex-grow bg-[#F9FAFB]">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/signUp" element={<Sign />} />
          <Route path="/logIn" element={<LogIn />} />
          {/* Protected routes */}
          <Route
            path="/main"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:questionId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Question />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary/:summaryId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Summary />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topic" element={<TopicResources />} />
          <Route path="/401" element={<NotAccessible />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
