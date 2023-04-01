import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const OpenStreetMap = dynamic(() => import("~/components/OpenStreetMap"), {
  ssr: false,
});

const Ideas: NextPage = () => {
  const { data: posts } = api.posts.getAll.useQuery();
  const router = useRouter();
  const { latitude, longtitude } = router.query;

  if (!posts) return <div>Loading...</div>;

  if (
    typeof latitude === "string" &&
    typeof longtitude === "string" &&
    parseFloat(latitude) &&
    parseFloat(longtitude)
  ) {
    const coords = {
      latitude: parseFloat(latitude),
      longtitude: parseFloat(longtitude),
    };
    return <OpenStreetMap posts={posts} initialLocation={coords} />;
  }
  return <OpenStreetMap posts={posts} />;
};

export default Ideas;
