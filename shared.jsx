// Shared interactive components — used inside each variant's themed wrapper.
// Components read their visual styling from CSS custom properties so they adapt per variant.

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────────
// NYCRunningMap — interactive route picker
// Props: { compact?: boolean }
// ─────────────────────────────────────────────────────────────────
// Real geo-coordinate routes for the Leaflet map
const NYC_GEO_ROUTES = [
  {
    id: "central-park-loop",
    name: "Central Park Full Loop",
    distance: "6.1 mi",
    pace: "8:14 /mi",
    vibe: "The classic. Varied terrain, good for base miles.",
    coords: [
      [40.7681, -73.9816], [40.7657, -73.9769], [40.7644, -73.9733],
      [40.7680, -73.9710], [40.7720, -73.9695], [40.7748, -73.9705],
      [40.7790, -73.9692], [40.7830, -73.9680], [40.7890, -73.9533],
      [40.7950, -73.9508], [40.7972, -73.9542], [40.7985, -73.9577],
      [40.7968, -73.9632], [40.7937, -73.9686], [40.7894, -73.9730],
      [40.7850, -73.9773], [40.7816, -73.9796], [40.7780, -73.9811],
      [40.7735, -73.9821], [40.7697, -73.9824], [40.7681, -73.9816],
    ],
    color: "var(--accent)",
  },
  {
    id: "west-side",
    name: "West Side Highway",
    distance: "8.4 mi",
    pace: "7:58 /mi",
    vibe: "Flat, fast, river on your right.",
    coords: [
      [40.7020, -74.0165], [40.7100, -74.0155], [40.7200, -74.0130],
      [40.7280, -74.0105], [40.7350, -74.0085], [40.7420, -74.0065],
      [40.7490, -74.0045], [40.7560, -74.0020], [40.7630, -74.0000],
      [40.7750, -73.9990], [40.7840, -73.9955], [40.7960, -73.9910],
      [40.8080, -73.9870],
    ],
    color: "#1a1a1a",
  },
  {
    id: "brooklyn-bridge",
    name: "Brooklyn Bridge + Dumbo",
    distance: "4.7 mi",
    pace: "8:32 /mi",
    vibe: "Bridge crossing into Dumbo. Cobblestones through the back streets.",
    coords: [
      [40.7127, -74.0059], [40.7119, -74.0033], [40.7110, -74.0012],
      [40.7087, -73.9976], [40.7060, -73.9948], [40.7033, -73.9924],
      [40.7018, -73.9907], [40.7005, -73.9895], [40.6992, -73.9883],
      [40.6985, -73.9850], [40.6998, -73.9830], [40.7010, -73.9838],
      [40.7022, -73.9865], [40.7041, -73.9900], [40.7060, -73.9925],
      [40.7087, -73.9955], [40.7110, -73.9985], [40.7127, -74.0059],
    ],
    color: "#1a1a1a",
  },
  {
    id: "east-river",
    name: "East River Park",
    distance: "5.6 mi",
    pace: "8:05 /mi",
    vibe: "Underrated. Empty at 6am except for the ferry wake.",
    coords: [
      [40.7085, -73.9778], [40.7130, -73.9770], [40.7180, -73.9760],
      [40.7225, -73.9750], [40.7270, -73.9742], [40.7295, -73.9740],
      [40.7330, -73.9727], [40.7380, -73.9710], [40.7418, -73.9699],
    ],
    color: "#1a1a1a",
  },
  {
    id: "prospect-park",
    name: "Prospect Park Loop",
    distance: "3.4 mi",
    pace: "7:48 /mi",
    vibe: "Worth the train ride. Hilly back section.",
    coords: [
      [40.6737, -73.9692], [40.6700, -73.9671], [40.6660, -73.9658],
      [40.6610, -73.9666], [40.6585, -73.9695], [40.6578, -73.9735],
      [40.6585, -73.9770], [40.6610, -73.9800], [40.6650, -73.9810],
      [40.6695, -73.9800], [40.6725, -73.9775], [40.6737, -73.9740],
      [40.6737, -73.9692],
    ],
    color: "#1a1a1a",
  },
];

