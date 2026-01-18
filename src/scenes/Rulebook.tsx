import { useEffect, useRef } from 'react'
import React from 'react'
import * as THREE from "three"
import { useGLTF, useAnimations } from '@react-three/drei'

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

useGLTF.preload('/comic.glb')

export default Comic
