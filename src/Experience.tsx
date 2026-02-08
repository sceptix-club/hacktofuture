import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import MarqueeGrid from "./assets/Wall";
import { TV } from "./assets/TV";
import HackToFuture from "./scenes/HackToFuture";
import { Comic, ComicInstances } from "./scenes/Rulebook";
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
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    const base = viewport.width < 10 ? 0.6 : 1.0;

    // Scene 1: TV zoom (0.0 - 1.0)
    const scene1Camera = { posX: 0, posY: 0, posZ: 20, rotZ: 0 };
    const scene1TV = { scale: 1, rotY: 0 };

    tl.to(scene1Camera, {
      posX: 0,
      posY: 0,
      posZ: 10,
      rotZ: Math.PI / 6,
      duration: 1,
      onUpdate: () => {
        camera.position.set(scene1Camera.posX, scene1Camera.posY, scene1Camera.posZ);
        camera.lookAt(0, 0, 10);
        camera.rotation.z = scene1Camera.rotZ;
      },
    }, 0);

    tl.to(scene1TV, {
      scale: 3 * base,
      rotY: Math.PI * 2,
      duration: 1,
      onUpdate: () => {
        if (tvRef.current) {
          tvRef.current.scale.setScalar(scene1TV.scale);
          tvRef.current.rotation.y = scene1TV.rotY;
        }
      },
    }, 0);

    // Scene 2: Circular camera around Rulebook (1.0 - 2.0)
    const scene2State = { progress: 0 };
    tl.to(scene2State, {
      progress: 1,
      duration: 1,
      onUpdate: () => {
        const p = scene2State.progress;
        const angle = p * Math.PI * 2;
        const radius = THREE.MathUtils.lerp(12, 3, p);
        const height = THREE.MathUtils.lerp(15, 1.5, p);
        const targetY = -30 + THREE.MathUtils.lerp(0, -0.3, p);

        camera.position.set(
          Math.sin(angle) * radius,
          -30 + height,
          Math.cos(angle) * radius
        );
        camera.lookAt(0, targetY, 0);
      },
    }, 1.0);

    // Scene 3: Blank space for Sponsors (2.0 - 3.0)
    const scene3State = { progress: 0 };
    tl.to(scene3State, {
      progress: 1,
      duration: 1,
      onUpdate: () => {
        camera.position.set(0, -60, 0)
        camera.lookAt(0, -60, 0);
      },
    }, 2.0);

    // Scene 4: Still camera rotation (3.0 - 4.0)
    const scene4State = { progress: 0 };
    tl.to(scene4State, {
      progress: 1,
      duration: 1,
      onUpdate: () => {
        const p = scene4State.progress;
        const radius = 5;
        const angle = p * Math.PI * 2;
        camera.position.set(
          Math.sin(angle) * radius,
          -90 + Math.cos(angle * 0.5) * 2,
          Math.cos(angle) * radius
        );
        camera.lookAt(0, -90, 0);
      },
    }, 3.0);

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

    // Snap camera to Card 1 at start of scene 5
    tl.set(scene5State, { angle: Math.PI * 0.5, onUpdate: updateCardCamera }, 4.0);

    // Pause at Card 1
    tl.to(scene5State, {
      angle: Math.PI * 0.5,
      duration: 0.4,
      onUpdate: updateCardCamera,
    }, 4.0);

    // Card 2
    tl.to(scene5State, {
      angle: Math.PI,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    // Pause at Card 2
    tl.to(scene5State, {
      angle: Math.PI,
      duration: 0.2,
      onUpdate: updateCardCamera,
    });

    // Card 3
    tl.to(scene5State, {
      angle: Math.PI * 1.5,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    // Pause at Card 3
    tl.to(scene5State, {
      angle: Math.PI * 1.5,
      duration: 0.2,
      onUpdate: updateCardCamera,
    });

    // Card 4
    tl.to(scene5State, {
      angle: Math.PI * 2,
      duration: 0.3,
      onUpdate: updateCardCamera,
    });

    // Pad timeline to 7.0 so it aligns with text timeline
    tl.set({}, {}, 7.0);

    return () => {
      tl.kill();
    };
  }, [scenes, viewport.width, camera]);

  useFrame((state) => {
    const scrollProgress = scrollProgressRef.current || 0;
    const time = scrollProgress * scenes;
    const current = Math.min(Math.floor(time), scenes - 1);
    const progress = time % 1;

    setProgress(progress);
    currentSceneRef.current = current;

    if (tlRef.current) {
      tlRef.current.progress(scrollProgress);
    }

    // Pointer light
    if (pointerRef.current) {
      const p = state.pointer

      const worldPoint = new THREE.Vector3(p.x, p.y, 0.5).unproject(state.camera)
      const dir = worldPoint.sub(state.camera.position).normalize()

      const ray = new THREE.Ray(state.camera.position, dir)

      const cardsPlane = new THREE.Plane(
        new THREE.Vector3(0, 0, 1),
        0
      )

      const hit = new THREE.Vector3()
      if (ray.intersectPlane(cardsPlane, hit)) {
        pointerRef.current.position.copy(hit)
        pointerRef.current.position.z += 2
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
          position={[-10, -35, 0]}
          speed={0.4}
        />
      </Clouds>

      {/* Scene 1 */}
      <MarqueeGrid viewportWidth={viewport.width} />
      <group ref={tvRef}>
        <TV position={[0, 0, 0]} size={viewport.width} />
      </group>
      <HackToFuture viewportWidth={viewport.width} progress={progress} />

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

        <Comic />
        <ComicInstances
          count={30}
          speed={1}
          bounds={{
            x: [-20, 20],
            y: [-10, 10],
            z: [-20, 20],
          }}
          position={[0, -5, 0]}
        />
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
      <group position={[0, -90, 0]}>
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
      <Cards progress={scrollProgressRef} currentScene={currentSceneRef} />

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
