import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addUser,
    deleteUser,
    updateUser,
} from "../../api/userApi";
import type { UserRequest } from "../../types/user";

export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addUser,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to add user"
            );
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: UserRequest;
        }) => updateUser(id, data),

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to update user"
            );
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to delete user"
            );
        },
    });
};