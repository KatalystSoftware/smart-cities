import { useEffect, useState } from "react";
import { type NextPage } from "next";
import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import PaintBrushIcon from "~/components/icons/outline/PaintBrush";
import UndoIcon from "~/components/icons/outline/ArrowUturnLeft";
import NextIcon from "~/components/icons/outline/ArrowRight";
import Link from "next/link";
import { mockPlaces, type PlaceVariant } from "~/data";

const Gallery: NextPage = () => {
  const [images, setImages] = useState<Record<PlaceVariant, StaticImageData>>();
  const [imagined, setImagined] = useState<PlaceVariant | false>(false);
  const router = useRouter();
  const { imageName } = router.query;
  const place =
    mockPlaces[imageName as keyof typeof mockPlaces] || mockPlaces.default;

  useEffect(() => {
    const importImages = async (name: string) => {
      const variantImages = await Promise.all(
        place.variants.map(
          async (variant): Promise<[PlaceVariant, StaticImageData]> => [
            variant,
            (await import(
              `public/imaginations/${name}-${variant}.jpg`
            )) as StaticImageData,
          ]
        )
      );

      return Object.fromEntries(variantImages) as Record<
        PlaceVariant,
        StaticImageData
      >;
    };

    if (typeof imageName === "string") {
      importImages(imageName).then(setImages).catch(console.log);
    }
  }, [imageName, place]);

  if (
    typeof imageName !== "string" ||
    !images ||
    !images.before ||
    !images.after
  ) {
    return null;
  }

  return (
    <div className="relative w-screen flex-1">
      {!imagined ? (
        <>
          <Image
            fill
            className="aspect-[9/16] object-cover"
            src={images.before}
            alt={imageName}
          />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                aria-label="Imagine..."
                className="absolute bottom-4 right-4 rounded-full bg-green-600 p-5 text-green-50 shadow-xl drop-shadow-xl"
              >
                <PaintBrushIcon />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="mx-4 my-2 rounded-md bg-green-100 p-3 shadow-xl drop-shadow-xl">
                <DropdownMenu.Label className="mb-2 text-lg font-medium">
                  Imagine...
                </DropdownMenu.Label>
                {place.variants.map((variant) => (
                  <DropdownMenu.Item key={variant}>
                    <button
                      className="my-1 italic"
                      onClick={() => setImagined(variant)}
                    >
                      {variant}
                    </button>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className="my-2 h-px bg-green-900 " />
                <DropdownMenu.Item>
                  <button
                    className="my-1 italic"
                    onClick={() => setImagined(false)}
                  >
                    something else
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </>
      ) : (
        <>
          <Image
            fill
            className="aspect-[9/16] object-cover"
            src={images[imagined]}
            alt={imageName}
          />
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              aria-label="Undo"
              onClick={() => setImagined(false)}
              className="self-end rounded-full bg-green-400 p-5 text-green-800 shadow-lg drop-shadow-lg"
            >
              <UndoIcon />
            </button>
            <Link
              href={`/home/gallery/${imageName}/imagine`}
              className="flex gap-2 rounded-full bg-green-600 p-5 font-semibold text-green-50 shadow-xl drop-shadow-xl"
            >
              Continue
              <NextIcon />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
