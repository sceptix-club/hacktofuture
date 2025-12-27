import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./scenes/scene";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray">
    {/*<div className="absolute inset-0 z-0 grid-bg" /> */}
      <div className="relative h-full max-w-[100vw] mx-auto overflow-hidden">

        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="max-w-[95vw] overflow-hidden">
            <h1 className="font-bold text-white hero-title whitespace-nowrap text-[8vw]">
              HACKTOFUTURE
            </h1>
          </div>
        </div>

        <Canvas className="absolute inset-0 z-10">
          <Scene />
        </Canvas>

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="max-w-[95vw] overflow-hidden">
            <h1 className="font-bold stroke-text hero-title whitespace-nowrap text-[8vw]">
              HACKTOFUTURE
            </h1>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-[12vh] z-20 flex justify-center pointer-events-none">
          <div className="max-w-[95vw] overflow-hidden">
            <h2
              className="text-white whitespace-nowrap comic-sans font-bold"
              style={{ fontSize: "clamp(1.0rem, 4vw, 2.0rem)" }}
            >
              COMING SOON !
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
