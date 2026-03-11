import { Text } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type HtfProps = {
  viewportWidth: number;
  tlRef: React.RefObject<gsap.core.Timeline | null>;
};

const HackToFuture = ({ viewportWidth, tlRef }: HtfProps) => {
  const group = useRef<THREE.Group>(null);
  const font = "/fonts/DelaGothicOne-Regular.ttf";
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Guard: Check both refs exist
    if (!group.current) return;
    if (!tlRef?.current) return;
    
    // Prevent re-initialization
    if (isInitialized) return;

    try {
      // Set initial position
      group.current.position.set(0, 0, 5);

      // Add to timeline
      tlRef.current.to(
        group.current.position,
        {
          z: 15,
          duration: 1,
          ease: "none",
        },
        0.0
      );

      setIsInitialized(true);
    } catch (error) {
      console.error('HackToFuture animation error:', error);
    }
  }, [tlRef, tlRef?.current, isInitialized]); // Added tlRef.current as dependency

  // Reset initialization if tlRef changes
  useEffect(() => {
    return () => {
      setIsInitialized(false);
    };
  }, [tlRef]);

  // Don't render until we have valid viewport width
  if (!viewportWidth || viewportWidth <= 0) {
    return null;
  }

  const fontSize = viewportWidth < 15 ? 0.5 : 1.0;

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
      >
        HACKTOFUTURE
      </Text>

      <Text
        font={font}
        fontSize={fontSize}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        HACKTOFUTURE
      </Text>
    </group>
  );
};

export default HackToFuture;