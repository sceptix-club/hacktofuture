# HackToFuture (React + TypeScript + Vite + three.js)

A scroll-driven multi-scene 3D experience built with React, Vite, TypeScript, @react-three/fiber and GSAP. Scroll maps to a normalized progress value which drives camera and object animations in the 3D scene (Experience.tsx). Overlay text and UI are animated with GSAP ScrollTrigger.

---

## Key Files / Structure

- src/main.tsx = app entry
- src/App.tsx = app shell, GSAP ScrollSmoother/ScrollTrigger setup, defines SCENES and passes scrollProgressRef to Experience
- src/Experience.tsx = 3D scene controller; reads scrollProgressRef each frame, decides active scene and progress, updates camera & objects; renders scene groups
- src/scenes/* = scene-specific components (HackToFuture.tsx, Rulebook.tsx, etc.)
- src/assets/* = meshes/shaders (TV, Wall)
- src/scenes/TextContent.tsx = overlay copy and GSAP-driven animations

---

## How scenes work (conceptually)

1. App creates a normalized scroll progress value (0 → 1) and multiplies it by SCENES count.
2. Experience useFrame computes:
   - time = scrollProgress * scenes
   - current = Math.floor(time)
   - progress = time % 1 (fractional progress inside current scene)
3. A switch on `current` drives the camera and objects using `progress`.
4. Each scene is positioned vertically (e.g., y = -index * SCENE_GAP) and contains its own meshes & lights.

---

## How to add or change scenes — step-by-step

1. Increase SCENES in App.tsx and pass it down:
```tsx
// filepath: src/App.tsx
const SCENES = 4; // was 3
<Experience scrollProgressRef={scrollProgressRef} scenes={SCENES} />
```

2. Make scene spacing explicit in Experience:
- Add a SCENE_GAP constant (recommended) and position groups using it instead of hardcoded values.
```tsx
// filepath: src/Experience.tsx
const SCENE_GAP = 30; // distance between scenes

// In the returned JSX:
<group position={[0, -SCENE_GAP * 0, 0]}>{/* scene 0 */}</group>
<group position={[0, -SCENE_GAP * 1, 0]}>{/* scene 1 */}</group>
<group position={[0, -SCENE_GAP * 2, 0]}>{/* scene 2 */}</group>
<group position={[0, -SCENE_GAP * 3, 0]}>{/* new scene 3 */}</group>
```

3. Add camera/object behavior for the new scene:
- Add a new case in the existing useFrame switch that uses baseY = -SCENE_GAP * index and manipulates camera/object transforms using `progress`.
```tsx
// filepath: src/Experience.tsx
case 3: {
  const baseY = -SCENE_GAP * 3;
  const target = new THREE.Vector3(0, baseY, 0);
  // example: lerp camera toward target as progress goes 0→1
  camera.position.lerpVectors(cameraStart.current, target, progress);
  camera.lookAt(target);
  // add object transforms here
  break;
}
```

4. Create the scene content component (optional, recommended):
```tsx
// filepath: src/scenes/NewScene.tsx
const NewScene = ({ viewportWidth }: { viewportWidth: number }) => (
  <group>
    {/* meshes/lights here */}
  </group>
);
export default NewScene;
```
- Import and place it in Experience inside the new group.

5. Update overlay / TextContent:
- Add UI panels for the new scene and update GSAP ScrollTrigger ranges or timeline lengths.
- Ensure the useEffect that creates timelines includes the right dependency array (e.g., [scenes] or [] if only on mount).

6. Ensure the scroll container size / smooth content matches SCENES:
- Where App sets the smooth content height make it depend on SCENES so total scroll length scales:
```tsx
// pseudo
smoothContent.style.height = `${SCENES * 100}vh`;
```

7. Test & iterate:
- Run `npm run dev`.
- Scroll through scenes, tweak SCENE_GAP, camera targets and timings until transitions feel smooth.

---

## Tips & recommended refactors

- Centralize SCENES and SCENE_GAP in a constants file (src/constants.ts) and import where needed.
- Extract camera transition helpers to keep useFrame switch clean.
- Add prop types to scene components and keep each scene self-contained for easier testing.
- Add tests for small utilities and for any stateful logic outside rendering.

---

## Quick checklist before commit
- [ ] SCENES updated and passed to Experience
- [ ] New scene group added with position=[0, -SCENE_GAP * n, 0]
- [ ] Camera logic for the new case added and tested
- [ ] Overlay panels and GSAP timeline updated
- [ ] Smooth scroll height adjusted to SCENES
- [ ] Build and manual test passed (`npm run dev`)

---
