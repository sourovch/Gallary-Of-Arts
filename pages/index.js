import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import useHorizontalScroll from "@/hooks/useHorizontalScroll";
import { motion as m } from "framer-motion";
import AccrodianPanal from "@/components/accrodian-panal";
import SvgSprits from "@/components/svs-sprits";
import accrodianData from "@/stores/accordianData";

export default function Page({ data: { displayImg, accordianContent } }) {
  const {
    spring,
    gostHeight,
    refs: { scrollRef, gostRef },
  } = useHorizontalScroll({ reRender: false });

  const activePanal = accrodianData((state) => state.activePanal);

  return (
    <>
      <div
        className="w-[99vw] relative overflow-x-clip"
        ref={gostRef}
        style={{ height: gostHeight }}
      >
        <div className="sticky top-0 left-0" ref={scrollRef}>
          <m.div
            className="md:w-max flex relative h-screen items-center md:flex-nowrap flex-wrap"
            style={{ x: spring }}
          >
            <div className="w-screen md:h-screen md:grid place-content-center">
              <div className="md:flex md:max-w-7xl items-center gap-[6.5rem] p-8">
                <div className="md:h-[60vh]">
                  <Image
                    className="md:-rotate-6 flex-1 h-full w-auto object-cover mb-5 md:mb-0"
                    src={`/images${displayImg}`}
                    width={1000}
                    height={1000}
                    alt="piyas"
                  />
                </div>
                <div className="max-w-prose">
                  <p className="ml-1">I am,</p>
                  <h1 className="xl:text-8xl text-5xl mb-7">Piyas Chowdhury</h1>
                  <p className="leading-8">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Culpa, quisquam illum? Aliquid
                  </p>
                </div>
              </div>
            </div>
            <div className="accordian">
              {accordianContent.map((data) => {
                let accData;

                if ((!activePanal && +data.id === 1) || activePanal === data.id)
                  accData = { ...data, active: true };
                else accData = data;

                return <AccrodianPanal key={data.id} accData={accData} />;
              })}
            </div>
          </m.div>
        </div>
      </div>
      <SvgSprits />
    </>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const res = await fs.readFile(filePath, "utf8");

  const data = JSON.parse(res);

  return { props: { data } };
}
