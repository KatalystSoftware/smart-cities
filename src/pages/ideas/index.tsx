import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";

const OpenStreetMap = dynamic(() => import("./OpenStreetMap"), {
  ssr: false,
});

const Ideas: NextPage = () => {
  const { data: posts } = api.posts.getAll.useQuery();

  if (!posts) return <div>Loading...</div>;
  return <OpenStreetMap posts={posts} />;
};

export default Ideas;
