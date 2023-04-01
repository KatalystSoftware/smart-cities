import { type NextPage } from "next";
import Link from "next/link";
import ArrowUpTray from "~/components/icons/outline/ArrowUpTray";
import Camera from "~/components/icons/outline/Camera";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-8 text-xl text-green-950">
      <Link
        href="home/gallery"
        className="flex gap-4 rounded-lg bg-green-500 px-4 py-6 shadow-md drop-shadow-lg disabled:bg-stone-400 disabled:text-stone-800 disabled:shadow-inner disabled:drop-shadow-md"
      >
        <ArrowUpTray />
        <span>Imagine from gallery...</span>
      </Link>
      <button
        disabled
        className="flex gap-4 rounded-lg bg-green-500 px-4 py-6 shadow-md drop-shadow-lg disabled:bg-stone-400 disabled:text-stone-800 disabled:shadow-inner disabled:drop-shadow-md"
      >
        <Camera />
        <span>Imagine something new...</span>
      </button>
    </div>
  );
};

export default Home;
