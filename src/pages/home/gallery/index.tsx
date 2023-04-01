import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import roundabout from "public/imaginations/roundabout-before.jpg";
import roundaboutAlt from "public/imaginations/roundabout-alt-before.jpg";
import park from "public/imaginations/park-before.jpg";
import wall from "public/imaginations/wall-before.jpg";
import gasStation from "public/imaginations/gas-station-before.jpg";
import parkingLot from "public/imaginations/parking-lot-before.jpg";

const Gallery: NextPage = () => {
  return (
    <div className="flex-1 basis-0 columns-2 gap-0 overflow-y-scroll">
      <Link href="gallery/roundabout">
        <Image
          className="aspect-[9/16] object-cover"
          src={roundabout}
          alt="Roundabout"
        />
      </Link>
      <Link href="gallery/roundabout-alt">
        <Image
          className="aspect-[9/16] object-cover"
          src={roundaboutAlt}
          alt="Roundabout"
        />
      </Link>
      <Link href="gallery/park">
        <Image className="aspect-[9/16] object-cover" src={park} alt="Park" />
      </Link>
      <Link href="gallery/wall">
        <Image className="aspect-[9/16] object-cover" src={wall} alt="Wall" />
      </Link>
      <Link href="gallery/gas-station">
        <Image
          className="aspect-[9/16] object-cover"
          src={gasStation}
          alt="Wall"
        />
      </Link>
      <Link href="gallery/parking-lot">
        <Image
          className="aspect-[9/16] object-cover"
          src={parkingLot}
          alt="Wall"
        />
      </Link>
    </div>
  );
};

export default Gallery;
