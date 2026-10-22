import { ImageResponse } from "next/og";

export const alt = "ilektronikatsigara.gr is for sale — €1,500 + 24% VAT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f4f0e6",
        color: "#1c1915",
        padding: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 4,
          color: "#1e3d34",
          fontWeight: 700,
        }}
      >
        DOMAIN FOR SALE
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, letterSpacing: -1.5 }}>
          ilektronikatsigara.gr
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 16 }}>is for sale</div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", color: "#1e3d34" }}>
        <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>€1,500</div>
        <div style={{ display: "flex", fontSize: 30, marginLeft: 16 }}>+ 24% VAT · invoice</div>
      </div>
    </div>,
    { ...size },
  );
}
