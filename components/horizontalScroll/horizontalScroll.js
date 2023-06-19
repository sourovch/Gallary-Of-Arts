import React, { useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import useHorizontalScroll from "@/hooks/useHorizontalScroll";
import ImageContainer from "./imageContainer";
import useImageConf from "@/hooks/useImageConf";
import cursorVariants from "@/stores/cursorvariants";

function HorizontalScroll({ imgArr }) {
  const imgConf = useImageConf({ imgArr });
  const {
    spring,
    gostHeight,
    refs: { scrollRef, gostRef },
  } = useHorizontalScroll({ reRender: imgConf });
  const [layoutInfo, setLayoutInfo] = useState(null);

  const setCursorText = cursorVariants((state) => state.setCursorText);
  const setVariantName = cursorVariants((state) => state.setVariant);

  return (
    <AnimatePresence>
      <div
        key={2}
        className="w-screen relative overflow-x-clip"
        ref={gostRef}
        style={{ height: gostHeight }}
      >
        <div className="sticky top-0 left-0" ref={scrollRef} key={1}>
          <m.div
            className="md:w-max flex relative h-screen items-center"
            style={{ x: spring }}
          >
            <div
              className="relative flex mx-3 items-center h-[90%] min-h-[400px] flex-wrap md:flex-nowrap"
              onMouseOver={() => {
                setVariantName("default");
                setCursorText("scroll to discover");
              }}
            >
              <ImageContainer imgConf={imgConf} setLayoutInfo={setLayoutInfo} />
            </div>
          </m.div>
        </div>
      </div>
      {layoutInfo ? (
        <m.div
          className="fixed h-screen w-screen grid place-content-center top-0 backdrop-blur-[var(--backdrop-blur)]"
          initial={{
            "--backdrop-blur": "0px",
          }}
          animate={{
            "--backdrop-blur": "8px",
          }}
          exit={{
            "--backdrop-blur": "0px",
          }}
          transition={{ duration: 1, type: "tween", ease: "easeOut" }}
          onClick={() => {
            document.body.dataset.noScroll = false;
            setLayoutInfo(null);
            setCursorText("");
            setVariantName("hidden");
          }}
          key={3}
          onMouseOver={() => {
            setCursorText("close");
            setVariantName("withBackground");
          }}
        >
          <m.img
            layoutId={layoutInfo.id}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.4,
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseOver={(e) => {
              e.stopPropagation();
              setCursorText("");
              setVariantName("hidden");
            }}
            src={`/images${layoutInfo.src}`}
            alt="featured"
            className="max-h-[80vh] m-auto object-cover max-w-[80vw]"
          />
        </m.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}

export default HorizontalScroll;
