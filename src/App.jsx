
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import LandingPage from "./features/landing/LandingPage";
import LoginPage from "./features/auth/LoginPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import AllNotificationsView from "./features/notifications/components/AllNotificationsView";
import UsersView from './features/users/UsersView';

function App() {
  const pageTransition = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <LandingPage />
              </motion.div>
            }
          />

          {/* Auth Routes */}
          <Route
            path="/admin/login"
            element={
              <motion.div {...pageTransition}>
                <LoginPage />
              </motion.div>
            }
          />

          {/* Protected Admin Routes */}
          <Route path="/admin">
            <Route
              path="dashboard"
              element={
                <motion.div {...pageTransition}>
                  <DashboardPage />
                </motion.div>
              }
            />
            
            <Route
              path="users"
              element={
                <motion.div {...pageTransition}>
                  <UsersView />
                </motion.div>
              }
            />

            {/* Notifications */}
            <Route
              path="notifications"
              element={
                <motion.div {...pageTransition}>
                  <AllNotificationsView />
                </motion.div>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
