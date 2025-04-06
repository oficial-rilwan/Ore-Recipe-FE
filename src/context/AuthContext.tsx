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
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { show, message, triggerToast, type } = useToast();
  const [user, setUser] = React.useState<UserProps | null>(null);

  React.useEffect(() => {
    const onFocus = () => {
      if (document.visibilityState === "visible") getUser();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);

  async function getUser() {
    try {
      const { data } = await userRepo.me();
      setUser(data);
    } catch (error) {
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
    <AuthContext.Provider value={{ isAuthenticated: !!user, logout, user, getUser, setUser }}>
      <ToastMessage show={show} message={message} type={type} />
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
