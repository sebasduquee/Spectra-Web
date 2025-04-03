// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute';

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./admin/pages/LoginPage";
import DashboardPage from "./admin/pages/DashboardPage";
import AllNotificationsView from "./admin/components/notifications/AllNotificationsView";
import UsersView from './admin/pages/UsersView';

function App() {
  const pageTransition = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
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
                <PublicRoute>
                  <motion.div {...pageTransition}>
                    <LoginPage />
                  </motion.div>
                </PublicRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route path="/admin">
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <motion.div {...pageTransition}>
                      <DashboardPage />
                    </motion.div>
                  </ProtectedRoute>
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
    </AuthProvider>
  );
}

export default App;