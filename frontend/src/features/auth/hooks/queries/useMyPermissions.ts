import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/authApi";
import { getToken } from "@/utils/token";

export const useMyPermissions = () => {
    return useQuery({
        queryKey: ["myPermissions"],
        queryFn: getMe,
        enabled: !!getToken(),
        staleTime: 5 * 60 * 1000,
    });
};
