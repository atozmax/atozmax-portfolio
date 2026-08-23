(() => {
  const skillTags = [
    "NestJS",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Kafka",
    "Docker",
    "gRPC",
    "REST",
    "TypeORM",
    "Prisma",
    "AWS",
    "Linux",
    "Python",
    "Security",
    "ML",
  ];

  const palettes = {
    0: {
      "--bg": "#12061f",
      "--bg-elev": "#1d0d33",
      "--bg-soft": "#2a1448",
      "--ink": "#f6f0ff",
      "--muted": "#c2b3d9",
      "--faint": "#8d7aa8",
      "--line": "rgba(246, 240, 255, 0.1)",
      "--line-strong": "rgba(246, 240, 255, 0.2)",
      "--bronze": "#c9a2ff",
      "--bronze-2": "#741CE8",
      "--mint": "#e2b8ff",
      "--ember": "#ff7ad9",
      "--blob-1": "#c9a2ff",
      "--blob-2": "#741CE8",
      "--blob-3": "#5b8cff",
      "--hero-glow": "rgba(201, 162, 255, 0.24)",
    },
    1: {
      "--bg": "#1a070c",
      "--bg-elev": "#2a1016",
      "--bg-soft": "#3a171f",
      "--ink": "#fff2f4",
      "--muted": "#d9b4bb",
      "--faint": "#a07a82",
      "--line": "rgba(255, 242, 244, 0.1)",
      "--line-strong": "rgba(255, 242, 244, 0.2)",
      "--bronze": "#ff8a97",
      "--bronze-2": "#E3455B",
      "--mint": "#ffd0a8",
      "--ember": "#ff6b4a",
      "--blob-1": "#ff8a97",
      "--blob-2": "#E3455B",
      "--blob-3": "#ffc14a",
      "--hero-glow": "rgba(227, 69, 91, 0.24)",
    },
    2: {
      "--bg": "#171307",
      "--bg-elev": "#241e0e",
      "--bg-soft": "#322910",
      "--ink": "#fff8e8",
      "--muted": "#d2c39a",
      "--faint": "#9a8b63",
      "--line": "rgba(255, 248, 232, 0.1)",
      "--line-strong": "rgba(255, 248, 232, 0.2)",
      "--bronze": "#F7CF3E",
      "--bronze-2": "#d4a017",
      "--mint": "#ffe38a",
      "--ember": "#ff9f3d",
      "--blob-1": "#F7CF3E",
      "--blob-2": "#d4a017",
      "--blob-3": "#f0e2b6",
      "--hero-glow": "rgba(247, 207, 62, 0.24)",
    },
    3: {
      "--bg": "#061018",
      "--bg-elev": "#0b1c29",
      "--bg-soft": "#122636",
      "--ink": "#eaf6ff",
      "--muted": "#9bb6c7",
      "--faint": "#6d8897",
      "--line": "rgba(234, 246, 255, 0.1)",
      "--line-strong": "rgba(234, 246, 255, 0.2)",
      "--bronze": "#7ec8ff",
      "--bronze-2": "#0a4a78",
      "--mint": "#7fe3c4",
      "--ember": "#4ad2ff",
      "--blob-1": "#7ec8ff",
      "--blob-2": "#0a4a78",
      "--blob-3": "#7fe3c4",
      "--hero-glow": "rgba(126, 200, 255, 0.24)",
    },
    4: {
      "--bg": "#07080b",
      "--bg-elev": "#10131a",
      "--bg-soft": "#161a23",
      "--ink": "#f4f0e8",
      "--muted": "#9b978d",
      "--faint": "#6e6b64",
      "--line": "rgba(244, 240, 232, 0.08)",
      "--line-strong": "rgba(244, 240, 232, 0.16)",
      "--bronze": "#e2a86b",
      "--bronze-2": "#c4844a",
      "--mint": "#7fe3c4",
      "--ember": "#ff6b3d",
      "--blob-1": "#e2a86b",
      "--blob-2": "#c4844a",
      "--blob-3": "#7fe3c4",
      "--hero-glow": "rgba(226, 168, 107, 0.18)",
    },
  };

  function applyTheme(id) {
    const key = String(id ?? "4");
    const palette = palettes[key] || palettes[4];
    const root = document.documentElement;
    Object.entries(palette).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });
    root.setAttribute("data-theme", key);

    const radio = document.querySelector(`.theme-radio[value="${key}"], .theme-radio[value="${key}"]`);
    if (radio && !radio.checked) radio.checked = true;

    document.querySelectorAll(".color-theme--item").forEach((item) => {
      const on = String(item.getAttribute("data-id")) === key;
      item.classList.toggle("is-active", on);
      item.classList.toggle("selected-custom--item", on);
    });

    try {
      localStorage.setItem("atozmax-theme", key);
    } catch (err) {
      /* ignore */
    }
  }

  function bindThemeSwitcher() {
    const dock = document.querySelector(".customize");
    if (!dock || dock.dataset.bound === "true") return;
    dock.dataset.bound = "true";

    dock.addEventListener("change", (event) => {
      const radio = event.target.closest(".theme-radio, .theme-radio");
      if (!radio) return;
      applyTheme(radio.value);
    });

    dock.addEventListener("click", (event) => {
      const swatch = event.target.closest(".color-theme--item");
      if (!swatch) return;
      applyTheme(swatch.getAttribute("data-id"));
    });
  }

  function mountSphere() {
    const root = document.querySelector("#skill-sphere") || document.querySelector(".content");
    if (!root || typeof TagCloud !== "function") return;
    try {
      root.innerHTML = "";
      const radius = window.matchMedia("(max-width: 760px)").matches ? 150 : 240;
      TagCloud(root, skillTags, {
        radius,
        maxSpeed: "normal",
        initSpeed: "slow",
        direction: 135,
        keep: true,
      });
    } catch (err) {
      console.warn("TagCloud failed", err);
    }
  }

  function boot() {
    bindThemeSwitcher();
    let saved = "4";
    try {
      saved = localStorage.getItem("atozmax-theme") || "4";
    } catch (err) {
      saved = "4";
    }
    const queryTheme = new URLSearchParams(location.search).get("theme");
    if (queryTheme && palettes[queryTheme]) saved = queryTheme;
    applyTheme(saved);
    mountSphere();

    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav-toggle");
    const blobStage = document.querySelector(".blob-stage");
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();

    window.addEventListener("scroll", () => {
      nav?.classList.toggle("is-scrolled", window.scrollY > 12);
    });

    toggle?.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => document.body.classList.remove("nav-open"));
    });

    if (blobStage) {
      blobStage.addEventListener("mouseenter", () => blobStage.classList.add("is-hot"));
      blobStage.addEventListener("mouseleave", () => blobStage.classList.remove("is-hot"));
    }

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll(".skill-row").forEach((row) => skillObserver.observe(row));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
