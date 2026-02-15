import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import gsap from "gsap";
import Navbar from "../components/ui/Navbar";
import "../App.css";

/* ─── Team Data ─── */
interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
  links: { label: string; url: string }[];
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Roche Jeethan",
    role: "Lead Organizer",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Roche",
    bio: "Mastermind behind HackToFuture. Loves chaos, coffee, and clean code.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
      { label: "Twitter", url: "#" },
    ],
  },
  {
    name: "Alice Wonder",
    role: "Tech Lead",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alice",
    bio: "Full-stack wizard. Turns caffeine into APIs at alarming speed.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Bob Builder",
    role: "Design Lead",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Bob",
    bio: "Pixel perfectionist. If it's not aligned, it's not shipping.",
    links: [
      { label: "Dribbble", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Carol Danvers",
    role: "Marketing Head",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Carol",
    bio: "Spreads the word faster than light. Social media sorcerer.",
    links: [
      { label: "Instagram", url: "#" },
      { label: "Twitter", url: "#" },
    ],
  },
  {
    name: "Dave Singh",
    role: "Sponsorship Lead",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Dave",
    bio: "Can convince anyone to sponsor anything. Charming negotiator.",
    links: [
      { label: "LinkedIn", url: "#" },
      { label: "Email", url: "#" },
    ],
  },
  {
    name: "Eve Torres",
    role: "Logistics Coordinator",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Eve",
    bio: "Nothing escapes her spreadsheets. The backbone of operations.",
    links: [
      { label: "LinkedIn", url: "#" },
      { label: "GitHub", url: "#" },
    ],
  },
];

/* ─── Comic Book 3D Component ─── */
interface ComicBookProps {
  currentPage: number;
  totalPages: number;
}

function ComicBook({ currentPage, totalPages }: ComicBookProps) {
  const gltf = useLoader(GLTFLoader, "/models/comic.glb");
  const modelRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  const model = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [gltf]);

  // Animate page turn rotation
  useEffect(() => {
    const pageProgress = currentPage / Math.max(totalPages - 1, 1);
    targetRotation.current.y = -pageProgress * Math.PI * 0.15;
  }, [currentPage, totalPages]);

  useFrame((state) => {
    if (!modelRef.current) return;

    // Subtle idle float
    const t = state.clock.elapsedTime;
    modelRef.current.position.y = Math.sin(t * 0.8) * 0.08;

    // Smooth rotation lerp
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotation.current.y + Math.sin(t * 0.3) * 0.03,
      0.05
    );
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      Math.sin(t * 0.5) * 0.02,
      0.05
    );
  });

  return (
    <group ref={modelRef} scale={2.5} position={[0, -0.5, 0]}>
      <primitive object={model} />
    </group>
  );
}

/* ─── Floating Comic Particles ─── */
function ComicParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sizes[i] = Math.random() * 3 + 0.5;
    }
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    particlesRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Page Turn Card ─── */
interface PageCardProps {
  member: TeamMember;
  index: number;
  isActive: boolean;
  direction: "enter" | "exit" | "idle";
}

