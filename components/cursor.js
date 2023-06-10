"use client";

import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import cursorVariants from "@/stores/cursorvariants";

function Cursor() {
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });

  const { variantName, text } = cursorVariants((state) => ({
    variantName: state.variant,
    text: state.cursorText,
  }));

  useEffect(() => {
    function mouseMove(e) {
      setCursorPosition({
        x: e.clientX + 15,
        y: e.clientY + 15,
      });
    }

    window.addEventListener("mousemove", mouseMove);

    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const cursorConfs = {
    x: cursorPosition.x,
    y: cursorPosition.y,
    transition: {
      type: "tween",
      easing: [0.62, 0.86, 0.68, 0.99],
      duration: 0.2,
    },
  };

  const variants = {
    hidden: {
      ...cursorConfs,
      opacity: 0,
    },
    default: {
      ...cursorConfs,
    },
    withBackground: {
      ...cursorConfs,
      backgroundColor: "rgb(240 253 244)",
    },
  };

  return (
    <m.div
      variants={variants}
      animate={variantName}
      className="fixed z-50 text-sm pointer-events-none uppercase px-3 py-[2px] rounded-xl"
    >
      {text}
    </m.div>
  );
}

export default Cursor;