function ensureLeaflet() {
  return new Promise((resolve) => {
    if (window.L) return resolve(window.L);
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    css.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    css.crossOrigin = "";
    document.head.appendChild(css);
    const s = document.createElement("script");
    s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    s.crossOrigin = "";
    s.onload = () => resolve(window.L);
    document.head.appendChild(s);
  });
}

function NYCRunningMap({ compact = false }) {
  const [activeId, setActiveId] = useState("central-park-loop");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polylinesRef = useRef({});
  const startMarkerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    ensureLeaflet().then((L) => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;
      const map = L.map(mapRef.current, {
        center: [40.7400, -73.9750],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        attribution: '© OpenStreetMap, © CARTO',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
        opacity: 0.9,
      }).addTo(map);

      // draw all routes
      NYC_GEO_ROUTES.forEach((r) => {
        const isActive = r.id === activeId;
        const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent")?.trim() || "#ff5722";
        // We'll store the ROOT-level accent inside .swiss-root scope via getComputedStyle
        const swissRoot = document.querySelector(".swiss-root");
        const accentColor = swissRoot ? getComputedStyle(swissRoot).getPropertyValue("--accent").trim() || "#ff5722" : accent;
        const pl = L.polyline(r.coords, {
          color: isActive ? accentColor : "#1a1a1a",
          weight: isActive ? 5 : 2.5,
          opacity: isActive ? 1 : 0.35,
          dashArray: isActive ? null : "4 5",
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);
        pl.on("click", () => setActiveId(r.id));
        pl.on("mouseover", () => { if (r.id !== activeId) pl.setStyle({ opacity: 0.7, weight: 3 }); });
        pl.on("mouseout", () => { if (r.id !== activeId) pl.setStyle({ opacity: 0.35, weight: 2.5 }); });
        polylinesRef.current[r.id] = pl;
      });

      mapInstanceRef.current = map;
      // fit to active route
      const active = NYC_GEO_ROUTES.find((r) => r.id === activeId);
      if (active) map.fitBounds(active.coords, { padding: [40, 40] });
    });
    return () => { cancelled = true; };
  }, []);

  // restyle on active change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const swissRoot = document.querySelector(".swiss-root");
    const accentColor = swissRoot ? getComputedStyle(swissRoot).getPropertyValue("--accent").trim() || "#ff5722" : "#ff5722";
    NYC_GEO_ROUTES.forEach((r) => {
      const pl = polylinesRef.current[r.id];
      if (!pl) return;
      const isActive = r.id === activeId;
      pl.setStyle({
        color: isActive ? accentColor : "#1a1a1a",
        weight: isActive ? 5 : 2.5,
        opacity: isActive ? 1 : 0.35,
        dashArray: isActive ? null : "4 5",
      });
      if (isActive) pl.bringToFront();
    });
    // start marker
    if (startMarkerRef.current) { startMarkerRef.current.remove(); startMarkerRef.current = null; }
    const active = NYC_GEO_ROUTES.find((r) => r.id === activeId);
    if (active && window.L) {
      const icon = window.L.divIcon({
        className: "nyc-start-pin",
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${accentColor};border:3px solid #fff;box-shadow:0 0 0 1px #1a1a1a, 0 4px 10px rgba(0,0,0,0.25);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      startMarkerRef.current = window.L.marker(active.coords[0], { icon, interactive: false }).addTo(map);
      map.flyToBounds(active.coords, { padding: [50, 50], duration: 0.8 });
    }
  }, [activeId]);

  const active = NYC_GEO_ROUTES.find((r) => r.id === activeId) || NYC_GEO_ROUTES[0];
  return _renderMapShell(mapRef, active, activeId, setActiveId, compact);
}

