import axiosInstance from "@/api/axios";
import type {
    LoginRequest,
    LoginResponse,
    PermissionsResponse
} from "../types/auth";

export const loginApi = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await axiosInstance.post(
        "/auth/login",
        data
    );

    return response.data;
};

export const getMe = async (): Promise<PermissionsResponse> => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
};