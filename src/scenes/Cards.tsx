import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type CardsProps = {
  pointerRef: React.RefObject<THREE.PointLight | null>
  groupRef?: React.RefObject<THREE.Group | null>
};

export default function Cards({ pointerRef, groupRef }: CardsProps) {
  const texLoader = useMemo(() => new THREE.TextureLoader(), []);

  const cardsRef = useRef<THREE.Mesh[]>([])

  const maps = useMemo(() => {
    const color = texLoader.load("/textures/broken_brick_wall_diff_1k.jpg");
    color.colorSpace = THREE.SRGBColorSpace;
    const disp = texLoader.load("/textures/broken_brick_wall_disp_1k.png");
    const normal = texLoader.load("/textures/broken_brick_wall_nor_gl_1k.png");
    const rough = texLoader.load("/textures/broken_brick_wall_rough_1k.png");
    return { color, disp, normal, rough };
  }, [texLoader]);

  useEffect(() => {
    cardsRef.current = [];
  }, []);

  useFrame((_, dt) => {
    if (!pointerRef.current || !cardsRef.current || cardsRef.current?.length === 0)
      return

    const pointerPos = pointerRef.current.position;

    for (const card of cardsRef.current) {
      const worldPos = new THREE.Vector3();
      card.getWorldPosition(worldPos);

      const dir = pointerPos.clone().sub(worldPos);

      const targetRotX = -dir.y * 0.03;
      const targetRotY = dir.x * 0.03;

      card.rotation.x = THREE.MathUtils.lerp(card.rotation.x, targetRotX, 2 * dt);
      card.rotation.y = THREE.MathUtils.lerp(card.rotation.y, targetRotY, 2 * dt);
    }
  });

  const radius = 10;

  return (
    <group ref={groupRef} position={[0, -124, 0]}>
      {/* Card 1 - Top (0 degrees) */}
      <mesh
        ref={(m) => { if (m) cardsRef.current[0] = m }}
        position={[0, radius, 0]}>
        <planeGeometry args={[3, 4, 64, 64]} />
        <meshStandardMaterial
          map={maps.color}
          displacementMap={maps.disp}
          displacementScale={0.1}
          normalMap={maps.normal}
          roughnessMap={maps.rough}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Card 2 - Right (90 degrees) */}
      <mesh
        ref={(m) => { if (m) cardsRef.current[1] = m }}
        position={[radius, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[3, 4, 64, 64]} />
        <meshStandardMaterial
          map={maps.color}
          displacementMap={maps.disp}
          displacementScale={0.1}
          normalMap={maps.normal}
          roughnessMap={maps.rough}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Card 3 - Bottom (180 degrees) */}
      <mesh
        ref={(m) => { if (m) cardsRef.current[2] = m }}
        position={[0, -radius, 0]} rotation={[0, 0, Math.PI]}>
        <planeGeometry args={[3, 4, 64, 64]} />
        <meshStandardMaterial
          map={maps.color}
          displacementMap={maps.disp}
          displacementScale={0.1}
          normalMap={maps.normal}
          roughnessMap={maps.rough}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Card 4 - Left (270 degrees) */}
      <mesh
        ref={(m) => { if (m) cardsRef.current[3] = m }}
        position={[-radius, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[3, 4, 64, 64]} />
        <meshStandardMaterial
          map={maps.color}
          displacementMap={maps.disp}
          displacementScale={0.1}
          normalMap={maps.normal}
          roughnessMap={maps.rough}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
