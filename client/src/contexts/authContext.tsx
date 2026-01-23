import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { addToast } from "@heroui/react";

import { api } from "@/services/api.service";
import { getAuthToken, removeAuthToken } from "@/utils/authToken";

type User = {
  name: string;
  avatarUrl: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
  login: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    async function loadUser() {
      const token = getAuthToken();

      if (!token) {
        setLoading(false);

        return;
      }

      try {
        const { data, status } = await api.get("/me");

        if (status === 200) {
          setUser({
            avatarUrl: data.data.imageUrl || "",
            name: `${data.data.name} ${data.data.lastName}`,
          });
        } else {
          removeAuthToken();
          setUser(null);
        }
      } catch {
        removeAuthToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const logout = () => {
    removeAuthToken();
    setUser(null);

    addToast({
      color: "warning",
      title: "Você fez logoff",
    });
  };

  const login = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, logout, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
};