function PageCard({ member, index, isActive, direction }: PageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    if (isActive && direction === "enter") {
      gsap.fromTo(
        cardRef.current,
        {
          rotationY: 90,
          opacity: 0,
          scale: 0.8,
          transformOrigin: "left center",
        },
        {
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        }
      );
    } else if (!isActive && direction === "exit") {
      gsap.to(cardRef.current, {
        rotationY: -90,
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.in",
        transformOrigin: "right center",
      });
    }
  }, [isActive, direction]);

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: "1200px",
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <div
        className="relative w-[90vw] max-w-[900px] h-[70vh] max-h-[550px] flex overflow-hidden"
        style={{
          border: "4px solid #000",
          borderRadius: "8px",
          boxShadow: "8px 8px 0px #000",
          background: "#FFFEF2",
        }}
      >
        {/* Comic panel divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[4px] bg-black z-10" />

        {/* Left Page — Photo */}
        <div
          className="w-1/2 flex flex-col items-center justify-center p-6 relative"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.03) 24px, rgba(0,0,0,0.03) 25px)",
          }}
        >
          {/* Halftone dots overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />

          {/* Page number */}
          <div
            className="absolute top-3 left-4 hero-title text-black/30"
            style={{ fontSize: "0.7rem" }}
          >
            PAGE {index * 2 + 1}
          </div>

          {/* Photo frame */}
          <div
            className="relative"
            style={{
              border: "3px solid #000",
              borderRadius: "4px",
              boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
              padding: "8px",
              background: "#fff",
              transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
            }}
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-40 h-40 md:w-52 md:h-52 object-cover"
              style={{
                border: "2px solid #000",
                borderRadius: "2px",
                filter: "contrast(1.1) saturate(1.2)",
              }}
            />
            {/* Comic caption under photo */}
            <div
              className="text-center mt-2 hero-title text-black"
              style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)" }}
            >
              ★ MEMBER #{index + 1} ★
            </div>
          </div>

          {/* Speech bubble decoration */}
          <div
            className="absolute bottom-8 right-8 bg-white px-3 py-2"
            style={{
              border: "2px solid #000",
              borderRadius: "12px 12px 12px 2px",
              boxShadow: "2px 2px 0px #000",
              fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
              fontFamily: "'Comic Relief', sans-serif",
              maxWidth: "120px",
            }}
          >
            That's me! 👆
          </div>
        </div>

        {/* Right Page — Info */}
        <div
          className="w-1/2 flex flex-col justify-center p-6 md:p-8 relative"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.03) 24px, rgba(0,0,0,0.03) 25px)",
          }}
        >
          {/* Page number */}
          <div
            className="absolute top-3 right-4 hero-title text-black/30"
            style={{ fontSize: "0.7rem" }}
          >
            PAGE {index * 2 + 2}
          </div>

          {/* Name banner */}
          <div
            className="mb-2 inline-block px-3 py-1 self-start"
            style={{
              background: "#000",
              color: "#fff",
              transform: "skewX(-3deg)",
              boxShadow: "3px 3px 0px rgba(218,16,12,0.8)",
            }}
          >
            <h2
              className="hero-title"
              style={{
                fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
                transform: "skewX(3deg)",
              }}
            >
              {member.name}
            </h2>
          </div>

          {/* Role badge */}
          <div
            className="mb-4 inline-block self-start px-3 py-1"
            style={{
              border: "2px solid #DA100C",
              borderRadius: "4px",
              color: "#DA100C",
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
              boxShadow: "2px 2px 0px rgba(0,0,0,0.2)",
            }}
          >
            {member.role}
          </div>

          {/* Bio */}
          <p
            className="comic-sans text-black/80 mb-6 leading-relaxed"
            style={{ fontSize: "clamp(0.8rem, 1.8vw, 1rem)" }}
          >
            "{member.bio}"
          </p>

          {/* Action line */}
          <div
            className="h-[3px] w-16 mb-4"
            style={{
              background: "linear-gradient(90deg, #DA100C, #000)",
            }}
          />

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {member.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="comic-sans text-white hover:scale-105 transition-transform"
                style={{
                  background: "#000",
                  border: "2px solid #000",
                  borderRadius: "4px",
                  padding: "4px 12px",
                  fontSize: "clamp(0.65rem, 1.3vw, 0.8rem)",
                  boxShadow: "2px 2px 0px rgba(218,16,12,0.6)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Corner starburst */}
          <svg
            className="absolute bottom-4 right-4 opacity-10"
            width="60"
            height="60"
            viewBox="0 0 100 100"
          >
            <polygon
              points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
              fill="#DA100C"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Team Page ─── */
export default function Team() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"enter" | "exit" | "idle">(
    "enter"
  );
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPages = TEAM_MEMBERS.length;

  // Scroll / wheel based page turn
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 30) return;

      isScrolling.current = true;
      setDirection("exit");

      setTimeout(() => {
        setCurrentPage((prev) => {
          if (delta > 0) return Math.min(prev + 1, totalPages - 1);
          return Math.max(prev - 1, 0);
        });
        setDirection("enter");

        setTimeout(() => {
          isScrolling.current = false;
        }, 600);
      }, 400);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (el) {
        el.removeEventListener("wheel", handleWheel);
      }
    };
  }, [totalPages]);

  // Touch support
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;

      isScrolling.current = true;
      setDirection("exit");

      setTimeout(() => {
        setCurrentPage((prev) => {
          if (deltaY > 0) return Math.min(prev + 1, totalPages - 1);
          return Math.max(prev - 1, 0);
        });
        setDirection("enter");

        setTimeout(() => {
          isScrolling.current = false;
        }, 600);
      }, 400);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (el) {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      if (
        e.key !== "ArrowDown" &&
        e.key !== "ArrowUp" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight"
      )
        return;

      isScrolling.current = true;
      setDirection("exit");

      setTimeout(() => {
        setCurrentPage((prev) => {
          if (e.key === "ArrowDown" || e.key === "ArrowRight")
            return Math.min(prev + 1, totalPages - 1);
          return Math.max(prev - 1, 0);
        });
        setDirection("enter");

        setTimeout(() => {
          isScrolling.current = false;
        }, 600);
      }, 400);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [totalPages]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* 3D Canvas Background — Comic book in front */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          shadows
          style={{ pointerEvents: "none" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-3, 2, 4]} intensity={0.6} color="#DA100C" />
          <pointLight position={[3, -2, 3]} intensity={0.4} color="#4488ff" />

          <Suspense fallback={null}>
            <ComicBook currentPage={currentPage} totalPages={totalPages} />
          </Suspense>

          <ComicParticles />
          <color attach="background" args={["#0a0a0a"]} />
        </Canvas>
      </div>

      {/* Halftone overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center pt-6">
        <div
          className="px-6 py-2 relative"
          style={{
            background: "#DA100C",
            border: "3px solid #000",
            boxShadow: "4px 4px 0px #000",
            transform: "skewX(-3deg)",
          }}
        >
          <h1
            className="hero-title text-white"
            style={{
              fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
              transform: "skewX(3deg)",
            }}
          >
            ★ OUR TEAM ★
          </h1>
        </div>
      </div>

      {/* Page cards overlay */}
      <div className="absolute inset-0 z-20">
        {TEAM_MEMBERS.map((member, index) => (
          <PageCard
            key={member.name}
            member={member}
            index={index}
            isActive={index === currentPage}
            direction={index === currentPage ? direction : "exit"}
          />
        ))}
      </div>

      {/* Page indicator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        {TEAM_MEMBERS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isScrolling.current) return;
              setDirection("exit");
              setTimeout(() => {
                setCurrentPage(i);
                setDirection("enter");
              }, 300);
            }}
            className="transition-all duration-300 cursor-pointer"
            style={{
              width: currentPage === i ? 14 : 10,
              height: currentPage === i ? 14 : 10,
              borderRadius: "2px",
              background:
                currentPage === i ? "#DA100C" : "rgba(255,255,255,0.3)",
              border: `2px solid ${
                currentPage === i ? "#000" : "rgba(255,255,255,0.2)"
              }`,
              boxShadow: currentPage === i ? "2px 2px 0px #000" : "none",
              transform: `rotate(${currentPage === i ? 45 : 0}deg)`,
            }}
            title={`Page ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1">
        <div
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: "2px solid rgba(255,255,255,0.3)" }}
        >
          <div
            className="w-1.5 h-3 rounded-full bg-white/60"
            style={{
              animation: "scroll-dot-bounce 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <span
          className="comic-sans text-white/40"
          style={{ fontSize: "0.65rem" }}
        >
          SCROLL TO TURN
        </span>
      </div>

      {/* Page counter */}
      <div className="absolute bottom-20 right-6 z-30">
        <span
          className="hero-title text-white/60"
          style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)" }}
        >
          {String(currentPage + 1).padStart(2, "0")}{" "}
          <span className="text-white/30">/</span>{" "}
          <span className="text-white/30">
            {String(totalPages).padStart(2, "0")}
          </span>
        </span>
      </div>

      <Navbar />
    </div>
  );
}
