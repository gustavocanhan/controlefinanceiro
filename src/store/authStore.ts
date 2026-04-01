import { create } from "zustand";
import Cookies from "js-cookie";
import api from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  refreshKey: number;
  triggerRefresh: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  refreshKey: 0,

  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),

  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { user, token } = response.data.data;

    localStorage.setItem("token", token);
    Cookies.set("token", token, { expires: 7 });

    set({ user, token });
  },

  register: async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    const { user, token } = response.data.data;

    localStorage.setItem("token", token);
    Cookies.set("token", token, { expires: 7 });

    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    Cookies.remove("token");

    set({ user: null, token: null });
  },
}));

export default useAuthStore;
