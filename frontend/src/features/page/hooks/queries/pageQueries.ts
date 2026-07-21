import { useQuery } from "@tanstack/react-query";
import { getPages } from "../../api/pageApi";

export const usePages = () => {
  return useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });
};