function _renderMapShell(mapRef, active, activeId, setActiveId, compact) {
  const routes = NYC_GEO_ROUTES;

  return (
    <div className="nyc-map" style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1.4fr 1fr", gap: 24, alignItems: "stretch" }}>
      <div className="nyc-map__leaflet-wrap" style={{ position: "relative", aspectRatio: "1000 / 800", background: "#f3f1ec", border: "1px solid var(--rule, #1a1a1a)", overflow: "hidden" }}>
        <div ref={mapRef} style={{ position: "absolute", inset: 0 }}></div>
        {/* corner stamp overlay */}
        <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--font-mono, monospace)", fontSize: 10, letterSpacing: "0.1em", color: "#1a1a1a", background: "rgba(255,255,255,0.85)", padding: "4px 8px", border: "1px solid var(--rule, #1a1a1a)", zIndex: 500, pointerEvents: "none" }}>
          NYC · RUNNING ATLAS · v2026.04
        </div>
        {/* active route badge top-left */}
        <div style={{ position: "absolute", top: 12, left: 12, fontFamily: "var(--font-mono, monospace)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "var(--accent, #ff5722)", padding: "5px 10px", zIndex: 500, pointerEvents: "none", fontWeight: 600 }}>
          {active.distance} · {active.pace}
        </div>
      </div>
      <div className="nyc-map__list" style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--rule, #1a1a1a)" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--rule, #1a1a1a)", fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", background: "var(--accent, #ff5722)", color: "var(--accent-on, #fff)" }}>
          Pick a route ↓
        </div>
        {routes.map((r) => {
          const isActive = r.id === activeId;
          return (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              style={{
                textAlign: "left",
                padding: "14px 16px",
                background: isActive ? "var(--surface-2, #faf8f3)" : "transparent",
                border: "none",
                borderBottom: "1px solid var(--rule-soft, #d8d4c8)",
                cursor: "pointer",
                fontFamily: "inherit",
                color: "inherit",
                position: "relative",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              {isActive && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "var(--accent, #ff5722)" }}></div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{r.name}</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "var(--muted, #888)", whiteSpace: "nowrap" }}>{r.distance}</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted, #666)", marginTop: 4, lineHeight: 1.45 }}>{r.vibe}</div>
              {isActive && (
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "var(--accent, #ff5722)", marginTop: 8, letterSpacing: "0.05em" }}>
                  AVG PACE {r.pace}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// LiveClock — ticking NYC time
// ─────────────────────────────────────────────────────────────────
function LiveClock({ tz = "America/New_York", label = "NYC" }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  return (
    <span style={{ fontFamily: "var(--font-mono, monospace)" }}>
      {fmt.format(now)} <span style={{ opacity: 0.5 }}>{label}</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// NowPanel — "what I'm up to" with live updated stamp
// ─────────────────────────────────────────────────────────────────
function NowPanel() {
  const n = window.SITE_DATA.now;
  const items = [
    { k: "Focus", v: n.focus, icon: "→" },
    { k: "Reading", v: n.reading, icon: "❡" },
    { k: "Listening", v: n.listening, icon: "♪" },
    { k: "Running", v: n.running, icon: "▲" },
    { k: "Challenges", v: n.challenges, icon: "★" },
    { k: "Eating", v: n.eating, icon: "●" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 0, border: "1px solid var(--rule, #1a1a1a)" }}>
      {items.map((it, i) => (
        <div key={it.k} style={{ padding: "20px 22px", borderRight: "1px solid var(--rule-soft, #d8d4c8)", borderBottom: "1px solid var(--rule-soft, #d8d4c8)", minHeight: 130 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--accent, #ff5722)", color: "var(--accent-on, #fff)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "var(--font-mono, monospace)" }}>{it.icon}</span>
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted, #888)" }}>{it.k}</div>
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.5 }}>{it.v}</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HeadshotPlaceholder — striped placeholder w/ instruction
// ─────────────────────────────────────────────────────────────────
function HeadshotPlaceholder({ size = 200, label = "headshot.jpg" }) {
  return (
    <div style={{ width: size, height: size, position: "relative", border: "1px solid var(--rule, #1a1a1a)", overflow: "hidden", background: "var(--surface-2, #faf8f3)" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id={`stripes-${size}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--rule-soft, #d8d4c8)" strokeWidth="3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#stripes-${size})`} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12 }}>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 10, letterSpacing: "0.2em", color: "var(--muted, #666)", textTransform: "uppercase" }}>drop</div>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.05em", color: "var(--ink, #1a1a1a)", marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

Object.assign(window, { NYCRunningMap, LiveClock, NowPanel, HeadshotPlaceholder });
