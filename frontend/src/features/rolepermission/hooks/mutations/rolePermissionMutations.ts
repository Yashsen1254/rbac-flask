import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    addRolePermission,
    deleteRolePermission,
    updateRolePermission,
} from "../../api/rolePermissionApi";

import type { RolePermissionRequest } from "../../types/rolePermission";

export const useAddRolePermission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRolePermission,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["rolePermissions"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to assign role permission."
            );
        },
    });
};

export const useUpdateRolePermission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: RolePermissionRequest;
        }) => updateRolePermission(id, data),

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["rolePermissions"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to update role permission."
            );
        },
    });
};

export const useDeleteRolePermission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRolePermission,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["rolePermissions"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to delete role permission assignment."
            );
        },
    });
};
