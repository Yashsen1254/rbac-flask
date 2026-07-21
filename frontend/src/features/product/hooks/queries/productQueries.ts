import { useQuery } from "@tanstack/react-query";
import {
    getProduct,
    getProducts,
} from "../../api/productApi";
import type { Product } from "../../types/product";

export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts,
    });
};

export const useProduct = (id: number) => {
    return useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () => getProduct(id),
        enabled: !!id,
    });
};