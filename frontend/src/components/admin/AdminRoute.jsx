// src/components/AdminRoute.jsx
import React from "react";
import { useUser } from "@clerk/clerk-react";
import AdminPage from "../../pages/admin/AdminPage";

const AdminRoute = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // ✅ Check admin role
  if (user?.privateMetadata?.role === "admin") {
    return <AdminPage />;
  }

  // 🚫 Not admin
  return (
    <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
      Access Denied ❌
    </div>
  );
};

export default AdminRoute;
