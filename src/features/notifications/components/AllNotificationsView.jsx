// src/App.jsx
import React from 'react';
import LoginPage from "./features/auth/LoginPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import AllNotificationsView from "./features/notifications/components/AllNotificationsView"; // Corrected import path
import UsersView from "./features/users/UsersView";

function App() {
  return (
    <div>
      {/* Your app content here */}
      <LoginPage />
      <DashboardPage />
      <AllNotificationsView />
      <UsersView />
    </div>
  );
}

export default App;


// src/features/notifications/components/AllNotificationsView.jsx
import React from 'react';

function AllNotificationsView() {
  return (
    <div>
      <h1>All Notifications</h1>
      {/* Add notification display logic here */}
    </div>
  );
}

export default AllNotificationsView;

//Assuming necessary directories are created.  This needs to be adjusted to the actual project structure