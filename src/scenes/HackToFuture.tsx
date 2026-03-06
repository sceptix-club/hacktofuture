import { Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three'

type HtfProps = {
  viewportWidth: number;
  tlRef: React.RefObject<gsap.core.Timeline | null>
}

const HackToFuture = ({ viewportWidth, tlRef }: HtfProps) => {
  const group = useRef<THREE.Group>(null)
  const font = "/fonts/DelaGothicOne-Regular.ttf";

  useEffect(() => {
    if (!tlRef?.current || !group.current) return
    group.current.position.set(0, 0, 5)
    tlRef.current.to(
      group.current.position,
      {
        z: 15,
        duration: 1,
        ease: "none"
      },
      0.0
    )
  }, [tlRef])

  return (
    <>
      <group ref={group}>
        <Text
          font={font}
          fontSize={viewportWidth < 15 ? 0.5 : 1.0}
          color="black"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.3}
          outlineWidth={0.02}
          outlineColor="black"
          outlineOpacity={0.5}
        >
          HACKTOFUTURE
        </Text>

        <Text
          font={font}
          fontSize={viewportWidth < 15 ? 0.5 : 1.0}
          color="grey"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.1}
          outlineWidth={0.04}
          outlineColor="grey"
          outlineOpacity={0.3}
        >
          HACKTOFUTURE
        </Text>

        <Text
          font={font}
          fontSize={viewportWidth < 15 ? 0.5 : 1.0}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          HACKTOFUTURE
        </Text>
      </group>
    </>
  );
};

export default HackToFuture
