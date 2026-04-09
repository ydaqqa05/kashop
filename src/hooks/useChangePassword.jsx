import { useMutation } from "@tanstack/react-query";
import authaxiosInstance from "../api/authAxiosInstance";

export default function useChangePassword() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authaxiosInstance.patch(
        `/Profile/change-password`,
        data
      );
      return response.data;
    },
  });
}