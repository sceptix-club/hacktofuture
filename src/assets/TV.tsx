import { useMemo } from "react"
import { useGLTF } from "@react-three/drei";
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

type TVProps = {
  position?: [number, number, number]
  size: number
}

function useGlitchMaterial(texture?: THREE.Texture) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        uMap: { value: texture ?? null },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
      uniform sampler2D uMap;
      uniform float iTime;
      varying vec2 vUv;

      float rand(vec2 co){
          return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
      }

      void main() {
          vec2 uv = vUv;
          
          vec2 blockUv = floor(uv * 30.0) / 30.0;
          float blockVal = rand(blockUv + floor(iTime *2.0));
          
          float disp = (blockVal - 0.5) * 0.45;

          float r = texture2D(uMap, uv + vec2(0.02 * blockVal, 0.0)).r;
          float g = texture2D(uMap, uv).g;
          float b = texture2D(uMap, uv - vec2(0.02 * blockVal, 0.0)).b;
          vec3 col = vec3(r, g, b);

          float flicker = step(0.8, rand(uv + iTime));
          col += flicker * 0.3;

          gl_FragColor = vec4(col, 0.8);
      }
      `,
    })
  }, [texture])

  return material
}

export function TV(props: TVProps) {
  const { nodes } = useGLTF("/tv2-compressed-transformed.glb");
  const tvMesh = nodes.tv_low as THREE.Mesh;
  const tvMaterial = tvMesh.material as THREE.MeshStandardMaterial;
  const glitchMat = useGlitchMaterial(tvMaterial.map ?? undefined);

  useFrame((_, delta) => {
    glitchMat.uniforms.iTime.value += 3 * delta;
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        position={props.position}
        geometry={tvMesh.geometry}
        scale={(props.size < 6) ? 2.05 : 3.05}
        rotation={[-0.3, Math.PI * 0.75, -Math.PI / 2]}
      ><meshBasicMaterial color="white" side={THREE.BackSide} />
      </mesh>


      <mesh
        castShadow
        receiveShadow
        position={props.position}
        geometry={tvMesh.geometry}
        material={glitchMat}
        scale={(props.size < 6) ? 2.0 : 3.0}
        rotation={[-0.3, Math.PI * 0.75, -Math.PI / 2]}
      />
    </group >
  );
}

useGLTF.preload("/tv2-compressed-transformed.glb");
