import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  customerId: number | null;
  setCustomerId: (customerId: number) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      customerId: null,
      setCustomerId: (customerId: number) => set({ customerId }),
      loaded: false,
      setLoaded: (loaded: boolean) => set({ loaded }),
    }),
    {
      name: "journey-store", // storage key
    },
  ),
);

export default useStore;
