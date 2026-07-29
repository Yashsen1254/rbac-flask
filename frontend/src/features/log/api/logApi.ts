import axiosInstance from "@/api/axios";
import type { Log } from "../types/log";

export const getLogsApi = async (): Promise<Log[]> => {
    const response = await axiosInstance.get("/logs/display");
    return response.data;
};

export const exportLogsCSV = async () => {
    const response = await axiosInstance.get("/logs/export/csv", {responseType: "blob",});
    return response.data;
};

export const exportLogsPDF = async () => {
    const response = await axiosInstance.get("/logs/export/pdf", {responseType: "blob",});
    return response.data;
};