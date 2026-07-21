import { useQuery } from "@tanstack/react-query";
import {
    getUser,
    getUsers,
} from "../../api/userApi";
import type { User } from "../../types/user";

export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ["users"],

        queryFn: getUsers,
    });
};

export const useUser = (id: number) => {
    return useQuery<User>({
        queryKey: ["user", id],
        queryFn: () => getUser(id),
        enabled: !!id,
    });
};