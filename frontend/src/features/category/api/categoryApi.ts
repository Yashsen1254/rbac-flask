import axiosInstance from "@/api/axios";
import type { CategoryRequest } from "../types/category";

export const getCategories = async () => {
    const response = await axiosInstance.get("/category/display");

    return response.data;
};

export const getCategory = async (id: number) => {
    const response = await axiosInstance.get(`/category/display/${id}`);

    return response.data;
};

export const addCategory = async (
    data: CategoryRequest
) => {
    const response = await axiosInstance.post(
        "/category/add",
        data
    );

    return response.data;
};

export const updateCategory = async (
    id: number,
    data: CategoryRequest
) => {
    const response = await axiosInstance.put(
        `/category/update/${id}`,
        data
    );

    return response.data;
};

export const deleteCategory = async (
    id: number
) => {
    const response = await axiosInstance.delete(
        `/category/delete/${id}`
    );

    return response.data;
};