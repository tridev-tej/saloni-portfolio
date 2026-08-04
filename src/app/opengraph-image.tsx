import { ImageResponse } from "next/og";

export const alt = "Saloni Dabgar — Engineer, Builder, Thinker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          background: "#0b0b0c",
          color: "#eee9de",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span>Saloni Dabgar</span>
          <span style={{ color: "#ff5a2a", fontSize: 22 }}>Engineer · Writer</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 980,
            fontSize: 96,
            fontWeight: 600,
            lineHeight: 0.98,
            letterSpacing: "-0.055em",
          }}
        >
          <span>Software for vehicles.</span>
          <span style={{ color: "#ff5a2a" }}>Essays about people.</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#bcb5a8",
          }}
        >
          <span style={{ width: 72, height: 3, background: "#ff5a2a" }} />
          Jaguar Land Rover · IIT Kanpur
        </div>
      </div>
    ),
    { ...size }
  );
}
