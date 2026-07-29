import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { setToken } from "@/utils/token";
import { loginApi, registerApi, verifyOTPApi, resendOTPApi } from "../../api/authApi";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: loginApi,

        onSuccess: (data) => {
            setToken(data.access_token);
            toast.success("Login Successful");
            navigate("/dashboard");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                "Login Failed"
            );
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: registerApi,
    });
};

export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: verifyOTPApi,
    });
};

export const useResendOTP = () => {
    return useMutation({
        mutationFn: resendOTPApi,
    });
};