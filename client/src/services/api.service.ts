import axios from "axios";
import { addToast } from "@heroui/react";

import { getAuthToken, removeAuthToken } from "@/utils/authToken";
import { authBridge } from "@/bridges/auth.bridge";
import { navigationBridge } from "@/bridges/navigate.bridge";

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error;

    if (status === 401) {
      addToast({
        color: "danger",
        title: "Sessão expirada",
        description:
          "Sua sessão está expirada, você precisa fazer o login novamente.",
      });
      removeAuthToken();
      authBridge.clearUser?.();
      navigationBridge.navigate?.("/login");
    }

    return Promise.reject(error);
  },
);
