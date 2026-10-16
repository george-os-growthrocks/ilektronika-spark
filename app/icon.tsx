import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1e3d34",
        color: "#f4f0e6",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      .gr
    </div>,
    { ...size },
  );
}
