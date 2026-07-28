import axiosInstance from "@/api/axios";
import type {
    LoginRequest,
    LoginResponse,
    PermissionsResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
    ResendOTPRequest,
    ResendOTPResponse
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

export const registerApi = async (
    data: RegisterRequest
): Promise<RegisterResponse> => {
    const response = await axiosInstance.post(
        "/auth/register",
        data
    );

    return response.data;
};

export const verifyOTPApi = async (
    data: VerifyOTPRequest
): Promise<VerifyOTPResponse> => {
    const response = await axiosInstance.post(
        "/auth/verify-otp",
        data
    );

    return response.data;
};

export const getMe = async (): Promise<PermissionsResponse> => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
};

export const resendOTPApi = async (
    data: ResendOTPRequest
): Promise<ResendOTPResponse> => {
    const response = await axiosInstance.post(
        "/auth/resend-otp",
        data
    );

    return response.data;
};