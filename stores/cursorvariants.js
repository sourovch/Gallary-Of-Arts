import { create } from "zustand";

const cursorVariants = create((set) => ({
  variant: "hidden",
  setVariant: (variantName) => set({ variant: variantName }),
  cursorText: "",
  setCursorText: (text) => set({ cursorText: text }),
}));

export default cursorVariants;
