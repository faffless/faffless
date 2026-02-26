export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        textAlign: "center",
        background: "#eef5fb",
        color: "#111",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "720px" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>
          Faffless
        </h1>
        <p style={{ fontSize: "24px", marginBottom: "16px" }}>
          E-invoicing for UK businesses, without the faff.
        </p>
        <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#444" }}>
          Create invoice drafts, get ready for e-invoicing, and keep admin simple.
          Early version coming soon.
        </p>
      </div>
    </main>
  );
}