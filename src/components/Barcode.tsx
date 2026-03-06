import barcodeImg from "../assets/barcode.png";

type BarcodeProps = {
  width?: number;
  height?: number;
};

export default function Barcode({ width = 360, height = 140}: BarcodeProps) {
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
      <img
        src={barcodeImg}
        alt="HTF4.0 Comic Edition Barcode"
        style={{
          width: "100%",
          height: height,
          objectFit: "fill",
          display: "block",
        }}
      />
    </div>
  );
}
