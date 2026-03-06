export default function Background() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 1px)",
        backgroundSize: "20px 20px",
        animation: "float-dots 60s linear infinite",
        willChange: "transform",
      }}
    />
  );
}