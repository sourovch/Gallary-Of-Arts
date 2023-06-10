import useMouseDistance from "@/hooks/useMouseDistance";
import React, { useCallback } from "react";
import { motion as m } from "framer-motion";
import cursorVariants from "@/stores/cursorvariants";

function MouseSenImage({ src, alt, className, layoutId, onClick, ...rest }) {
  const mouseDistHandler = useCallback(({ elem, distance }) => {
    function mapNumber(input, inputMin, inputMax, outputMin, outputMax) {
      input = Math.min(Math.max(input, inputMin), inputMax);

      const inputRange = inputMax - inputMin;
      const outputRange = outputMax - outputMin;
      const scaledValue = (input - inputMin) / inputRange;
      const output = (1 - scaledValue) * outputRange + outputMin;

      return output;
    }

    const effectRadious = 450;
    const scaleMax = 1.1;
    const scaleMin = 0.7;

    setTimeout(() => {
      requestAnimationFrame(() => {
        elem.style.setProperty(
          "--scale",
          mapNumber(distance, 0, effectRadious, scaleMin, scaleMax)
        );
      });
    }, +elem.dataset.delay || 130);
  }, []);

  const {
    ref,
    connectionFn: { connect, disconnect },
  } = useMouseDistance(mouseDistHandler);

  const setVariantName = cursorVariants((state) => state.setVariant);
  const setCursorText = cursorVariants((state) => state.setCursorText);

  return (
    <m.img
      layoutId={layoutId}
      transition={{
        type: "tween",
        easings: "easeOut",
        duration: 0.4,
      }}
      onTap={(e) => {
        document.body.dataset.noScroll = true;
        disconnect();
        requestAnimationFrame(() => (e.target.style.scale = 1));
        onClick();
      }}
      onLayoutAnimationComplete={() => {
        const elem = connect();
        elem.style.scale = "";
      }}
      onMouseEnter={() => {
        setCursorText(src);
        setVariantName("withBackground");
      }}
      onMouseLeave={() => {
        setCursorText('');
        setVariantName("default");
      }}
      onMouseOver={(e) => e.stopPropagation()}
      src={src}
      alt={alt}
      className={`${className} m-scale will-change-transform z-[2] hover:z-[3]`}
      ref={ref}
      {...rest}
    />
  );
}

export default MouseSenImage;
