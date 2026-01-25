import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Difusys - Premium UI/UX Design & Software Development Agency";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0a0a0a",
                    backgroundImage: "radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)",
                }}
            >
                {/* Logo/Brand */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 700,
                            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #6366F1 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                            marginBottom: 20,
                            letterSpacing: "-2px",
                        }}
                    >
                        Difusys
                    </div>
                    <div
                        style={{
                            fontSize: 28,
                            color: "#a1a1aa",
                            marginBottom: 40,
                            letterSpacing: "0.1em",
                        }}
                    >
                        UI/UX Design & Software Development
                    </div>
                    <div
                        style={{
                            fontSize: 20,
                            color: "#71717a",
                            maxWidth: 600,
                            textAlign: "center",
                            lineHeight: 1.6,
                        }}
                    >
                        We craft premium digital products that convert for startups and enterprises worldwide.
                    </div>
                </div>

                {/* Footer URL */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <div
                        style={{
                            fontSize: 18,
                            color: "#52525b",
                        }}
                    >
                        difusys.com
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
