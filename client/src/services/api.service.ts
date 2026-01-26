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
    const data = error.response.data;

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

    if (status === 400 || status === 404) {
      addToast({
        title: "Ocorreu com sua requisição",
        color: "warning",
        description: data.message,
      });
    }

    if (status === 500) {
      addToast({
        title: "Ocorreu um erro com o servidor",
        color: "danger",
        description:
          "Parece que tivemos um problema com nosso servidor, por favor tente mais tarde.",
      });
    }

    return { status, data };
  },
);
