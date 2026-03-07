import { useEffect, useRef } from "react";
import React from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

const handleDownload = (e: any) => {
  e.stopPropagation();
  const link = document.createElement("a");
  link.href = "/rulebook.pdf";
  link.download = "HackToFuture-Rulebook.pdf";
  link.click();
};

type ComicProps = {
  tlRef: React.RefObject<gsap.core.Timeline | null>;
};

function Comic({ tlRef }: ComicProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/book.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (!action) return;
      action.reset().play();
      action.paused = true;
    });
  }, [actions]);

  useEffect(() => {
    if (!actions) return;
    if (!tlRef?.current) return;

    const tl = tlRef.current;
    const state = { progress: 0 };

    tl.to(
      state,
      {
        progress: 1,
        duration: 0.7,
        ease: "none",
        onUpdate: () => {
          Object.values(actions).forEach((action) => {
            if (!action) return;
            action.time = action.getClip().duration * state.progress;
          });
        },
      },
      1.3
    );
  }, [actions, tlRef?.current]);

  return (
    <group
      ref={group}
      dispose={null}
      rotation={[0, -90, 0]}
      scale={0.8}
      onClick={handleDownload}
    >
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
          material={materials.Material}
          skeleton={(nodes as any).Cube001.skeleton}
          morphTargetDictionary={(nodes as any).Cube001.morphTargetDictionary}
          morphTargetInfluences={(nodes as any).Cube001.morphTargetInfluences}
          position={[0, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/book.glb");
export { Comic };
