import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    addCategory,
    updateCategory,
    deleteCategory,
} from "../../api/categoryApi";

export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCategory,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                    "Failed to add category"
            );
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: any;
        }) => updateCategory(id, data),

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                    "Failed to update category"
            );
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                    "Failed to delete category"
            );
        },
    });
};