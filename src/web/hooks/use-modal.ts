import { Solver } from "@/utils/utils";
import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  solver: Solver | null;
  setSolver: (solver: Solver) => void;
  type: "input" | "rinput" | "file" | null;
  setType: (type: "input" | "rinput" | "file" | null) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
}

const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  solver: null,
  setSolver: (solver) => set({ solver: solver }),
  type: null,
  setType: (type) => set({ type: type }),
  loading: false,
  setLoading: (load) => set({loading: load})
}));

export default useModal;
