import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#142840",
          border: "2px solid #2a4a6b",
          borderRadius: 10,
          color: "#5fd4d0",
          fontSize: 30,
          fontWeight: 600,
          fontFamily: "monospace",
        }}
      >
        {"{}"}
      </div>
    ),
    { ...size }
  );
}
