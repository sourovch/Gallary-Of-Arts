import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";

export default function Page({ data: displayImg }) {
  return (
    <div className="w-screen h-screen md:grid place-content-center">
      <div className="md:flex md:max-w-7xl items-center gap-[6.5rem] p-8">
        <div className="md:h-[40rem]">
          <Image
            className="md:-rotate-6 flex-1 h-full w-auto object-cover"
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
            quisquam illum? Aliquid
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const res = await fs.readFile(filePath, "utf8");

  const data = JSON.parse(res).displayImg;

  return { props: { data } };
}
