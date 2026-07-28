import axiosInstance from "@/api/axios";
import type { RoleUserRequest } from "@/features/roleuser/types/roleUser";

export const getRoleUsers = async () => {
    const response = await axiosInstance.get("/userrole/display");
    return response.data;
};

export const getRoleUser = async (id: number) => {
    const response = await axiosInstance.get(`/userrole/display/${id}`);
    return response.data;
};

export const addRoleUser = async (data: RoleUserRequest) => {
    const response = await axiosInstance.post("/userrole/add", data);
    return response.data;
};

export const updateRoleUser = async (
    id: number,
    data: RoleUserRequest
) => {
    const response = await axiosInstance.put(
        `/userrole/update/${id}`,
        data
    );

    return response.data;
};

export const deleteRoleUser = async (id: number) => {
    const response = await axiosInstance.delete(
        `/userrole/delete/${id}`
    );

    return response.data;
};