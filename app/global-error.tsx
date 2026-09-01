"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ONCO-AID Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: "#f6f1e8",
          color: "#12201f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "520px",
            backgroundColor: "#fffdf8",
            padding: "40px",
            borderRadius: "28px",
            boxShadow: "0 18px 40px rgba(8, 40, 40, 0.08)",
            border: "1px solid rgba(8, 40, 40, 0.1)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#c96b54",
              margin: 0,
            }}
          >
            System Recovery
          </p>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "#082828",
              marginTop: "12px",
              marginBottom: "12px",
            }}
          >
            Something interrupted the system.
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.6",
              color: "#6b7c86",
              marginBottom: "28px",
            }}
          >
            We encountered an unexpected error while initializing the application layout. Please try refreshing or reopening ONCO-AID.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                backgroundColor: "#082828",
                color: "#fffdf8",
                border: "none",
                borderRadius: "999px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Reload application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
