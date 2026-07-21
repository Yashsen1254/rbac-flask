import { useQuery } from "@tanstack/react-query";
import {
    getRole,
    getRoles,
} from "../../api/roleApi";
import type { Role } from "../../types/role";

export const useRoles = () => {
    return useQuery<Role[]>({
        queryKey: ["roles"],
        queryFn: getRoles,
    });
};

export const useRole = (id: number) => {
    return useQuery<Role>({
        queryKey: ["role", id],
        queryFn: () => getRole(id),
        enabled: !!id,
    });
};