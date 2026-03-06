import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import MarqueeGrid from "./assets/Wall";
import { TV } from "./assets/TV";
import HackToFuture from "./scenes/HackToFuture";
import { Comic } from "./scenes/Rulebook";
import Cards from "./scenes/Cards";
import { Cloud, Clouds } from "@react-three/drei";

interface ExperienceProps {
  scrollProgressRef: React.RefObject<number>;
  scenes: number;
}

const Experience = ({ scrollProgressRef, scenes }: ExperienceProps) => {
  const { camera, viewport } = useThree();
  const tvRef = useRef<THREE.Group | null>(null);
  const pointerRef = useRef<THREE.PointLight | null>(null);
  const scene6Ref = useRef<THREE.Group | null>(null);
  const cardsGroupRef = useRef<THREE.Group | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Capture initial viewport width
  const initialViewportWidth = useRef(viewport.width);
  const [stableViewportWidth, setStableViewportWidth] = useState(
    viewport.width
  );
  // Update viewport width on actual window resize
  useEffect(() => {
    const handleResize = () => {
      // Small delay to ensure viewport has updated
      setTimeout(() => {
        initialViewportWidth.current = viewport.width;
        setStableViewportWidth(viewport.width);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewport.width]);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    const isMobile = stableViewportWidth < 20;
    const base = isMobile ? 0.6 : 1.0;

    // Scene 1: TV zoom (0.0 - 1.0)
    const scene1Camera = { posX: 0, posY: 0, posZ: 20, rotZ: 0 };
    const scene1TV = { scale: 1, rotY: 0 };

    tl.to(
      scene1Camera,
      {
        posX: 0,
        posY: 0,
        posZ: 14,
        rotZ: Math.PI / 6,
        duration: 1,
        onUpdate: () => {
          camera.position.set(
            scene1Camera.posX,
            scene1Camera.posY,
            scene1Camera.posZ
          );
          camera.lookAt(0, 0, 10);
          camera.rotation.z = scene1Camera.rotZ;
        },
      },
      0
    );

    tl.to(
      scene1TV,
      {
        scale: 2 * base,
        rotY: Math.PI / 3,
        duration: 1,
        onUpdate: () => {
          if (tvRef.current) {
            tvRef.current.scale.setScalar(scene1TV.scale);
            tvRef.current.rotation.y = scene1TV.rotY;
          }
        },
      },
      0
    );

    // Scene 2: Circular camera around Rulebook (1.0 - 2.0)
    const scene2State = { progress: 0 };
    const cam2 = { x: 0, y: -28, z: 10 };
    tl.to(cam2, {
      z: 1,
      duration: 0.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.position.set(cam2.x, cam2.y, cam2.z);
        camera.lookAt(0, -30, 0);
      },
    }, 1.0);

    tl.to(cam2, {
      duration: 0.1,
      onUpdate: () => {
        camera.position.set(cam2.x, cam2.y, cam2.z);
        camera.lookAt(0, -30, 0);
      },
    });

    // Scene 3: Blank space for Sponsors (2.0 - 3.0)
    const scene3State = { progress: 0 };
    tl.to(
      scene3State,
      {
        progress: 1,
        duration: 1,
        onUpdate: () => {
          camera.position.set(0, -60, 0);
          camera.lookAt(0, -60, 0);
        },
      },
      2.0
    );

    // Scene 4: Still camera (3.0 - 5.0) – extended for TimerTimeline dwell
    const scene4State = { progress: 0 };
    tl.to(
      scene4State,
      {
        progress: 1,
        duration: 2,
        onUpdate: () => {
          camera.position.set(0, -60, 0);
          camera.lookAt(0, -60, 0);
        },
      },
      3.0
    );

    // Scene 5: Cards with pauses (5.0 - 6.0) – starts from Theme 3
    const scene5State = { angle: Math.PI * 1.5 };
    const pivot = { x: 0, y: -124, z: 0 };
    const radius = 10;

    const updateCardCamera = () => {
      const a = scene5State.angle;
      camera.position.set(
        pivot.x - Math.cos(a) * radius,
        pivot.y - Math.sin(a) * radius,
        pivot.z + 10
      );
      camera.rotation.set(0, 0, a + Math.PI / 2);
    };

    tl.set(
      scene5State,
      { angle: Math.PI * 1.5, onUpdate: updateCardCamera },
      5.0
    );

    // Theme 3 (bottom) – pause
    tl.to(
      scene5State,
      {
        angle: Math.PI * 1.5,
        duration: 0.5,
        onUpdate: updateCardCamera,
      },
      5.0
    );

    // Theme 3 → Theme 4 (left)
    tl.to(scene5State, {
      angle: Math.PI * 2,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    // Theme 4 – pause
    tl.to(scene5State, {
      angle: Math.PI * 2,
      duration: 0.4,
      onUpdate: updateCardCamera,
    });

    // Theme 4 → Theme 1 (top)
    tl.to(scene5State, {
      angle: Math.PI * 2.5,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    // Theme 1 – pause
    tl.to(scene5State, {
      angle: Math.PI * 2.5,
      duration: 0.4,
      onUpdate: updateCardCamera,
    });

    // Theme 1 → Theme 2 (right)
    tl.to(scene5State, {
      angle: Math.PI * 3,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    // Theme 2 – pause
    tl.to(scene5State, {
      angle: Math.PI * 3,
      duration: 0.4,
      onUpdate: updateCardCamera,
    });

    // Scene6: CTA + FAQ section (extended duration) – camera stays on last card
    const scene6State = { progress: 0 };
    tl.to(
      scene6State,
      {
        progress: 1,
        duration: 4.4,
        onUpdate: () => {
          const a = Math.PI * 3;
          camera.position.set(
            pivot.x - Math.cos(a) * radius,
            pivot.y - Math.sin(a) * radius,
            pivot.z + 10
          );
          camera.rotation.set(0, 0, a + Math.PI / 2);
        },
      },
      7.8
    );

    // Fade 3D cards out once CTA is halfway visible
    const cardFade = { opacity: 1 };
    tl.to(
      cardFade,
      {
        opacity: 0,
        duration: 0.4,
        onUpdate: () => {
          if (cardsGroupRef.current) {
            cardsGroupRef.current.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
                mat.transparent = true;
                mat.opacity = cardFade.opacity;
              }
            });
          }
        },
      },
      8.2
    );

    tl.set({}, {}, 12.2);

    return () => {
      tl.kill();
    };
  }, [scenes, camera, stableViewportWidth]); // Added stableViewportWidth as dependency

  useFrame((state) => {
    const scrollProgress = scrollProgressRef.current || 0;
    if (tlRef.current) {
      tlRef.current.progress(scrollProgress);
    }

    // pointer light
    if (pointerRef.current) {
      const p = state.pointer;
      const worldPoint = new THREE.Vector3(p.x, p.y, 0.5)
        .unproject(state.camera);

      const dir = worldPoint.sub(state.camera.position).normalize();
      const ray = new THREE.Ray(state.camera.position, dir);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      const hit = new THREE.Vector3();
      if (ray.intersectPlane(plane, hit)) {
        pointerRef.current.position.copy(hit);
        pointerRef.current.position.z += 2;
      }
    }
  });

  return (
    <>
      <Clouds>
        <Cloud
          concentrate="outside"
          seed={2}
          bounds={15}
          volume={4}
          segments={5}
          growth={20}
          opacity={0.2}
          position={[-10, -28, 5]}
          speed={0.4}
        />
      </Clouds>

      {/* Scene 1 */}
      <MarqueeGrid viewportWidth={stableViewportWidth} />
      <group ref={tvRef}>
        <TV position={[0, 0, 0]} size={stableViewportWidth} />
      </group>
      <HackToFuture viewportWidth={stableViewportWidth} tlRef={tlRef} />

      {/* Scene 2 */}
      <group position={[0, -30, 0]}>
        <ambientLight intensity={0.85} />

        <directionalLight
          position={[8, 12, 6]}
          intensity={1.6}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Comic tlRef={tlRef} />
      </group>

      {/* Scene 3: Blank space for Sponsors */}
      <group position={[0, -60, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2, 2]} />
          <meshStandardMaterial
            color="red"
            metalness={0.8}
            roughness={0.3}
            envMapIntensity={1}
          />
        </mesh>
      </group>

      {/* Scene 4 */}
      <group position={[0, -60, 0]}>
        {/* <mesh position={[0, 0, 0]}>*/}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2, 2]} />
          <meshStandardMaterial
            color="red"
            metalness={0.8}
            roughness={0.3}
            envMapIntensity={1}
          />
        </mesh>
      </group>

      {/* Scene 5: Cards */}
      <group ref={scene6Ref} position={[0, -150, 0]} />
      <Cards
        pointerRef={pointerRef}
        groupRef={cardsGroupRef}
      />

      <pointLight
        ref={pointerRef}
        intensity={10}
        distance={10}
        decay={2}
        color="white"
      />
    </>
  );
};

export default Experience;
