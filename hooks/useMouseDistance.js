"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

function useMouseDistance(cb) {
  const elem = useRef();

  const calculateDistance = useCallback(function (elem, mouseX, mouseY) {
    const elmRect = elem.getBoundingClientRect();
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - (elmRect.left + elmRect.width / 2), 2) +
          Math.pow(mouseY - (elmRect.top + elmRect.height / 2), 2)
      )
    );
  }, []);

  const mousemoveHandler = useCallback(function (e) {
    const mX = e.clientX;
    const mY = e.clientY;

    if (!!cb && typeof cb === "function")
      cb({
        elem: elem.current,
        distance: calculateDistance(elem.current, mX, mY),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = useCallback(() => {
    document.addEventListener("mousemove", mousemoveHandler);
    return elem.current;
  }, [mousemoveHandler]);
  const disconnect = useCallback(
    () => document.removeEventListener("mousemove", mousemoveHandler),
    [mousemoveHandler]
  );

  useLayoutEffect(() => {
    connect();

    return () => disconnect();
  }, [connect, disconnect]);

  return { ref: elem, connectionFn: { connect, disconnect } };
}

export default useMouseDistance;
