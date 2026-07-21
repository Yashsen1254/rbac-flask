import axiosInstance from "@/api/axios";
import type { Page } from "../types/page";

export const getPages = async (): Promise<Page[]> => {
  const response = await axiosInstance.get("/page/display");
  return response.data;
};
