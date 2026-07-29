import axiosInstance from "@/api/axios";
import type { Log } from "../types/log";

export const getLogsApi = async (): Promise<Log[]> => {
    const response = await axiosInstance.get("/logs/display");
    return response.data;
};
