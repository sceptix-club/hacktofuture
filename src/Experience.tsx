import { useRef, useState } from 'react';
import { useFrame, useThree, } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import Wall from './assets/Wall';
import { TV } from './assets/TV';
import HackToFuture from './scenes/HackToFuture';
import Rulebook from './scenes/Rulebook'

const Experience = () => {
  const scroll = useScroll();
  const { camera, viewport } = useThree();
  const SCENES = 3;
  const [progress, setProgress] = useState(0)

  const currentSceneRef = useRef<number>(0);

  const tvRef = useRef<THREE.Group>(null);
  const cameraStart = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 20));

  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = scroll.offset * SCENES;
    const current = Math.min(Math.floor(time), SCENES - 1);
    const progress = time % 1;

    setProgress(progress)
    currentSceneRef.current = current;

    switch (current) {
      case 0:
        if (tvRef.current) {
          const target = new THREE.Vector3(0, 0, 10);
          camera.position.lerpVectors(cameraStart.current, target, progress);
          camera.lookAt(target)
          camera.rotation.z = THREE.MathUtils.lerp(0, Math.PI / 6, progress);

          const base = viewport.width < 10 ? 0.6 : 1.0;
          const scale = THREE.MathUtils.lerp(1, 3 * base, progress);
          tvRef.current.scale.setScalar(scale);
          tvRef.current.rotation.y = progress * Math.PI * 2;
        }
        break;

      case 1:
        {
          const target = new THREE.Vector3(0, -30, 0);

          const angle = progress * Math.PI * 2
          const radius = THREE.MathUtils.lerp(12, 3, progress);
          const height = THREE.MathUtils.lerp(15, 1.5, progress);

          camera.position.x = Math.sin(angle) * radius;
          camera.position.y = -30 + height;
          camera.position.z = Math.cos(angle) * radius;

          target.y += THREE.MathUtils.lerp(0, -0.3, progress);;
          camera.lookAt(target);
        }
        break;

      case 2:
        const radius = 5;
        const angle = progress * Math.PI * 2;
        camera.position.x = Math.sin(angle) * radius;
        camera.position.y = -60 + Math.cos(angle * 0.5) * 2;
        camera.position.z = Math.cos(angle) * radius;
        camera.lookAt(0, -60, 0);

        if (torusRef.current) {
          const et = state.clock.elapsedTime;
          const pulsate = 1 + Math.sin(et * 2) * 0.1;
          torusRef.current.scale.setScalar(pulsate);
        }
        break;
    }
  });

  return (
    <>
      {/* Scene 1 */}
      <Wall size={viewport.width} />
      <group ref={tvRef} >
        <TV position={[0, 0, 0]} size={viewport.width} />
      </group>
      <HackToFuture
        viewportWidth={viewport.width}
        progress={progress}
      />

      {/* Scene 2 */}
      <group position={[0, -30, 0]}>
        <ambientLight intensity={0.5} />
        <pointLight castShadow position={[10, 10, 10]} intensity={1} />
        <Rulebook />
      </group>

      {/* Scene 3 */}
      <group position={[0, -60, 0]}>
        <mesh ref={torusRef} position={[0, 0, 0]}>
          <torusGeometry args={[2, 0.6, 32, 100]} />
          <meshStandardMaterial
            color="#50c878"
            metalness={0.8}
            roughness={0.3}
            envMapIntensity={1}
          />
        </mesh>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ffd700" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
      </group>
    </>
  );
};

export default Experience;
