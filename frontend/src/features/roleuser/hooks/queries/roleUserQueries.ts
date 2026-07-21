import { useQuery } from "@tanstack/react-query";
import {
    getRoleUser,
    getRoleUsers,
} from "../../api/roleUserApi";
import type { RoleUser } from "../../types/roleUser";

export const useRoleUsers = () => {
    return useQuery<RoleUser[]>({
        queryKey: ["roleUsers"],
        queryFn: getRoleUsers,
    });
};

export const useRoleUser = (id: number) => {
    return useQuery<RoleUser>({
        queryKey: ["roleUser", id],
        queryFn: () => getRoleUser(id),
        enabled: !!id,
    });
};