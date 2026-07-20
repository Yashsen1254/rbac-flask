import { BrowserRouter, Routes, Route } from "react-router-dom";


import ProtectedRoute from "./ProtectedRoute";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/features/auth/LoginPage";
import DashboardLayout from "@/features/dashboard/DashboardPage";
import DashboardPage from "@/features/dashboard/DashboardPage";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />
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