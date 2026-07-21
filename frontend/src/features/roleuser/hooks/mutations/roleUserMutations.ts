import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    addRoleUser,
    deleteRoleUser,
    updateRoleUser,
} from "../../api/roleUserApi";

import type { RoleUserRequest } from "../../types/roleuser";

export const useAddRoleUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRoleUser,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["roleUsers"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to assign role."
            );
        },
    });
};

export const useUpdateRoleUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: RoleUserRequest;
        }) => updateRoleUser(id, data),

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["roleUsers"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to update role."
            );
        },
    });
};

export const useDeleteRoleUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRoleUser,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["roleUsers"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to delete role assignment."
            );
        },
    });
};