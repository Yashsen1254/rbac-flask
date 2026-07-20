import axiosInstance from "@/api/axios";
import type {
    LoginRequest,
    LoginResponse,
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