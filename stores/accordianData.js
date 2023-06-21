import { create } from "zustand";

const accrodianData = create((set) => ({
  activePanal: "",
  setActivePanal: (id) => set({ activePanal: id }),
}));

export default accrodianData;