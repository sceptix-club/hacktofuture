import { useEffect, useRef, useState } from 'react'
import React from 'react'
import * as THREE from "three"
import { useGLTF, useAnimations, Instances, Instance } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


function Comic(props: React.JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/comic.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const action = actions['Action']
    if (!action) return
    action.setLoop(THREE.LoopRepeat, Infinity)
    action.play()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="GLTF_SceneRootNode">
          <group name="Hoja_5" position={[0, -30, 0]} rotation={[-0.262, 0, 0]}>
            <mesh name="Object_12" castShadow receiveShadow geometry={(nodes as any).Object_12.geometry} material={materials.Paper} />
          </group>
        </group>
        <mesh name="Object_4" castShadow receiveShadow geometry={(nodes as any).Object_4.geometry} material={materials.Cover} position={[0, 0.015, 0]} rotation={[2.88, 0, Math.PI]} />
        <mesh name="Object_5" castShadow receiveShadow geometry={(nodes as any).Object_5.geometry} material={materials.Paper} position={[0, 0.015, 0]} rotation={[2.88, 0, Math.PI]} />
        <mesh name="Object_7" castShadow receiveShadow geometry={(nodes as any).Object_7.geometry} material={materials.Black} position={[0, -0.097, 0]} scale={[0.949, 0.01, 0.01]} />
      </group>
    </group>
  )
}

interface ComicInstancesProps {
  count?: number
  speed?: number
  bounds?: {
    x: [number, number]
    y: [number, number]
    z: [number, number]
  }
  position: [number, number, number]
}

interface ComicInstanceProps {
  index: number
  speed: number
  bounds: {
    x: [number, number]
    y: [number, number]
    z: [number, number]
  }
  basePosition?: [number, number, number]
  baseRotation?: [number, number, number]
  baseScale?: [number, number, number]
}

function ComicInstances({
  count = 100,
  speed = 1,
  bounds = {
    x: [-10, 10],
    y: [-10, 10],
    z: [-50, 0]
  },
  position
}: ComicInstancesProps) {
  const { nodes, materials } = useGLTF('/comic.glb')

  return (
    <group position={position}>
      <Instances limit={count} range={count} castShadow receiveShadow geometry={(nodes as any).page.geometry} material={materials.Paper}>
        {Array.from({ length: count }, (_, i) => (
          <ComicInstance
            key={`paper-${i}`}
            index={i}
            speed={speed}
            bounds={bounds}
            basePosition={[0, 0.015, 0]}
            baseRotation={[2.88, 0, Math.PI]}
          />
        ))}
      </Instances>
    </group>
  )
}


function ComicInstance({
  index,
  speed,
  bounds,
  basePosition = [0, 0, 0],
  baseRotation = [0, 0, 0],
  baseScale = [1, 1, 1]
}: ComicInstanceProps) {
  const ref = useRef<THREE.Group>(null)

  const [data] = useState(() => {
    const xRange = bounds.x[1] - bounds.x[0]
    const yRange = bounds.y[1] - bounds.y[0]
    const zRange = bounds.z[1] - bounds.z[0]

    return {
      x: bounds.x[0] + Math.random() * xRange,
      y: bounds.y[0] + Math.random() * yRange,
      z: bounds.z[0] + Math.random() * zRange,
      spin: THREE.MathUtils.randFloat(8, 12),
      rX: Math.random() * Math.PI,
      rZ: Math.random() * Math.PI
    }
  })

  useFrame((state, dt) => {
    if (!ref.current || dt >= 0.1) return

    data.y += dt * speed

    if (data.y > bounds.y[1]) {
      data.y = bounds.y[0]
    }

    ref.current.position.set(
      data.x + basePosition[0],
      data.y + basePosition[1],
      data.z + basePosition[2]
    )

    ref.current.rotation.set(
      (data.rX += dt / data.spin) + baseRotation[0],
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI + baseRotation[1],
      (data.rZ += dt / data.spin) + baseRotation[2]
    )

    ref.current.scale.set(...baseScale)
  })

  return <Instance ref={ref} />
}

useGLTF.preload('/comic.glb')
export { Comic, ComicInstances }
