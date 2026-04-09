import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import authaxiosInstance from "../api/authAxiosInstance";

export default function useOrders(status = "Approved") {
  return useQuery({
    queryKey: ["orders", status],
    queryFn: async () => {
      const response = await authaxiosInstance.get(
        `admin/orders?status=${status}`);

      return response.data;
    },
  });
}