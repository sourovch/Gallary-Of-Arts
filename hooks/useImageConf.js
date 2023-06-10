"use client";

import { useLayoutEffect, useState } from "react";

function useImageConf({ seqArr = [1, 2, 2, 3], imgArr: arr = [] }) {
  const [confState, setConfState] = useState([]);

  useLayoutEffect(() => {
    const conf = [];
    const seqArrLength = seqArr.length;
    let seqArrIndex = 0;
    let i = 0;
    let id = 0;

    while (i < arr.length) {
      const seq = seqArr[seqArrIndex];
      const tempArrLength = Math.min(seq, arr.length - i);
      const tempArr = new Array(tempArrLength);

      for (let j = 0; j < tempArrLength; j++) {
        tempArr[j] = arr[i];
        if (j < tempArrLength - 1) i++;
      }

      seqArrIndex = (seqArrIndex + 1) % seqArrLength;
      conf.push({ id, arr: tempArr });
      i++;
      id++;
    }

    setConfState(() => [...conf]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return confState;
}

export default useImageConf;
