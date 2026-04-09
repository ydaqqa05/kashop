import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import authaxiosInstance from "../api/authAxiosInstance";

export default function useChangeEmail() {
  return useMutation({
    mutationFn: async (newEmail) => {
      
      const response = await authaxiosInstance.patch(
        "https://knowledgeshop.runasp.net/api/Profile/change-email",{NewEmail:newEmail}
      );

      return response.data;
    }
  });
}