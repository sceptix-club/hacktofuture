import { useEffect, useRef } from 'react'
import React from 'react'
import * as THREE from "three"
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame, useGraph } from '@react-three/fiber'
import { SkeletonUtils } from 'three/examples/jsm/Addons.js'

type ComicProps = {
  progress: number
}

function Comic({ progress }: ComicProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/book.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  let pr = 0;
  const startTime = 0.6
  const endTime = 0.8  // whatever your actual max is

  if (progress > startTime) {
    pr = (progress - startTime) / (endTime - startTime)
    pr = Math.min(pr, 1) // clamp to 1
  }

  // In useEffect - play but freeze at time 0
  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (!action) return
      action.reset().play().paused = true
    })
  }, [actions])

  useFrame(() => {
    Object.values(actions).forEach((action) => {
      if (!action) return
      action.paused = true
      action.time = action.getClip().duration * pr
    })
  })


  return (
    <group ref={group} dispose={null} rotation={[0, -90, 0]} scale={0.8}>
      <group name="Scene">
        <group name="Armature" position={[-0.3, -0.5, 1]}>
          <primitive object={nodes.pbottom} />
          <primitive object={nodes.Bone001} />
          <primitive object={nodes.pbottomcontroller} />
          <primitive object={nodes.cbottom} />
          <primitive object={nodes.cBone001} />
          <primitive object={nodes.cbottomcontroller} />
        </group>
        <skinnedMesh
          name="Cube001"
          geometry={(nodes as any).Cube001.geometry}
          material={materials.Base}
          skeleton={(nodes as any).Cube001.skeleton}
          morphTargetDictionary={(nodes as any).Cube001.morphTargetDictionary}
          morphTargetInfluences={(nodes as any).Cube001.morphTargetInfluences}
          position={[0, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/book.glb')
export { Comic }
