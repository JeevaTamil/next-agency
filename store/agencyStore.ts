import { create } from "zustand";

type AgencyStore = {
  agencyId: number | null;
  setAgencyId: (id: number) => void;
};

// Create Zustand store
export const useAgencyStore = create<AgencyStore>((set) => ({
  agencyId: null,
  setAgencyId: (id) => {
    set({ agencyId: id });
    localStorage.setItem("agencyId", id.toString());
  },
}));
