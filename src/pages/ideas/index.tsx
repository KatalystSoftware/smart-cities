import { type NextPage } from "next";
import dynamic from "next/dynamic";

const OpenStreetMap = dynamic(() => import('./OpenStreetMap'), {
  ssr: false,
})

const Ideas: NextPage = () => {
  return <OpenStreetMap />
};

export default Ideas;
