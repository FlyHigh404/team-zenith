import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminLayout2 from "../layout/AdminLayout2";
import UserLayout from "../layout/UserLayout";

// Simulasi user, nanti bisa pakai context/auth real
const user = { role: "admin" }; // atau "user"

const ProtectedLayout = ({ layout }) => {
    if (!user) return <Navigate to="/login" />;

    if (user.role === "admin" && layout === "admin") return <AdminLayout><Outlet /></AdminLayout>;
    if (user.role === "admin" && layout === "admin2") return <AdminLayout2><Outlet /></AdminLayout2>;
    if (user.role === "user" && layout === "user") return <UserLayout><Outlet /></UserLayout>;

    return <Navigate to="/" />;
};

export default ProtectedLayout;
