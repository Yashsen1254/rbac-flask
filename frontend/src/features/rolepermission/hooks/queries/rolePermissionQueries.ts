import { useQuery } from "@tanstack/react-query";
import {
    getRolePermission,
    getRolePermissions,
} from "../../api/rolePermissionApi";
import type { RolePermission } from "../../types/rolePermission";

export const useRolePermissions = () => {
    return useQuery<RolePermission[]>({
        queryKey: ["rolePermissions"],
        queryFn: getRolePermissions,
    });
};

export const useRolePermission = (id: number) => {
    return useQuery<RolePermission>({
        queryKey: ["rolePermission", id],
        queryFn: () => getRolePermission(id),
        enabled: !!id,
    });
};
