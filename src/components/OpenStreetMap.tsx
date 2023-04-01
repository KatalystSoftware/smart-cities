import Image from "next/image";
import { useSession } from "next-auth/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import ThumbsUpIcon from "~/components/icons/ThumbsUp";
import ThumbsDownIcon from "~/components/icons/ThumbsDown";
import { api } from "~/utils/api";

type Post = inferRouterOutputs<AppRouter>["posts"]["getAll"][0];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - this is a hack to fix the broken leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

// const espooPosition = new LatLng(60.1841, 24.8301);
const roundaboutPosition = new LatLng(60.188984, 24.83447);

const OpenStreetMap: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const like = api.posts.like.useMutation();
  const dislike = api.posts.dislike.useMutation();
  const { data: session } = useSession();

  return (
    <MapContainer
      center={roundaboutPosition}
      zoom={18}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "calc(100vh - 4rem)" }}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {posts.map((post) => (
        <Marker
          key={post.id}
          position={new LatLng(post.latitude, post.longtitude)}
        >
          <Popup>
            <div className="flex w-48 flex-col gap-2">
              <span className="text-xl font-medium text-green-950">
                {post.title}
              </span>
              <Image
                src={`/imaginations/${post.image}-after.jpg`}
                alt={post.image}
                width={192}
                height={192}
              />
              {!post.likedById.includes(session?.user.id as string) &&
              !post.dislikedById.includes(session?.user.id as string) ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => like.mutate({ postId: post.id })}
                    className="text-green-500"
                  >
                    <ThumbsUpIcon />
                    Like
                  </button>
                  <button
                    onClick={() => dislike.mutate({ postId: post.id })}
                    className="text-red-500"
                  >
                    <ThumbsDownIcon />
                    Dislike
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <span className="text-green-500">
                    <ThumbsUpIcon />
                    {post.likedById.length}
                  </span>
                  <span className="text-red-500">
                    <ThumbsDownIcon />
                    {post.dislikedById.length}
                  </span>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMap;
