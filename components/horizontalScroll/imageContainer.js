"use client";

import React from "react";
import MouseSenImage from "./mouseSenImage";

function ImageContainer({ imgConf, setLayoutInfo }) {
  return (
    <>
      {imgConf?.map((confObj) => (
        <div
          key={confObj.id}
          className="min-w-[30vh] h-full relative gallary-img-cont flex flex-col justify-around items-end py-8 gap-2"
        >
          {confObj.arr.map((imgInfo) => (
            <MouseSenImage
              onClick={() => setLayoutInfo(() => imgInfo)}
              layoutId={imgInfo.id}
              data-delay="160"
              className="gallary-img w-[25vh] select-none cursor-pointer"
              src={`/images${imgInfo.src}`}
              alt="featured"
              key={imgInfo.id}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default ImageContainer;
