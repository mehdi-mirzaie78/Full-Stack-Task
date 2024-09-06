"use client"

import { create } from "zustand";

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

const useAuthQueryStore = create<AuthQueryStore>((set) => ({
  authQuery: JSON.parse(window?.localStorage.getItem("userInfo") || "{}"),
  setAuthQuery: (authQuery: AuthQuery) =>
    set((store) => {
      store.authQuery = authQuery;
      window?.localStorage.setItem("userInfo", JSON.stringify(store.authQuery));
      return { authQuery: store.authQuery };
    }),
  resetAuthQuery: () =>
    set((store) => {
      store.authQuery = {};
      localStorage.setItem("userInfo", JSON.stringify(store.authQuery));
      return { authQuery: store.authQuery };
    }),
}));

export default useAuthQueryStore;