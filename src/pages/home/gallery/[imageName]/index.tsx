import { useEffect, useState } from "react";
import { type NextPage } from "next";
import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import PaintBrushIcon from "~/components/icons/outline/PaintBrush";
import XMarkIcon from "~/components/icons/outline/XMark";

const Gallery: NextPage = () => {
  const [images, setImages] = useState<{
    before: StaticImageData;
    after: StaticImageData;
  }>();
  const [imagined, setImagined] = useState(false);
  const router = useRouter();
  const { imageName } = router.query;

  useEffect(() => {
    const importImages = async (name: string) => {
      const beforeImage = (await import(
        `public/imaginations/${name}-before.jpg`
      )) as StaticImageData;
      const afterImage = (await import(
        `public/imaginations/${name}-after.jpg`
      )) as StaticImageData;
      return {
        before: beforeImage,
        after: afterImage,
      };
    };
    if (typeof imageName === "string") {
      importImages(imageName).then(setImages).catch(console.log);
    }
  }, [imageName, imagined]);

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
                className="absolute bottom-[calc(4+env(safe-area-inset-bottom))] right-4 rounded-full bg-green-600 p-5 text-green-50 shadow-xl drop-shadow-xl"
              >
                <PaintBrushIcon />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="mx-4 my-2 rounded-md bg-green-100 p-3 shadow-xl drop-shadow-xl">
                <DropdownMenu.Label className="mb-2 text-lg font-medium">
                  Imagine...
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <button
                    className="my-1 italic"
                    onClick={() => setImagined(true)}
                  >
                    flowers
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <button
                    className="my-1 italic"
                    onClick={() => setImagined(true)}
                  >
                    greenery
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <button
                    className="my-1 italic"
                    onClick={() => setImagined(true)}
                  >
                    decorations
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-2 h-px bg-green-900 " />
                <DropdownMenu.Item>
                  <button
                    className="my-1 italic"
                    onClick={() => setImagined(true)}
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
            src={images.after}
            alt={imageName}
          />
          <button
            aria-label="Cancel..."
            onClick={() => setImagined(false)}
            className="absolute bottom-[calc(4+env(safe-area-inset-bottom))] right-4 rounded-full bg-green-600 p-5 text-green-50 shadow-xl drop-shadow-xl"
          >
            <XMarkIcon />
          </button>
        </>
      )}
    </div>
  );
};

export default Gallery;
