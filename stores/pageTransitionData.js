import { create } from "zustand";

const pageTransitionData = create((set) => ({
  pageText: "",
  setPageText: (text) => set({ pageText: text }),
}));

export default pageTransitionData;
