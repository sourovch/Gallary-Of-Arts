import Transition from "@/components/Transition";
import HorizontalScroll from "@/components/horizontalScroll";
import { promises as fs } from "fs";
import path from "path";

export default function Page({ data }) {
  return (
    <Transition>
      <HorizontalScroll imgArr={data} />
    </Transition>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const res = await fs.readFile(filePath, "utf8");

  const data = JSON.parse(res).images;

  return { props: { data } };
}
