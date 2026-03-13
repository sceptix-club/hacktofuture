import { Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { wallImagesPrefix } from "../lib/utils";

interface MarqueeGridProps {
  viewportWidth: number;
  imageUrls?: string[][];
  scrollProgressRef: React.RefObject<number>;
}

const MarqueeGrid = ({
  viewportWidth,
  imageUrls,
  scrollProgressRef,
}: MarqueeGridProps) => {
  const config = useMemo(() => {
    if (viewportWidth < 15) {
      return {
        columns: 4,
        imagesPerColumn: 4,
        position: [0, 0, -8] as [number, number, number],
        imageScale: [3, 4] as [number, number],
        imageSpacing: 5,
        columnSpacing: 3.5,
        marqueeSpeed: 2,
      };
    }
    return {
      columns: 6,
      imagesPerColumn: 4,
      position: [0, 0, -10] as [number, number, number],
      imageScale: [7, 9] as [number, number],
      imageSpacing: 10,
      columnSpacing: 8,
      marqueeSpeed: 2,
    };
  }, [viewportWidth]);

  const {
    columns,
    imagesPerColumn,
    position,
    imageScale,
    imageSpacing,
    columnSpacing,
    marqueeSpeed,
  } = config;

  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for each image mesh in each column
  // Structure: imageRefs[colIndex][imageIndex] = THREE.Mesh
  const imageRefs = useRef<(THREE.Mesh | null)[][]>(
    Array(columns).fill(null).map(() => [])
  );

  const imageColumns = useMemo(() => {
    if (imageUrls) {
      return imageUrls.map((urls) => urls.map((url) => ({ url })));
    }

    return Array.from({ length: columns }, (_, colIndex) =>
      Array.from({ length: imagesPerColumn }, (_, imgIndex) => {
        const imageNum = (colIndex * imagesPerColumn + imgIndex + 1) % 14 || 14;
        return {
          url: `${wallImagesPrefix}${imageNum}.webp`,
        };
      })
    );
  }, [imageUrls, columns, imagesPerColumn]);

  // Total height of one complete set
  const totalHeight = imagesPerColumn * imageSpacing;
  
  // We render 3 sets (above, middle, below) for seamless scrolling
  const sets = 3;
  const fullHeight = totalHeight * sets;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const scrollProgress = scrollProgressRef?.current ?? 0;

    const scene1Threshold = 0.072132;
    const isScene1 = scrollProgress < scene1Threshold;

    groupRef.current.visible = isScene1;

    if (!isScene1) return;

    // Animate each column's images
    imageRefs.current.forEach((colImages, colIndex) => {
      const dir = colIndex % 2 === 0 ? 1 : -1;
      const speed = (0.3 + colIndex * 0.15) * marqueeSpeed;
      const movement = speed * delta * dir;

      colImages.forEach((mesh) => {
        if (!mesh) return;

        mesh.position.y += movement;

        // Wrap position for infinite scroll
        // When image goes too far up, move it to bottom
        // When image goes too far down, move it to top
        const halfHeight = fullHeight / 2;

        if (mesh.position.y > halfHeight) {
          mesh.position.y -= fullHeight;
        } else if (mesh.position.y < -halfHeight) {
          mesh.position.y += fullHeight;
        }
      });
    });
  });

  // Reset refs when columns change
  useMemo(() => {
    imageRefs.current = Array(columns).fill(null).map(() => []);
  }, [columns]);

  return (
    <group ref={groupRef} position={position}>
      {imageColumns.map((images, colIndex) => {
        let imageIndex = 0;

        return (
          <group
            key={colIndex}
            position={[
              (colIndex - (imageColumns.length - 1) / 2) * columnSpacing,
              0,
              0,
            ]}
          >
            {/* Render 3 sets: one above, one middle, one below */}
            {[-1, 0, 1].map((setOffset) =>
              images.map((img, imgIdx) => {
                const currentImageIndex = imageIndex++;
                const yPos = -imgIdx * imageSpacing + setOffset * totalHeight;

                return (
                  <Image
                    key={`${setOffset}-${imgIdx}`}
                    ref={(el) => {
                      if (imageRefs.current[colIndex]) {
                        imageRefs.current[colIndex][currentImageIndex] = el as unknown as THREE.Mesh;
                      }
                    }}
                    url={img.url}
                    scale={imageScale}
                    position={[0, yPos, 0]}
                    transparent
                    opacity={0.5}
                  />
                );
              })
            )}
          </group>
        );
      })}
    </group>
  );
};

export default MarqueeGrid;