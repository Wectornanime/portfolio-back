import { addToast } from "@heroui/react";

import { removeAuthToken } from "./authToken";

export function doLogout() {
  removeAuthToken();

  addToast({
    color: "warning",
    title: "Você fez logoff",
  });
}
