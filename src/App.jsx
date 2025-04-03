// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext'; 
import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute';

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./admin/pages/LoginPage";
import DashboardPage from "./admin/pages/DashboardPage";
import AllNotificationsView from "./admin/components/notifications/AllNotificationsView";
import UsersView from './admin/pages/UsersView';
import ApiToastExamplePage from './pages/ApiToastExamplePage'; // Added import

function App() {
  const pageTransition = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <AuthProvider> 
      <ToastProvider> 
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

              {/* API Toast Example Route */}
              <Route
                path="/api-toast-example"
                element={
                  <motion.div {...pageTransition}>
                    <ApiToastExamplePage />
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
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

// src/pages/ApiToastExamplePage.jsx // Added placeholder component
import React from 'react';
import { useApi } from '../hooks/useApi';
import apiClient from '../services/apiClient'; // Assuming this is your API client

const ApiToastExamplePage = () => {
  const { execute, data, isLoading, error } = useApi(apiClient.get);

  const fetchData = async () => {
    try {
      await execute('/your-api-endpoint');
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  return (
    <div>
      <h1>API Toast Example</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default ApiToastExamplePage;