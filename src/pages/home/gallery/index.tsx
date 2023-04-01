import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { mockPlaces } from "~/data";

const Gallery: NextPage = () => {
  return (
    <div className="flex-1 basis-0 columns-2 gap-0 overflow-y-scroll">
      {Object.keys(mockPlaces).map((name) => (
        <Link key={name} href={`gallery/${name}`}>
          <Image
            className="aspect-[9/16] object-cover"
            width={216}
            height={384}
            src={`/imaginations/${name}-original.png`}
            alt={name}
          />
        </Link>
      ))}
    </div>
  );
};

export default Gallery;
