"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthQuery {
  access?: string;
  refresh?: string;
  username?: string;
}

export interface AuthQueryStore {
  authQuery: AuthQuery;
  setAuthQuery: (authQuery: AuthQuery) => void;
  resetAuthQuery: () => void;
}

const useAuthQueryStore = create<AuthQueryStore>()(
  persist(
    (set) => ({
      authQuery: { access: "", refresh: "", username: "" }, // Initial empty state

      setAuthQuery: (authQuery: AuthQuery) => set({ authQuery }),

      resetAuthQuery: () =>
        set({
          authQuery: { access: "", refresh: "", username: "" },
        }),
    }),
    {
      name: "auth-store", // Key for localStorage
      partialize: (state) => ({ authQuery: state.authQuery }), // Save only authQuery to storage
    }
  )
);

export default useAuthQueryStore;
