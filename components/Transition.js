import React from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import pageTransitionData from "@/stores/pageTransitionData";

const Transition = ({ children }) => {
  const classNames =
    "uppercase text-6xl fixed top-0 left-0 backdrop-blur h-screen w-screen m-auto grid place-content-center";

  const pageText = pageTransitionData((state) => state.pageText);

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </m.div>
        <>
          <m.div
            className={`${classNames} origin-right`}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeInOut",
            }}
          >
            {pageText}
          </m.div>
          <m.div
            className={`${classNames} origin-left`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeInOut",
            }}
          >
            {pageText}
          </m.div>
        </>
    </>
  );
};

export default Transition;
