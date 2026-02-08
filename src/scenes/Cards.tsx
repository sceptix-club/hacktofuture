import { useMemo } from "react";
import * as THREE from "three";

export default function Cards() {
  const texLoader = useMemo(() => new THREE.TextureLoader(), []);

  const maps = useMemo(() => {
    const color = texLoader.load("/textures/broken_brick_wall_diff_1k.jpg");
    color.colorSpace = THREE.SRGBColorSpace;
    const disp = texLoader.load("/textures/broken_brick_wall_disp_1k.png");
    const normal = texLoader.load("/textures/broken_brick_wall_nor_gl_1k.png");
    const rough = texLoader.load("/textures/broken_brick_wall_rough_1k.png");
    return { color, disp, normal, rough };
  }, [texLoader]);

  const radius = 10;

  return (
    <group position={[0, -124, 0]}>
      {/* Card 1 - Top (0 degrees) */}
      <mesh position={[0, radius, 0]}>
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
      <mesh position={[radius, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
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
      <mesh position={[0, -radius, 0]} rotation={[0, 0, Math.PI]}>
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
      <mesh position={[-radius, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
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
