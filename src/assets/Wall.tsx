import { Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import halftoneUrl from "./halftone.png";

interface MarqueeGridProps {
  viewportWidth: number;
  imageUrls?: string[][];
  columns?: number;
  imagesPerColumn?: number;
  position?: [number, number, number];
  imageScale?: [number, number];
  imageSpacing?: number;
  columnSpacing?: number;
  marqueeSpeed?: number;
}

const MarqueeGrid = ({
  viewportWidth,
  imageUrls,
  columns = 6,
  imagesPerColumn,
  position,
  imageScale,
  imageSpacing,
  columnSpacing,
  marqueeSpeed,
}: MarqueeGridProps) => {
  if (viewportWidth < 15) {
    (columns = 4),
      (imagesPerColumn = 3),
      (position = [0, 0, -8]),
      (imageScale = [3, 4]),
      (imageSpacing = 5),
      (columnSpacing = 3.5),
      (marqueeSpeed = 2);
  } else {
    (columns = 6),
      (imagesPerColumn = 3),
      (position = [0, 0, -10]),
      (imageScale = [7, 9]),
      (imageSpacing = 10),
      (columnSpacing = 8),
      (marqueeSpeed = 2);
  }

  const groupRef = useRef<THREE.Group>(null);
  const columnRefs = useRef<(THREE.Group | null)[]>([]);

  const imageColumns = useMemo(() => {
    if (imageUrls) {
      return imageUrls.map((urls) => urls.map((url) => ({ url })));
    }

    return Array.from({ length: columns }, (_, colIndex) =>
      Array.from({ length: imagesPerColumn }, (_, imgIndex) => ({
        url: `https://picsum.photos/seed/${
          colIndex * imagesPerColumn + imgIndex
        }/400/500`,
      }))
    );
  }, [imageUrls, columns, imagesPerColumn]);

  const wallWidth = (imageColumns.length - 1) * columnSpacing + imageScale[0];
  const wallHeight = imagesPerColumn * imageSpacing + imageScale[1];
  const wallCenterY = -((imagesPerColumn - 1) * imageSpacing) / 2;

  useFrame(() => {
    columnRefs.current.forEach((col, index) => {
      if (!col) return;

      const dir = index % 2 === 0 ? 1 : -1;
      const speed = (0.3 + index * 0.15) * marqueeSpeed;

      col.position.y -= speed * 0.005 * dir;
      const columnHeight = (imageColumns[index].length * imageSpacing) / 3;
      col.position.y =
        ((col.position.y % columnHeight) + columnHeight) % columnHeight;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {imageColumns.map((images, colIndex) => (
        <group
          key={colIndex}
          ref={(el) => (columnRefs.current[colIndex] = el)}
          position={[
            (colIndex - (imageColumns.length - 1) / 2) * columnSpacing,
            0,
            0,
          ]}
        >
          {images.map((img, imgIndex) => (
            <group key={imgIndex} position={[0, -imgIndex * imageSpacing, 0]}>
              <Image
                url={img.url}
                scale={imageScale}
                transparent
                opacity={0.5}
              />
              <Image
                url={halftoneUrl}
                scale={imageScale}
                transparent
                opacity={0.35}
                position={[0, 0, 0.02]}
                renderOrder={10}
              />
            </group>
          ))}
          {images.map((img, imgIndex) => (
            <group
              key={`dup-${imgIndex}`}
              position={[
                0,
                -imgIndex * imageSpacing + images.length * imageSpacing,
                0,
              ]}
            >
              <Image
                url={img.url}
                scale={imageScale}
                transparent
                opacity={0.5}
              />
              <Image
                url={halftoneUrl}
                scale={imageScale}
                transparent
                opacity={0.35}
                position={[0, 0, 0.02]}
                renderOrder={10}
              />
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};

export default MarqueeGrid;
