import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { setToken } from "@/utils/token";
import { loginApi } from "../../api/authApi";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: loginApi,

        onSuccess: (data) => {
            setToken(data.message);
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