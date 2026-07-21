import axiosInstance from "@/api/axios";
import type { RoleUserRequest } from "@/features/roleuser/types/roleuser";

export const getRoleUsers = async () => {
    const response = await axiosInstance.get("/roleuser/display");
    return response.data;
};

export const getRoleUser = async (id: number) => {
    const response = await axiosInstance.get(`/roleuser/display/${id}`);
    return response.data;
};

export const addRoleUser = async (data: RoleUserRequest) => {
    const response = await axiosInstance.post("/roleuser/add", data);
    return response.data;
};

export const updateRoleUser = async (
    id: number,
    data: RoleUserRequest
) => {
    const response = await axiosInstance.put(
        `/roleuser/update/${id}`,
        data
    );

    return response.data;
};

export const deleteRoleUser = async (id: number) => {
    const response = await axiosInstance.delete(
        `/roleuser/delete/${id}`
    );

    return response.data;
};