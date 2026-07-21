import axiosInstance from "@/api/axios";
import type { UserRequest } from "../types/user";

export const getUsers = async () => {
    const response = await axiosInstance.get("/user/display");

    return response.data;
};

export const getUser = async (id: number) => {
    const response = await axiosInstance.get(
        `/user/display/${id}`
    );

    return response.data;
};

export const addUser = async (
    data: UserRequest
) => {
    const response = await axiosInstance.post(
        "/user/add",
        data
    );

    return response.data;
};

export const updateUser = async (
    id: number,
    data: UserRequest
) => {
    const response = await axiosInstance.put(
        `/user/update/${id}`,
        data
    );

    return response.data;
};

export const deleteUser = async (
    id: number
) => {
    const response = await axiosInstance.delete(
        `/user/delete/${id}`
    );

    return response.data;
};