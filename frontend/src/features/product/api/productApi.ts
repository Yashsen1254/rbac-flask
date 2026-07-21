import axiosInstance from "@/api/axios";
import type { ProductRequest } from "../types/product";

export const getProducts = async () => {
    const response = await axiosInstance.get("/product/display");
    return response.data;
};

export const getProduct = async (id: number) => {
    const response = await axiosInstance.get(
        `/product/display/${id}`
    );
    return response.data;
};

export const addProduct = async (
    data: ProductRequest
) => {
    const response = await axiosInstance.post(
        "/product/add",
        data
    );
    return response.data;
};

export const updateProduct = async (
    id: number,
    data: ProductRequest
) => {
    const response = await axiosInstance.put(
        `/product/update/${id}`,
        data
    );
    return response.data;
};

export const deleteProduct = async (
    id: number
) => {
    const response = await axiosInstance.delete(
        `/product/delete/${id}`
    );
    return response.data;
};