import React from "react";
import { UserProps } from "../types/types";
import { useToast } from "../hooks/useToast";
import ToastMessage from "../components/ToastMessage";
import userRepo from "../repo/user.repo";
import PATHNAMES from "../constants/pathnames";

interface AuthContextType {
  user: UserProps | null;
  isAuthenticated: boolean;
  logout: () => void;
  getUser(): void;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { show, message, triggerToast, type } = useToast();
  const [user, setUser] = React.useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = () => {
      if (document.visibilityState === "visible") getUser();
    };

    fetchUser();

    window.addEventListener("focus", fetchUser);
    document.addEventListener("visibilitychange", fetchUser);

    return () => {
      window.removeEventListener("focus", fetchUser);
      document.removeEventListener("visibilitychange", fetchUser);
    };
  }, []);

  async function getUser() {
    try {
      setIsLoading(true);
      const { data } = await userRepo.me();
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.status === 401) setUser(null);
    }
  }

  async function logout() {
    try {
      await userRepo.signout();
      setUser(null);
      triggerToast("User logged out successfully...", "success");
      window.location.replace(PATHNAMES.HOME);
    } catch (error) {
      triggerToast(error?.response?.data?.error, "success");
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, logout, user, getUser, setUser, isLoading }}>
      <ToastMessage show={show} message={message} type={type} />
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
