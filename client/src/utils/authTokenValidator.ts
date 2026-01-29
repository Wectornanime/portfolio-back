import { getAuthToken } from "./authToken";

export function isAuthTokenValid(): boolean {
  try {
    const token = getAuthToken();

    if (!token) return false;

    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
