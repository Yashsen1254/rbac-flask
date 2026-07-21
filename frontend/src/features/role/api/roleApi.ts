import axiosInstance from "@/api/axios";
import type { RoleRequest } from "../types/role";

export const getRoles = async () => {
    const response = await axiosInstance.get("/role/display");
    return response.data;
};

export const getRole = async (id: number) => {
    const response = await axiosInstance.get(
        `/role/display/${id}`
    );
    return response.data;
};

export const addRole = async (
    data: RoleRequest
) => {
    const response = await axiosInstance.post(
        "/role/add",
        data
    );
    return response.data;
};

export const updateRole = async (
    id: number,
    data: RoleRequest
) => {
    const response = await axiosInstance.put(
        `/role/update/${id}`,
        data
    );
    return response.data;
};

export const deleteRole = async (
    id: number
) => {
    const response = await axiosInstance.delete(
        `/role/delete/${id}`
    );
    return response.data;
};