import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

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

import "leaflet/dist/leaflet.css";

const OpenStreetMap: React.FC<{ posts: Post[] }> = ({ posts }) => {
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
            <span className="text-lg font-medium text-green-950">
              {post.title}
            </span>
            <Image
              src={`/imaginations/${post.image}-after.jpg`}
              alt={post.image}
              width={200}
              height={200}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMap;
