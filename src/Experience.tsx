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

  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  const initialViewportWidth = useRef(viewport.width);
  const [stableViewportWidth, setStableViewportWidth] = useState(
    viewport.width || 10
  );

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const newWidth = viewport.width || 10;
        initialViewportWidth.current = newWidth;
        setStableViewportWidth(newWidth);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewport.width]);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    const isMobile = stableViewportWidth < 20;
    const base = isMobile ? 0.6 : 1.0;

    const scene1Camera = { posX: 0, posY: 0, posZ: 20, rotZ: 0 };
    const scene1TV = { scale: 1, rotY: 0 };

    tl.to(
      scene1Camera,
      {
        posX: 0,
        posY: 0,
        posZ: 14,
        rotZ: Math.PI / 6,
        duration: 0.88,
        onUpdate: () => {
          if (!camera) return;
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
        duration: 0.88,
        onUpdate: () => {
          if (!tvRef.current) return;
          tvRef.current.scale.setScalar(scene1TV.scale);
          tvRef.current.rotation.y = scene1TV.rotY;
        },
      },
      0
    );

    const cam2 = { x: 0, y: -28, z: 10 };

    tl.to(
      cam2,
      {
        z: 1,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (!camera) return;
          camera.position.set(cam2.x, cam2.y, cam2.z);
          camera.lookAt(0, -30, 0);
        },
      },
      ">"
    );

    tl.to(cam2, {
      duration: 0.1,
      onUpdate: () => {
        if (!camera) return;
        camera.position.set(cam2.x, cam2.y, cam2.z);
        camera.lookAt(0, -30, 0);
      },
    });

    const scene3State = { progress: 0 };
    tl.to(
      scene3State,
      {
        progress: 1,
        duration: 1,
        onUpdate: () => {
          if (!camera) return;
          camera.position.set(0, -60, 0);
          camera.lookAt(0, -60, 0);
        },
      },
      2.0
    );

    const scene4State = { progress: 0 };
    tl.to(
      scene4State,
      {
        progress: 1,
        duration: 1.55,
        onUpdate: () => {
          if (!camera) return;
          camera.position.set(0, -60, 0);
          camera.lookAt(0, -60, 0);
        },
      },
      3.0
    );

    const scene5State = { angle: Math.PI * 1.5 };
    const pivot = { x: 0, y: -124, z: 0 };
    const radius = 10;

    const updateCardCamera = () => {
      if (!camera) return;
      const a = scene5State.angle;
      camera.position.set(
        pivot.x - Math.cos(a) * radius,
        pivot.y - Math.sin(a) * radius,
        pivot.z + 10
      );
      camera.rotation.set(0, 0, a + Math.PI / 2);
    };

		const start = 4.55
		const duration = 0.65/2

    tl.set(
      scene5State,
      { angle: Math.PI * 1.5, onUpdate: updateCardCamera },
      // 4.55
			start
    );

    tl.to(
      scene5State,
      {
        angle: Math.PI * 1.5,
        duration: duration,
        onUpdate: updateCardCamera,
      },
      // 4.55
			start
    );

    tl.to(scene5State, {
      angle: Math.PI * 2,
      duration: duration,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 2,
      duration: duration,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 2.5,
      duration: duration,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 2.5,
      duration: duration,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 3,
      duration: duration,
      onUpdate: updateCardCamera,
    });

    tl.to(scene5State, {
      angle: Math.PI * 3,
      duration: duration,
      onUpdate: updateCardCamera,
    });

		const scene6start = 4.55 + duration*10
		const scene6duration = 0.4

    const scene6State = { progress: 0 };
    tl.to(
      scene6State,
      {
        progress: 1,
        duration: 4.4,
        onUpdate: () => {
          if (!camera) return;
          const a = Math.PI * 3;
          camera.position.set(
            pivot.x - Math.cos(a) * radius,
            pivot.y - Math.sin(a) * radius,
            pivot.z + 10
          );
          camera.rotation.set(0, 0, a + Math.PI / 2);
        },
      },
      // 7.8
			scene6start
    );

    const cardFade = { opacity: 1 };
    tl.to(
      cardFade,
      {
        opacity: 0,
        duration: scene6duration,
        onUpdate: () => {
          if (!cardsGroupRef.current) return;
          cardsGroupRef.current.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mat = (child as THREE.Mesh)
                .material as THREE.MeshStandardMaterial;
              if (mat) {
                mat.transparent = true;
                mat.opacity = cardFade.opacity;
              }
            }
          });
        },
      },
      // 8.2
			scene6start + scene6duration
    );

    // tl.set({}, {}, 12.2);
		tl.set({}, {}, scene6start + scene6duration * 2);

    setTimeline(tl);

    return () => {
      tl.kill();
      setTimeline(null);
    };
  }, [scenes, camera, stableViewportWidth]);

  useFrame((state) => {
    const scrollProgress = scrollProgressRef.current || 0;
    if (timeline) {
      timeline.progress(scrollProgress);
    }

    if (pointerRef.current) {
      const p = state.pointer;
      if (p) {
        const worldPoint = new THREE.Vector3(p.x, p.y, 0.5).unproject(
          state.camera
        );

        const dir = worldPoint.sub(state.camera.position).normalize();
        const ray = new THREE.Ray(state.camera.position, dir);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

        const hit = new THREE.Vector3();
        if (ray.intersectPlane(plane, hit)) {
          pointerRef.current.position.copy(hit);
          pointerRef.current.position.z += 2;
        }
      }
    }
  });

  return (
    <>
      {/* Scene 1 */}
      <MarqueeGrid
        viewportWidth={stableViewportWidth}
        scrollProgressRef={scrollProgressRef}
      />
      <group ref={tvRef}>
        <TV position={[0, 0, 0]} size={stableViewportWidth} />
      </group>
      <HackToFuture viewportWidth={stableViewportWidth} timeline={timeline} />

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

        {/* Scene 2 Clouds - inside the group so they move with it */}
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud
            concentrate="outside"
            seed={5}
            bounds={8}
            volume={3}
            segments={5}
            growth={8}
            opacity={0.4}
            position={[-6, -2, -2]}
            speed={0.3}
            color="#ffffff"
          />
          <Cloud
            concentrate="inside"
            seed={8}
            bounds={6}
            volume={2}
            segments={4}
            growth={6}
            opacity={0.35}
            position={[6, -2, -2]}
            speed={0.35}
            color="#ffffff"
          />
          <Cloud
            concentrate="outside"
            seed={12}
            bounds={5}
            volume={2}
            segments={4}
            growth={5}
            opacity={0.3}
            position={[0, -4, -3]}
            speed={0.25}
            color="#ffffff"
          />
          <Cloud
            concentrate="inside"
            seed={15}
            bounds={6}
            volume={2}
            segments={3}
            growth={4}
            opacity={0.25}
            position={[-4, 2, -2]}
            speed={0.3}
            color="#ffffff"
          />
          <Cloud
            concentrate="outside"
            seed={20}
            bounds={5}
            volume={2}
            segments={4}
            growth={5}
            opacity={0.3}
            position={[4, 2, -2]}
            speed={0.28}
            color="#ffffff"
          />
        </Clouds>

        <Comic timeline={timeline} />
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
      <Cards pointerRef={pointerRef} groupRef={cardsGroupRef} />

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
