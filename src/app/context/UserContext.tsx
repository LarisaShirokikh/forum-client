// context/UserContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (token) {
          const response = await axios.get(
            "http://localhost:4000/api/auth/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error("User not authenticated", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      setUser(response.data);
      Cookies.set("accessToken", response.data.token, { expires: 7 });
      closeLoginModal();
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      Cookies.remove("accessToken");
      setUser(null);
      
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
