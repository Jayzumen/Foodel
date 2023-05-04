import { create } from "zustand";

interface NavMenuState {
  isOpen: boolean;
  toggle: () => void;
}

export const useNavMenu = create<NavMenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
