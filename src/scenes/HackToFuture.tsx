import { Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type HtfProps = {
  viewportWidth: number;
  timeline: gsap.core.Timeline | null;
};

const HackToFuture = ({ viewportWidth, timeline }: HtfProps) => {
  const group = useRef<THREE.Group>(null);
  const font = "/fonts/DelaGothicOne-Regular.ttf";


  const fontSize = viewportWidth < 15 ? 0.5 : 1.0;
  // Shift text to the RIGHT so "O" (index 5) lands at x=0
  // instead of the midpoint between O and F
  const offsetX = fontSize * 0.40;

  useEffect(() => {
    if (!timeline || !group.current) return;

    group.current.position.set(0, 0, 5);

    const tween = timeline.to(
      group.current.position,
      {
        z: 15,
        duration: 1,
        ease: "none",
      },
      0.0
    );

    return () => {
      if (tween) {
        tween.kill();
      }
    };
  }, [timeline]);

  return (
    <group ref={group}>
      <Text
        font={font}
        fontSize={fontSize}
        color="black"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.3}
        outlineWidth={0.02}
        outlineColor="black"
        outlineOpacity={0.5}
        position={[offsetX, 0, 0]}
      >
        HACKTOFUTURE
      </Text>

      <Text
        font={font}
        fontSize={fontSize}
        color="grey"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.1}
        outlineWidth={0.04}
        outlineColor="grey"
        outlineOpacity={0.3}
        position={[offsetX, 0, 0]}
      >
        HACKTOFUTURE
      </Text>

      <Text
        font={font}
        fontSize={fontSize}
        color="white"
        anchorX="center"
        anchorY="middle"
        position={[offsetX, 0, 0]}
      >
        HACKTOFUTURE
      </Text>
    </group>
  );
};

export default HackToFuture;