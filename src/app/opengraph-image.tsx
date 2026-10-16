import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card, drawn in the same paper and wood as the desk. ImageResponse
 * renders through satori, which supports a flexbox subset only — every element
 * with children needs an explicit `display: flex`, and there are no filters.
 * Custom fonts would have to be fetched as binary data, so this uses the
 * generic serif stack instead and stays a build-time constant.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#f7f2e7",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "76px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 76,
            height: 7,
            backgroundColor: "#ac4a2e",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 68,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#241f19",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 30,
            color: "#574c40",
          }}
        >
          {profile.headline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 26,
            color: "#8a7d6d",
          }}
        >
          {profile.location}
        </div>
      </div>

      {/* The desk, cut off at the bottom of the card. */}
      <div
        style={{ display: "flex", height: 54, backgroundColor: "#7c5c3c" }}
      />
      <div style={{ display: "flex", height: 8, backgroundColor: "#563b23" }} />
    </div>,
    size,
  );
}
