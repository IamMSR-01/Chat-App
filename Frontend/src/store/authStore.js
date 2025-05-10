import { create } from "zustand";
import API from "../utils/axios.js";
import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const serverUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  // socket: null,

  checkAuth: async () => {
    try {
      const response = await API.get("/auth/check");
      set({ authUser: response.data });
      // get().connectSocket();
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData) => {
    set({ isSigningUp: true });
    try {
      const response = await API.post("/auth/signup", userData);
      set({ authUser: response.data });
      // get().connectSocket();
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await API.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
      // get().disconnectSocket();
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out. Please try again.");
    }
  },

  login: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const response = await API.post("/auth/login", userData);
      set({ authUser: response.data });
      toast.success("Logged in successfully!");
      // get().connectSocket();
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid email or password.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (userData) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await API.put("/auth/update-profile", userData);
      set({ authUser: response.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // connectSocket: () => {
  //   const { authUser } = get();
  //   if (!authUser || get().socket?.connected) return;
  //   const socket = io(serverUrl, {
  //     query: {
  //       userId: authUser._id,
  //     },
  //   });
  //   socket.connect();
  //   set({ socket: socket });

  //   socket.on("getOnlineUsers", (userIds) => {
  //     set({ onlineUsers: userIds });
  //   });
  // },

  // disconnectSocket: () => {
  //   if (get().socket?.connected) get().socket.disconnect();
  // },
}));
