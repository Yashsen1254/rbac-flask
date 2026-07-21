import { BrowserRouter, Routes, Route } from "react-router-dom";


import ProtectedRoute from "./ProtectedRoute";
import NotFound from "@/pages/NotFound";
import DashboardLayout from "@/features/dashboard/DashboardPage";
import DashboardPage from "@/features/dashboard/DashboardPage";
import AuthPage from "@/features/auth/AuthPage";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<AuthPage />}
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