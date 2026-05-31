import { ImageResponse } from "next/og";

export const alt = "Aitha Venkata Subbaiah — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 48%, #312e81 100%)",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 36 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ color: "#a5b4fc", fontSize: 28, fontWeight: 600 }}>
            Full Stack Developer
          </div>
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          Aitha Venkata Subbaiah
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#c7d2fe",
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          Scalable web apps · AI products · IoT platforms · Production APIs
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 12,
          }}
        >
          {["React", "Next.js", "TypeScript", "Node.js"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(165, 180, 252, 0.35)",
                color: "#e0e7ff",
                fontSize: 22,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
