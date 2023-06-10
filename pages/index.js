import HorizontalScroll from "@/components/horizontalScroll";
import { promises as fs } from "fs";

export default function Page({ data }) {
  return <HorizontalScroll imgArr={data} />;
}

export async function getServerSideProps() {
  const res = await fs.readFile("public/data.json", "utf8");

  const data = JSON.parse(res);

  return { props: { data } };
}
