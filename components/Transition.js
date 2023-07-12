import React from "react";
import { motion as m } from "framer-motion";

const Transition = ({ children, text }) => {
  const classNames = 'uppercase text-6xl fixed top-0 left-0 backdrop-blur h-screen w-screen m-auto grid place-content-center'

  return (
    <>
      <m.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{children}</m.div>
      <m.div
      className={`${classNames} origin-right`}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{
          duration: .5,
          delay: .1,
          ease: 'easeInOut'
        }}
      >
        Text
      </m.div>
      <m.div
        className={`${classNames} origin-left`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{
          duration: .5,
          delay: .1,
          ease: 'easeInOut'
        }}
      >
        Text
      </m.div>
    </>
  );
};

export default Transition;
