import { useEffect, useState } from "react";
import { type NextPage } from "next";
import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/router";
import NextIcon from "~/components/icons/outline/ArrowRight";
import { api } from "~/utils/api";

const mockCoordinates = {
  "gas-station": {
    latitude: 60.179469707555974,
    longtitude: 24.82547910980197,
  },
  park: {
    latitude: 60.173119,
    longtitude: 24.916141,
  },
  "parking-lot": {
    latitude: 60.18751822007836,
    longtitude: 24.821056834534467,
  },
  roundabout: {
    latitude: 60.188984,
    longtitude: 24.83447,
  },
  "roundabout-alt": {
    latitude: 60.188984,
    longtitude: 24.83447,
  },
  wall: {
    latitude: 60.21655,
    longtitude: 24.82842,
  },
  default: {
    latitude: 60.1841,
    longtitude: 24.8301,
  },
} as const;

const Gallery: NextPage = () => {
  const [image, setImage] = useState<StaticImageData>();
  const [title, setTitle] = useState("");
  const router = useRouter();
  const { imageName } = router.query;
  const mutation = api.posts.save.useMutation();

  useEffect(() => {
    if (typeof imageName === "string") {
      import(`public/imaginations/${imageName}-after.jpg`)
        .then(setImage)
        .catch(console.log);
    }
  }, [imageName]);

  if (typeof imageName !== "string" || !image) {
    return null;
  }

  const savePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const coords =
      mockCoordinates[imageName as keyof typeof mockCoordinates] ||
      mockCoordinates.default;
    await mutation.mutateAsync({
      title,
      image: imageName,
      ...coords,
    });
    await router.push("/ideas");
  };

  return (
    <div className="relative flex w-screen flex-1 items-end justify-center gap-2 pb-4">
      <Image
        fill
        className="aspect-[9/16] object-cover"
        src={image}
        alt={imageName}
      />
      <form
        className="relative flex w-full items-center gap-2 rounded-full font-semibold"
        onSubmit={(e) => void savePost(e)}
      >
        <input
          type="text"
          value={title}
          placeholder="Title your imagination..."
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-full bg-green-50 p-6 text-green-950 shadow-xl drop-shadow-xl"
        />
        <button className="absolute right-1 flex items-center gap-2 rounded-full bg-green-600 p-5 font-semibold text-green-50 shadow-xl drop-shadow-xl">
          <NextIcon />
        </button>
      </form>
    </div>
  );
};

export default Gallery;
