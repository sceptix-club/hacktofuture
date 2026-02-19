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
  const [progress, setProgress] = useState(0);
  const currentSceneRef = useRef(0);
  const tvRef = useRef<THREE.Group | null>(null);
  const pointerRef = useRef<THREE.PointLight | null>(null);
  const scene6Ref = useRef<THREE.Group | null>(null);
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

    tl.to(
      cam2,
      {
        z: 6,
        duration: 0.4,
        ease: "power2.in",
        onUpdate: () => {
          camera.position.set(cam2.x, cam2.y, cam2.z);
          camera.lookAt(0, -30, 0);
        },
      },
      1.0
    );

    tl.to(cam2, {
      y: -28,
      z: 1,
      duration: 0.35,
      ease: "power1.inOut",
      onUpdate: () => {
        camera.position.set(cam2.x, cam2.y, cam2.z);
        camera.lookAt(0, -30, 0);
      },
    });
    tl.to(cam2, {
      duration: 0.15,
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

    // Scene 4: Still camera rotation (3.0 - 4.0)
    const scene4State = { progress: 0 };
    tl.to(
      scene4State,
      {
        progress: 1,
        duration: 1,
        onUpdate: () => {
          camera.position.set(0, -60, 0);
          camera.lookAt(0, -60, 0);
        },
      },
      3.0
    );

    // Scene 5: Cards with pauses (4.0 - 5.0)
    const scene5State = { angle: Math.PI * 0.5 };
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
      { angle: Math.PI * 0.5, onUpdate: updateCardCamera },
      4.0
    );

    tl.to(
      scene5State,
      {
        angle: Math.PI * 0.5,
        duration: 0.5,
        onUpdate: updateCardCamera,
      },
      4.0
    );

    tl.to(scene5State, {
      angle: Math.PI,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI,
      duration: 0.2,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 1.5,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 1.5,
      duration: 0.2,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 2,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 2,
      duration: 0.2,
      onUpdate: updateCardCamera,
    });

    // Scene6: CTA section
    const scene6State = { progress: 0 };
    tl.to(
      scene6State,
      {
        progress: 1,
        duration: 1,
        onUpdate: () => {
          camera.position.set(0, -150, 0);
          camera.lookAt(0, -150, 0);
        },
      },
      6.0
    );

    tl.set({}, {}, 10.0);

    return () => {
      tl.kill();
    };
  }, [scenes, camera, stableViewportWidth]); // Added stableViewportWidth as dependency

  const lastProgressRef = useRef(-1);
  const lastSceneRef = useRef(-1);

  useFrame((state) => {
    const scrollProgress = scrollProgressRef.current || 0;

    if (
      tlRef.current &&
      Math.abs(scrollProgress - lastProgressRef.current) > 0.0005
    ) {
      lastProgressRef.current = scrollProgress;
      tlRef.current.progress(scrollProgress);
    }

    const time = scrollProgress * scenes;
    const current = Math.min(Math.floor(time), scenes - 1);
    const p = time % 1;

    // Only call setProgress if it actually changed — avoids 60 React re-renders/sec
    if (Math.abs(p - lastSceneRef.current) > 0.005) {
      lastSceneRef.current = p;
      setProgress(p);
    }

    currentSceneRef.current = current;

    // Pointer light
    if (pointerRef.current) {
      const pt = state.pointer;
      const worldPoint = new THREE.Vector3(pt.x, pt.y, 0.5).unproject(
        state.camera
      );
      const dir = worldPoint.sub(state.camera.position).normalize();
      const ray = new THREE.Ray(state.camera.position, dir);
      const cardsPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hit = new THREE.Vector3();
      if (ray.intersectPlane(cardsPlane, hit)) {
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
      <HackToFuture viewportWidth={stableViewportWidth} progress={progress} />

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

        <Comic progress={progress} />
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
        progress={scrollProgressRef}
        currentScene={currentSceneRef}
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
