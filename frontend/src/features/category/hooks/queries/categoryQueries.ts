import { useQuery } from "@tanstack/react-query";
import {
    getCategories,
    getCategory,
} from "../../api/categoryApi";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
};

export const useCategory = (id: number) => {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategory(id),
        enabled: !!id,
    });
};