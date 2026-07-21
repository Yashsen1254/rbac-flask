import axiosInstance from "@/api/axios";
import type { RolePermissionRequest } from "@/features/rolepermission/types/rolePermission";

export const getRolePermissions = async () => {
    const response = await axiosInstance.get("/rolepermission/display");
    return response.data;
};

export const getRolePermission = async (id: number) => {
    const response = await axiosInstance.get(`/rolepermission/display/${id}`);
    return response.data;
};

export const addRolePermission = async (data: RolePermissionRequest) => {
    const response = await axiosInstance.post("/rolepermission/add", data);
    return response.data;
};

export const updateRolePermission = async (
    id: number,
    data: RolePermissionRequest
) => {
    const response = await axiosInstance.put(
        `/rolepermission/update/${id}`,
        data
    );

    return response.data;
};

export const deleteRolePermission = async (id: number) => {
    const response = await axiosInstance.delete(
        `/rolepermission/delete/${id}`
    );

    return response.data;
};
