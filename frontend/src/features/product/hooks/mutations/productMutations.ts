import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addProduct,
    deleteProduct,
    updateProduct,
} from "../../api/productApi";
import type { ProductRequest } from "../../types/product";

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,

        onSuccess: (data: any) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to add product"
            );
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: ProductRequest;
        }) => updateProduct(id, data),
        onSuccess: (data: any) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to update product"
            );
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: (data: any) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to delete product"
            );
        },
    });
};