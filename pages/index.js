import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import useHorizontalScroll from "@/hooks/useHorizontalScroll";
import { motion as m } from "framer-motion";
import AccrodianPanal from "@/components/accrodianPanal";
import SvgSprits from "@/components/svgSprits";
import accrodianData from "@/stores/accordianData";
import { useRef } from "react";
import Transition from "@/components/Transition";

export default function Page({ data: { displayImg, accordianContent } }) {
  const {
    spring,
    gostHeight,
    refs: { scrollRef, gostRef },
  } = useHorizontalScroll({ reRender: false });
  const scrollBtnRef = useRef();

  const activePanal = accrodianData((state) => state.activePanal);
  const setCursorText = accrodianData((state) => state.setCursorText);

  return (
    <Transition>
      <div
        className="w-[calc(90vh - 10px)] relative overflow-x-clip"
        ref={gostRef}
        style={{ height: gostHeight }}
      >
        <div className="sticky top-0 left-0" ref={scrollRef}>
          <m.div
            className="md:w-max flex relative h-screen items-center md:flex-nowrap flex-wrap"
            style={{ x: spring }}
          >
            <div className="w-screen md:h-screen md:grid place-content-center relative">
              <button
                ref={scrollBtnRef}
                className="absolute bottom-10 right-10 w-[4rem] aspect-square border-2 border-black rounded-full p-2 bt-hover transition-all ease-out duration-200 hidden md:block point-right focus:outline outline-blue-600 outline-offset-1"
                onClick={() => {
                  const onBottom =
                    Math.ceil(window.innerHeight + window.scrollY) >=
                    document.documentElement.offsetHeight;

                  if (onBottom) {
                    window.scrollTo(0, 0);
                    scrollBtnRef.current.classList.add("point-right");
                    return;
                  }

                  window.scrollTo(0, document.documentElement.offsetHeight);
                  scrollBtnRef.current.classList.remove("point-right");
                }}
              >
                <Image
                  height={100}
                  width={100}
                  src="/icons/arrow.png"
                  alt="arrow"
                  className="w-full h-full"
                />
              </button>
              <div className="md:flex md:max-w-7xl items-center gap-[6.5rem] p-8 pb-2">
                <m.div
                  className="md:h-[60vh] md:-rotate-6"
                  initial={{ rotate: 0, transformOrigin: "10px 10px" }}
                  animate={{ rotate: 3 }}
                  transition={{ delay: 0.7 }}
                >
                  <Image
                    className="flex-1 h-full w-auto object-cover mb-10 md:mb-0 mx-auto"
                    src={`/images${displayImg}`}
                    width={1000}
                    height={1000}
                    alt="piyas"
                  />
                </m.div>
                <m.div
                  className="max-w-prose"
                  initial={{ x: 70, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: .4 }}
                >
                  <p className="ml-1">I am,</p>
                  <h1 className="xl:text-8xl text-5xl mb-7">Piyas Chowdhury</h1>
                  <p className="leading-8">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Culpa, quisquam illum? Aliquid
                  </p>
                </m.div>
              </div>
            </div>
            <div className="accordian">
              <div className="flex items-center pl-4 pt-4 pb-2">
                <h1 className="text-2xl capitalize text-center text-black animate-ul md:hidden">
                  recent works
                </h1>
              </div>
              {accordianContent.map((data) => {
                let accData;

                if ((!activePanal && +data.id === 1) || activePanal === data.id)
                  accData = { ...data, active: true };
                else accData = data;

                return <AccrodianPanal key={data.id} accData={accData} />;
              })}
              <div className="flex items-center pl-4 pt-4 pb-2">
                <h1 className="text-3xl uppercase text-center text-black animate-ul hidden md:block text-vartical tracking-wide">
                  recent works
                </h1>
              </div>
            </div>
          </m.div>
        </div>
      </div>
      <SvgSprits />
    </Transition>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const res = await fs.readFile(filePath, "utf8");

  const data = JSON.parse(res);

  return { props: { data } };
}
