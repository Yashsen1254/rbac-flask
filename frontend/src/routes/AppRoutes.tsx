import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "@/pages/NotFound";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
import AuthPage from "@/features/auth/AuthPage";
import UserPage from "@/features/user/UserPage";
import RolePage from "@/features/role/RolePage";
import RoleUserPage from "@/features/roleuser/RoleUserPage";
import CategoryPage from "@/features/category/CategoryPage";
import ProductPage from "@/features/product/ProductPage";
import RolePermissionPage from "@/features/rolepermission/RolePermissionPage";
import RegisterPage from "@/features/auth/RegisterPage";
import VerifyOTPPage from "@/features/auth/VerifyOTPPage";
import LogPage from "@/features/log/LogPage";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<AuthPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/verify-otp"
                    element={<VerifyOTPPage />}
                />
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/roles" element={<RolePage />} />
                    <Route path="/role-users" element={<RoleUserPage />} />
                    <Route path="/role-permissions" element={<RolePermissionPage />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/logs" element={<LogPage />} />
                </Route>
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;