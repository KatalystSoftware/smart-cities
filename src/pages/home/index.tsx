import { type NextPage } from "next";
import Link from "next/link";
import ArrowUpTray from "~/components/icons/outline/ArrowUpTray";
import Camera from "~/components/icons/outline/Camera";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-8 text-xl text-green-950">
      <Link
        href="home/gallery"
        className="disabled:drop-shadow-mdflex flex gap-4 rounded-lg bg-green-300 bg-gradient-rd from-green-400 via-green-400 to-green-500 px-4 py-6 shadow-md drop-shadow-lg disabled:bg-stone-200 disabled:from-stone-300 disabled:via-stone-200 disabled:to-stone-200 disabled:text-stone-800 disabled:opacity-70 disabled:shadow-inner disabled:drop-shadow-md"
      >
        <ArrowUpTray />
        <span>Imagine from gallery...</span>
      </Link>
      <button
        disabled
        className="disabled:drop-shadow-mdflex flex gap-4 rounded-lg bg-green-300 bg-gradient-rd from-green-400 via-green-400 to-green-500 px-4 py-6 shadow-md drop-shadow-lg disabled:bg-stone-200 disabled:from-stone-300 disabled:via-stone-200 disabled:to-stone-200 disabled:text-stone-800 disabled:opacity-70 disabled:shadow-inner disabled:drop-shadow-md"
      >
        <Camera />
        <span>Imagine something new...</span>
      </button>
    </div>
  );
};

export default Home;
