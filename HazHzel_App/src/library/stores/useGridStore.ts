import { create } from "zustand";
interface GridState {
  column: number;
  mobileColumn: number;
  setColumCount: (n: number) => void;
  setMobileColumn: (n: number) => void;
}
const useGridStore = create<GridState>((set) => ({
  column: 5,
  mobileColumn: 2,
  setMobileColumn: (n: number) => set({ mobileColumn: n }),
  setColumCount: (n: number) => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        if (n == 3) set({ mobileColumn: 1 });
        else set({ mobileColumn: 2 });
      } else {
        set({ column: n });
      }
    }
  },
}));
export default useGridStore;
