type LoaderProps = {
  progress: number
}

export default function Loader({ progress }: LoaderProps) {
  return (
    <>
      <div
        style={{
          color: "white",
          fontSize: 18,
          fontFamily: "sans-serif",
          background: "rgba(0,0,0,0.7)",
          padding: "16px 24px",
          borderRadius: 8,
        }}
      >
        Loading {progress.toFixed(0)}%
      </div>
    </>
  )
}
