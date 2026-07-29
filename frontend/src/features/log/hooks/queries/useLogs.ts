import { useQuery } from "@tanstack/react-query";
import { getLogsApi } from "../../api/logApi";

export const useLogs = () => {
    return useQuery({
        queryKey: ["logs"],
        queryFn: getLogsApi,
    });
};
