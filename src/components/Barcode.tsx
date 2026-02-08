type BarcodeProps = {
  width?: number;
  height?: number;
};

export default function Barcode({ width = 240, height = 80 }: BarcodeProps) {
  const bars = Array.from({ length: 48 }, (_, i) => ({
    width: Math.random() > 0.7 ? 4 : 2,
    height: height,
    marginRight: Math.random() > 0.8 ? 2 : 1,
  }));

  return (
    <div
      style={{
        background: "#fff",
        padding: "16px 12px",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "monospace",
        width,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        {bars.map((bar, i) => (
          <div
            key={i}
            style={{
              width: bar.width,
              height: bar.height,
              background: "#000",
              marginRight: bar.marginRight,
            }}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 12,
          letterSpacing: 1,
          color: "#000",
          textAlign: "center",
        }}
      >
        HackToFuture4.0 Comic Edition
      </div>
    </div>
  );
}
