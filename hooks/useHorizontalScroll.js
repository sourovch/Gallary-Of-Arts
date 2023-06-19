"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

function useHorizontalScroll({ reRender }) {
  const gostRef = useRef();
  const scrollRef = useRef();
  const [scrollWidth, setScrollWidth] = useState(null);
  const [viewPortW, setViewPortW] = useState(null);

  useLayoutEffect(() => {
    scrollRef && setScrollWidth(scrollRef.current.scrollWidth);

    function handelResize() {
      setScrollWidth(scrollRef.current.scrollWidth);
    }

    window.addEventListener("resize", handelResize);
    window.scrollTo(0, 0)

    return () => window.removeEventListener("resize", handelResize);
  }, [scrollRef, reRender]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewPortW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeOvserver = new ResizeObserver((entries) => onResize(entries));

    resizeOvserver.observe(gostRef.current);

    return () => resizeOvserver.disconnect();
  }, [onResize, gostRef]);

  const { scrollYProgress } = useScroll({
    target: gostRef,
    offset: ["start start", "end end"],
  });

  const transform = useTransform(
    scrollYProgress,
    [0, .7],
    [0, viewPortW - scrollWidth]
  );

  const physics = { damping: 10, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return { spring, gostHeight: scrollWidth, refs: { scrollRef, gostRef } };
}

export default useHorizontalScroll;
