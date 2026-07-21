import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addRole,
    deleteRole,
    updateRole,
} from "../../api/roleApi";
import type { RoleRequest } from "../../types/role";

export const useAddRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addRole,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to add role"
            );
        },
    });
};

export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: RoleRequest;
        }) => updateRole(id, data),

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to update role"
            );
        },
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRole,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to delete role"
            );
        },
    });
};