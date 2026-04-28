const { useState, useEffect, useRef, useMemo } = React;

// ────────────────────────────────────────────────────────────
//  Tokens
// ────────────────────────────────────────────────────────────
const ink = "#0c0c0c";
const ink2 = "#2e2e2e";
const muted = "#8f8a8a";
const line = "#e6e6e6";
const cream = "#fdfcf9";
const tan = "rgb(213,189,163)";

// ────────────────────────────────────────────────────────────
//  Reusable: Pill button
// ────────────────────────────────────────────────────────────
function Pill({ children, dark = false, onClick, style = {}, size = "md" }) {
  const [hover, setHover] = useState(false);
  const pad = size === "sm" ? "10px 22px" : "16px 30px";
  const fs = size === "sm" ? 18 : 22;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        appearance: "none",
        border: "1px solid #000",
        borderRadius: 999,
        padding: pad,
        fontSize: fs,
        fontFamily: "Inter, sans-serif",
        cursor: "pointer",
        transition: "transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms, background 200ms",
        background: dark ? (hover ? "#000" : ink2) : (hover ? "#fff" : "rgba(255,255,255,0.85)"),
        color: dark ? "#fff" : ink,
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "0 8px 22px rgba(0,0,0,0.15)" : "0 0 0 rgba(0,0,0,0)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ────────────────────────────────────────────────────────────
//  Logo
// ────────────────────────────────────────────────────────────
function Logo({ onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        cursor: "pointer", userSelect: "none",
      }}
    >
      <img src="assets/sui-logo.png" alt="" style={{ width: 56, height: 48, objectFit: "contain" }} />
      <span style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 800,
        fontSize: 34,
        letterSpacing: "0.02em",
        color: ink,
      }}>SUI</span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
//  Top Nav
// ────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const items = [
    { id: "about",  label: "about" },
    { id: "work",   label: "work" },
    { id: "blog",   label: "blog" },
    { id: "assets", label: "assets" },
  ];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "22px 80px",
      background: "rgba(255,255,255,0.78)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: `1px solid rgba(0,0,0,0.04)`,
    }}>
      <Logo onClick={() => setPage("home")} />

      <nav style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {items.map(it => {
          const active = page === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setPage(it.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: 24, color: ink,
                position: "relative", padding: "6px 4px",
              }}
            >
              {it.label}
              <span style={{
                position: "absolute", left: 4, right: 4, bottom: -2, height: 2,
                background: ink,
                transform: active ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
              }} />
            </button>
          );
        })}
        <Pill dark size="sm" onClick={() => setPage("contact")} style={{ padding: "12px 28px", fontSize: 20 }}>
          contact
        </Pill>
      </nav>
    </header>
  );
}

// ────────────────────────────────────────────────────────────
//  Home — Hero Banner (full viewport, banner image only)
// ────────────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <section
      data-screen-label="01 Banner"
      style={{
        position: "relative",
        height: "calc(100vh - 92px)",
        minHeight: 520,
        overflow: "hidden",
        display: "flex",
      }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `url(assets/banner.png) center/cover no-repeat`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, rgba(253,252,249,0) 0%, rgba(253,252,249,0.15) 80%, ${cream} 100%)`,
      }} />
      {/* scroll cue */}
      <div style={{
        position: "absolute", left: "50%", bottom: 36, transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        fontFamily: "Inter, sans-serif", fontSize: 14, color: ink2, letterSpacing: "0.12em",
        textTransform: "uppercase", opacity: 0.85,
      }}>
        <span>scroll</span>
        <span style={{ width: 1, height: 28, background: ink2, animation: "floatY 2.4s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
//  Home — Hero Intro (full viewport, "Hi, I am Sui")
// ────────────────────────────────────────────────────────────
function HeroIntro({ setPage }) {
  return (
    <section
      data-screen-label="02 Intro"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 92px)",
        background: cream,
        display: "flex", alignItems: "center",
      }}>
      <div style={{
        width: "100%",
        maxWidth: 1352, margin: "0 auto",
        padding: "60px 80px",
        display: "grid", gridTemplateColumns: "minmax(360px, 480px) 1fr", gap: 80, alignItems: "center",
      }}>
        {/* Avatar */}
        <div style={{ position: "relative" }}>
          <div className="float-soft" style={{ position: "relative" }}>
            <img src="assets/little-sui.png" alt="Sui" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
          <div style={{
            position: "absolute", left: "50%", bottom: -10, transform: "translateX(-50%)",
            width: 180, height: 16, borderRadius: "50%",
            background: "rgba(208,200,200,0.7)",
            filter: "blur(2px)",
          }} />
        </div>

        {/* Copy */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            border: `1px solid ${line}`, borderRadius: 999,
            padding: "8px 16px", background: "rgba(255,255,255,0.7)",
            fontSize: 14, color: ink2, marginBottom: 22, fontFamily: "Inter, sans-serif",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#3CB1B1" }} />
            Available for new projects · 2026
          </div>
          <h1 style={{
            fontFamily: "Inter, sans-serif", fontWeight: 800,
            fontSize: 84, lineHeight: 0.95, margin: 0, letterSpacing: "-0.02em",
          }}>
            Hi, I am <em style={{ fontStyle: "italic", fontWeight: 800 }}>Sui</em>.
          </h1>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 22, lineHeight: 1.7,
            color: ink, marginTop: 28, marginBottom: 36, maxWidth: 620,
          }}>
            專攻品牌策略與體驗設計的數位產品設計師。遊走於科技、設計與行銷的交界，
            我熱衷於探索跨界的無限可能 — 將抽象的好點子，轉化為具體的品牌影響力。
          </p>
          <Pill dark onClick={() => setPage("about")}>More about me →</Pill>
        </div>
      </div>
    </section>
  );
}

// Backwards-compatible Hero used by AboutPage
function Hero({ setPage }) {
  return (
    <>
      <HeroBanner />
      <HeroIntro setPage={setPage} />
    </>
  );
}

// ────────────────────────────────────────────────────────────
//  Section header
// ────────────────────────────────────────────────────────────
function SectionHeader({ title, action, onAction }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      padding: "0 80px", marginBottom: 44,
    }}>
      <h2 style={{
        fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 64,
        margin: 0, letterSpacing: "-0.02em",
      }}>{title}</h2>
      {action && <Pill onClick={onAction}>{action}</Pill>}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
//  Work card
// ────────────────────────────────────────────────────────────
// pages from details.jsx (loaded before this script via window globals)
const WorkDetailPage  = window.WorkDetailPage;
const BlogDetailPage  = window.BlogDetailPage;
const AssetDetailPage = window.AssetDetailPage;

function WorkCard({ image, bg, icon, title, tag, accent = "#3C64B1", onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer",
        transition: "transform 360ms cubic-bezier(.2,.8,.2,1)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      <div style={{
        width: "100%", aspectRatio: "450/320",
        borderRadius: 20, overflow: "hidden",
        border: `1px solid ${line}`,
        background: bg || `${accent}`,
        position: "relative",
        boxShadow: hover ? "0 18px 40px rgba(0,0,0,0.12)" : "0 1px 0 rgba(0,0,0,0.02)",
        transition: "box-shadow 360ms",
      }}>
        {image && (
          <div style={{
            position: "absolute", inset: 0,
            background: `url(${image}) center/cover no-repeat`,
            transform: hover ? "scale(1.04)" : "scale(1)",
            transition: "transform 700ms cubic-bezier(.2,.8,.2,1)",
          }} />
        )}
        {!image && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: bg || accent,
            color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 28, opacity: 0.6,
          }}>{title}</div>
        )}
      </div>
      <div style={{
        marginTop: 18, display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          background: `${accent}`,
          backgroundImage: icon ? `url(${icon})` : undefined,
          backgroundSize: "cover", backgroundPosition: "center",
          flexShrink: 0,
        }} />
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 26, fontWeight: 600, color: ink }}>{title}</div>
          <div style={{
            display: "inline-block", marginTop: 6,
            background: "#e6e6e6", borderRadius: 10, padding: "4px 12px",
            fontFamily: "Inter, sans-serif", fontSize: 16, color: ink2,
          }}>{tag}</div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
//  Home — Works strip
// ────────────────────────────────────────────────────────────
function HomeWorks({ setPage }) {
  return (
    <section data-screen-label="03 Works" style={{
      minHeight: "calc(100vh - 92px)",
      padding: "120px 0",
      background: cream,
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <SectionHeader title="My Works" action="See more" onAction={() => setPage("work")} />
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32,
        padding: "0 80px",
      }}>
        <WorkCard
          image="assets/work-tarot.png"
          icon="assets/work-icon.png"
          title="春男塔羅牌"
          tag="website  app"
          accent="#3C64B1"
          onClick={() => setPage("work-detail")}
        />
        <WorkCard
          bg="linear-gradient(135deg, #3C64B1 0%, #5b86d2 100%)"
          icon="assets/work-icon.png"
          title="我的小星星"
          tag="mobile app"
          accent="#3C64B1"
          onClick={() => setPage("work-detail")}
        />
        <WorkCard
          bg="linear-gradient(135deg, #3CB1B1 0%, #66cfcf 100%)"
          icon="assets/work-icon.png"
          title="才華相談所"
          tag="website"
          accent="#3CB1B1"
          onClick={() => setPage("work-detail")}
        />
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
//  Home — Blog strip
// ────────────────────────────────────────────────────────────
function BlogCard({ image, title, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer" }}
    >
      <div style={{
        width: "100%", aspectRatio: "660/420", borderRadius: 20, overflow: "hidden",
        border: `1px solid ${line}`,
        background: `url(${image}) center/cover no-repeat`,
        boxShadow: hover ? "0 22px 50px rgba(0,0,0,0.15)" : "0 1px 0 rgba(0,0,0,0.02)",
        transition: "box-shadow 320ms, transform 320ms",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
      }} />
      <h3 style={{
        marginTop: 24, padding: "0 16px",
        fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 28,
        lineHeight: 1.45, color: ink, maxWidth: 640,
      }}>{title}</h3>
    </div>
  );
}

function HomeBlog({ setPage }) {
  return (
    <section data-screen-label="04 Blog" style={{
      minHeight: "calc(100vh - 92px)",
      padding: "120px 0",
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <SectionHeader title="Blog" action="See more" onAction={() => setPage("blog")} />
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
        padding: "0 80px",
      }}>
        <BlogCard
          image="assets/blog-1.png"
          title="我的小星星 終章：打包與上架｜AI 協作手機 APP 創作實錄"
          onClick={() => setPage("blog-detail")}
        />
        <BlogCard
          image="assets/blog-2.png"
          title="我的小星星 下篇：Vibe Coding 建置 APP｜AI 協作手機 APP 創作實錄"
          onClick={() => setPage("blog-detail")}
        />
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
//  CTA block
// ────────────────────────────────────────────────────────────
function CTA({ setPage, image = "assets/sui-clover.png", title = "Want to\nwork with Sui?", fullScreen = false }) {
  return (
    <section data-screen-label={fullScreen ? "05 Contact" : undefined} style={{
      padding: "100px 80px",
      minHeight: fullScreen ? "calc(100vh - 92px)" : undefined,
      display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 40,
    }}>
      <div style={{ paddingLeft: 60 }}>
        <h2 style={{
          fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 72,
          lineHeight: 1.05, margin: 0, whiteSpace: "pre-line", letterSpacing: "-0.02em",
        }}>{title}</h2>
        <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
          <Pill dark onClick={() => setPage("contact")}>Hire me!</Pill>
          <Pill onClick={() => setPage("contact")}>Contact me</Pill>
        </div>
      </div>
      <div style={{ position: "relative", textAlign: "center" }}>
        <img src={image} alt="" style={{
          maxWidth: "100%", maxHeight: 560, objectFit: "contain", display: "inline-block",
        }} className="float-soft" />
        <div style={{
          width: 200, height: 18, margin: "0 auto", borderRadius: "50%",
          background: "rgba(208,200,200,0.7)", filter: "blur(3px)", marginTop: -6,
        }} />
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
//  Footer
// ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${line}`,
      padding: "36px 80px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: "Inter, sans-serif", color: ink, fontSize: 18,
    }}>
      <span>© 2026 Funkuki Studio · Designed & Developed by Sui</span>
      <div style={{ display: "flex", gap: 22, color: ink2 }}>
        <a href="#" style={{ color: "inherit" }}>IG</a>
        <a href="#" style={{ color: "inherit" }}>Threads</a>
        <a href="#" style={{ color: "inherit" }}>Behance</a>
        <a href="#" style={{ color: "inherit" }}>Mail</a>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────
//  Page: Home
// ────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      <HeroBanner />
      <HeroIntro setPage={setPage} />
      <HomeWorks setPage={setPage} />
      <HomeBlog setPage={setPage} />
      <CTA setPage={setPage} fullScreen />
    </>
  );
}

// ────────────────────────────────────────────────────────────
//  Page: About
// ────────────────────────────────────────────────────────────
function ServiceRow({ children }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderBottom: `1px solid ${line}`,
        transform: hover ? "translateX(8px)" : "translateX(0)",
        transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
        cursor: "default",
      }}
    >
      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 16,
        padding: "26px 4px",
        fontFamily: "Inter, sans-serif", fontSize: 28, color: ink,
      }}>
        <span>{children}</span>
        <span style={{
          fontSize: 22, color: hover ? ink : muted,
          transition: "color 200ms",
        }}>↗</span>
      </div>
    </div>
  );
}

function ExperienceRow({ role, period }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "200px 1fr",
      padding: "32px 0", borderBottom: `1px solid ${line}`,
      fontFamily: "Inter, sans-serif",
    }}>
      <div style={{ fontSize: 22, color: muted }}>{period}</div>
      <div style={{ fontSize: 32, fontWeight: 600, color: ink }}>{role}</div>
    </div>
  );
}

function SkillRadar() {
  // 4-axis radar — Brand Analysis 85, Digital Design 90, Video 78, UI/UX Coding 88
  const axes = [
    { label: "商業分析", short: "Brand", value: 85, angle: -90 },
    { label: "數位設計", short: "Digital", value: 90, angle: 0 },
    { label: "UI/UX Coding", short: "Code", value: 88, angle: 90 },
    { label: "影音製作", short: "Video", value: 78, angle: 180 },
  ];
  const cx = 200, cy = 200, R = 150;
  const polar = (angDeg, r) => {
    const a = (angDeg * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const valuePts = axes.map(a => polar(a.angle, (a.value/100) * R));
  const ringPts = (pct) => axes.map(a => polar(a.angle, (pct/100) * R)).map(p => p.join(",")).join(" ");

  return (
    <svg viewBox="0 0 400 400" width="100%" style={{ maxWidth: 460 }}>
      {/* concentric */}
      {[25, 50, 75, 100].map((p, i) => (
        <polygon key={i} points={ringPts(p)} fill="none" stroke={i === 3 ? ink : "#cfc7c7"} strokeOpacity={i === 3 ? 0.6 : 0.35} strokeWidth={i === 3 ? 1.2 : 1} />
      ))}
      {/* axes */}
      {axes.map((a, i) => {
        const [x, y] = polar(a.angle, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#cfc7c7" strokeWidth={1} strokeDasharray="3 4" />;
      })}
      {/* value polygon */}
      <polygon
        points={valuePts.map(p => p.join(",")).join(" ")}
        fill={tan} fillOpacity={0.55}
        stroke={ink} strokeWidth={1.2}
      />
      {/* dots */}
      {valuePts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} fill={ink} />
      ))}
      {/* labels */}
      {axes.map((a, i) => {
        const [x, y] = polar(a.angle, R + 28);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontFamily="Inter, sans-serif" fontSize={15} fill={ink}>
            {a.label} {a.value}
          </text>
        );
      })}
    </svg>
  );
}

function AboutPage({ setPage }) {
  const services = [
    "Brand Strategy & Business Analysis",
    "Digital Marketing & Analytics",
    "UI/UX Design",
    "Vibe Coding",
    "Visual & IP Design",
    "Project Management",
    "Space & Media Curation",
  ];
  const tools = [
    "Figma","Notion","Photoshop","Illustrator","After Effects","Premiere",
    "Cursor","Claude","Webflow","Framer","Excel","GA4",
  ];
  const experience = [
    { role: "Digital Product Designer", period: "2022 – Now" },
    { role: "Brand Consultant",          period: "2019 – 2021" },
    { role: "Founder, Shop Owner",       period: "2013 – 2018" },
  ];

  const reviews = [
    { score: 88, area: "品牌分析與策略規劃", quote: "「謝謝 Sui 對雙手牌的照顧，有你在的日子很令人心安🥹❤️」" },
    { score: 92, area: "數位產品設計與落地", quote: "「需求溝通到落地都非常順，整個團隊跟著一起成長。」" },
    { score: 90, area: "視覺與 IP 設計",      quote: "「IP 角色把品牌個性立住了，路人都記得起來。」" },
  ];
  const [reviewIdx, setReviewIdx] = useState(0);

  return (
    <>
      {/* Hero same as home */}
      <Hero setPage={setPage} />

      {/* Services */}
      <section style={{ padding: "0 80px" }}>
        <div style={{
          border: `1px solid ${line}`, borderRadius: 24,
          padding: "44px 50px",
        }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 44, margin: 0 }}>My Services</h2>
          <div style={{ marginTop: 22 }}>
            {services.map(s => <ServiceRow key={s}>{s}</ServiceRow>)}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section style={{ padding: "80px 80px 40px" }}>
        <div style={{
          border: `1px solid ${line}`, borderRadius: 24,
          padding: "44px 50px",
        }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 44, margin: 0 }}>Experience</h2>
          <div style={{ marginTop: 22 }}>
            {experience.map(e => <ExperienceRow key={e.role} {...e} />)}
          </div>
        </div>
      </section>

      {/* Skills + Tools */}
      <section style={{ padding: "40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Skills radar */}
          <div style={{
            border: `1px solid ${line}`, borderRadius: 24,
            padding: "44px 50px",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 44, margin: 0, alignSelf: "flex-start" }}>Skills</h2>
            <div style={{ marginTop: 12, alignSelf: "center" }}><SkillRadar /></div>
          </div>
          {/* Tools */}
          <div style={{
            border: `1px solid ${line}`, borderRadius: 24,
            padding: "44px 50px",
          }}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 44, margin: 0 }}>Tools</h2>
            <div style={{
              marginTop: 28,
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
            }}>
              {tools.map(t => (
                <div key={t} style={{
                  aspectRatio: "1",
                  border: `1px solid ${line}`, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Inter, sans-serif", fontSize: 14, color: ink2, textAlign: "center",
                  background: "#fff",
                  transition: "transform 220ms, border-color 220ms",
                }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = ink2; }}
                   onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = line; }}
                >{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: "60px 80px" }}>
        <div style={{
          border: `1px solid ${line}`, borderRadius: 24,
          padding: "60px 50px",
          textAlign: "center",
        }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 40, margin: 0 }}>How clients rate me</h2>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 28, lineHeight: 1.7,
            marginTop: 36, color: ink, maxWidth: 920, marginInline: "auto",
          }}>
            在 <span style={{ borderBottom: `2px solid ${tan}` }}>{reviews[reviewIdx].area}</span> 上 給予{" "}
            <span style={{ fontWeight: 800 }}>{reviews[reviewIdx].score}%</span> 的評價：
            <br />
            {reviews[reviewIdx].quote}
          </p>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: `url(assets/avatar-thumb.jpg) center/cover`,
            margin: "44px auto 28px",
            border: `1px solid ${line}`,
          }} />
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setReviewIdx(i)} style={{
                width: i === reviewIdx ? 36 : 12, height: 12,
                borderRadius: 999, border: "none", padding: 0,
                background: i === reviewIdx ? ink : "#cfc7c7",
                cursor: "pointer", transition: "all 280ms",
              }} />
            ))}
          </div>
        </div>
      </section>

      <CTA setPage={setPage} image="assets/happy-sui.png" title={"Ready to\nwork with Sui?"} />
    </>
  );
}

// ────────────────────────────────────────────────────────────
//  Page: Work
// ────────────────────────────────────────────────────────────
const WORK_TAGS = ["all","mobile app","website","illustration","youtube","vibe coding","UI/UX","IP Design","3D","Line Stickers","project","podcast"];

const WORKS = [
  { title: "春男塔羅牌", tag: "website  app",     image: "assets/work-tarot.png", accent: "#3C64B1", types: ["website","mobile app","UI/UX"] },
  { title: "我的小星星", tag: "mobile app",       bg: "linear-gradient(135deg, #3C64B1 0%, #5b86d2 100%)", accent: "#3C64B1", types: ["mobile app","vibe coding","UI/UX"] },
  { title: "才華相談所", tag: "website",          bg: "linear-gradient(135deg, #3CB1B1 0%, #66cfcf 100%)", accent: "#3CB1B1", types: ["website","UI/UX"] },
  { title: "多肉生物",   tag: "IP Design",        bg: "linear-gradient(135deg, #2e2e2e 0%, #4a4a4a 100%)", accent: "#2e2e2e", types: ["IP Design","illustration","Line Stickers"] },
  { title: "Funkuki 主視覺",     tag: "Visual",   bg: "linear-gradient(135deg, #EDC951 0%, #f3d97a 100%)", accent: "#EDC951", types: ["IP Design","illustration","project"] },
  { title: "雙手牌品牌策略",     tag: "project",  bg: "linear-gradient(135deg, #D5BDA3 0%, #e2cdb2 100%)", accent: "#D5BDA3", types: ["project"] },
  { title: "Vibe Coding 系列",   tag: "vibe coding", bg: "linear-gradient(135deg, #3C64B1 0%, #2e2e2e 100%)", accent: "#3C64B1", types: ["vibe coding","website"] },
  { title: "AI 詠唱播客",        tag: "podcast", bg: "linear-gradient(135deg, #3CB1B1 0%, #2e2e2e 100%)", accent: "#3CB1B1", types: ["podcast","youtube"] },
];

function FilterChip({ label, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        appearance: "none",
        border: `1px solid ${active ? "#000" : line}`,
        background: active ? ink2 : (hover ? "#f3f1ee" : "#fff"),
        color: active ? "#fff" : ink,
        borderRadius: 999, padding: "12px 22px",
        fontFamily: "Inter, sans-serif", fontSize: 20,
        cursor: "pointer", transition: "all 220ms",
      }}
    >{label}</button>
  );
}

function WorkPage({ setPage }) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => filter === "all" ? WORKS : WORKS.filter(w => w.types.includes(filter)), [filter]);

  return (
    <>
      <section style={{ padding: "80px 80px 40px" }}>
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 96,
          margin: 0, letterSpacing: "-0.02em",
        }}>Work</h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 22, color: ink2, marginTop: 16, maxWidth: 720 }}>
          A selection of brand, product and IP work — filter by what you're curious about.
        </p>
      </section>

      <section style={{ padding: "0 80px 30px", display: "flex", flexWrap: "wrap", gap: 12 }}>
        {WORK_TAGS.map(t => (
          <FilterChip key={t} label={t} active={filter === t} onClick={() => setFilter(t)} />
        ))}
      </section>

      <section style={{
        padding: "20px 80px 100px",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36,
      }}>
        {filtered.map((w, i) => (
          <WorkCard key={w.title} {...w} icon="assets/work-icon.png" onClick={() => setPage("work-detail")} />
        ))}
      </section>

      <CTA setPage={setPage} />
    </>
  );
}

// ────────────────────────────────────────────────────────────
//  Page: Blog
// ────────────────────────────────────────────────────────────
const POSTS = [
  { id: 1, image: "assets/blog-1.png", title: "我的小星星 終章：打包與上架｜AI 協作手機 APP 創作實錄", tags: ["mobile app","vibe coding"],   date: "2026.03.18", read: "8 min" },
  { id: 2, image: "assets/blog-2.png", title: "我的小星星 下篇：Vibe Coding 建置 APP｜AI 協作手機 APP 創作實錄", tags: ["mobile app","vibe coding"], date: "2026.03.04", read: "12 min" },
  { id: 3, image: "assets/blog-3.png", title: "從一張塔羅牌開始：春男的品牌與互動設計實作筆記", tags: ["UI/UX","project"], date: "2026.02.20", read: "10 min" },
  { id: 4, image: "assets/blog-1.png", title: "GA4 與設計師：把行銷數據變成下一個 sprint 的決策", tags: ["analytics","UI/UX"], date: "2026.01.28", read: "6 min" },
  { id: 5, image: "assets/blog-2.png", title: "做一隻會被收藏的 IP — 多肉生物的造型筆記", tags: ["IP Design","illustration"], date: "2025.12.12", read: "5 min" },
  { id: 6, image: "assets/blog-3.png", title: "Funkuki Studio：一個品牌工作室的第三年觀察", tags: ["project","brand"], date: "2025.11.05", read: "9 min" },
];

const BLOG_TAGS = ["all","mobile app","UI/UX","vibe coding","IP Design","illustration","project","brand","analytics"];

function BlogPage({ setPage }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = POSTS.filter(p => (filter === "all" || p.tags.includes(filter)) && (query === "" || p.title.toLowerCase().includes(query.toLowerCase())));

  return (
    <>
      <section style={{ padding: "80px 80px 30px" }}>
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 96,
          margin: 0, letterSpacing: "-0.02em",
        }}>Blog</h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 22, color: ink2, marginTop: 16, maxWidth: 720 }}>
          設計、產品與 AI 協作的長文筆記。
        </p>
      </section>

      <section style={{ padding: "0 80px", display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{
          flex: "0 0 320px",
          border: `1px solid ${line}`, borderRadius: 999,
          background: "#fff",
          display: "flex", alignItems: "center", padding: "8px 18px",
        }}>
          <span style={{ marginRight: 10, color: muted }}>⌕</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts…"
            style={{
              flex: 1, border: "none", outline: "none",
              fontFamily: "Inter, sans-serif", fontSize: 18, padding: "8px 0", background: "transparent",
            }}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {BLOG_TAGS.map(t => <FilterChip key={t} label={t} active={filter === t} onClick={() => setFilter(t)} />)}
        </div>
      </section>

      <section style={{
        padding: "40px 80px 100px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
      }}>
        {filtered.map(p => (
          <article key={p.id} style={{ cursor: "pointer" }}
            onClick={() => setPage("blog-detail")}
            onMouseEnter={e => e.currentTarget.querySelector(".bcover").style.transform = "scale(1.04)"} onMouseLeave={e => e.currentTarget.querySelector(".bcover").style.transform = "scale(1)"}>
            <div style={{
              width: "100%", aspectRatio: "660/420", borderRadius: 20, overflow: "hidden",
              border: `1px solid ${line}`, position: "relative",
            }}>
              <div className="bcover" style={{
                position: "absolute", inset: 0,
                background: `url(${p.image}) center/cover no-repeat`,
                transition: "transform 700ms cubic-bezier(.2,.8,.2,1)",
              }} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  background: "#f1eeea", borderRadius: 999, padding: "4px 12px",
                  fontFamily: "Inter, sans-serif", fontSize: 14, color: ink2,
                }}>{t}</span>
              ))}
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: muted, marginLeft: "auto" }}>{p.date} · {p.read}</span>
            </div>
            <h3 style={{
              marginTop: 12, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 28,
              lineHeight: 1.45, color: ink,
            }}>{p.title}</h3>
          </article>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1 / -1", padding: 60, textAlign: "center", color: muted, fontFamily: "Inter, sans-serif", fontSize: 22 }}>
            No posts match — try another filter.
          </div>
        )}
      </section>

      <CTA setPage={setPage} />
    </>
  );
}

// ────────────────────────────────────────────────────────────
//  Page: Assets
// ────────────────────────────────────────────────────────────
const ASSET_PACKS = [
  { id: 1, image: "assets/asset-1.jpg", title: "AI 詠唱養成術", author: "Sui", tag: "Notion Template", price: "Free" },
  { id: 2, image: "assets/asset-2.png", title: "多肉生物 Line Sticker Pack", author: "Sui", tag: "Line Stickers", price: "$30" },
  { id: 3, image: "assets/asset-3.png", title: "品牌策略 Workbook v2", author: "Sui", tag: "PDF · 32 pages", price: "$18" },
  { id: 4, image: "assets/work-tarot.png", title: "塔羅牌 UI Kit", author: "Sui", tag: "Figma Library", price: "$24" },
  { id: 5, image: "assets/blog-2.png", title: "Vibe Coding Starter", author: "Sui", tag: "Repo + guide", price: "Free" },
  { id: 6, image: "assets/blog-1.png", title: "Designer × GA4 Cheatsheet", author: "Sui", tag: "PDF", price: "Free" },
];

function AssetCard({ pack, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer", transform: hover ? "translateY(-4px)" : "translateY(0)", transition: "transform 320ms" }}
    >
      <div style={{
        width: "100%", aspectRatio: "450/320", borderRadius: 20, overflow: "hidden",
        border: `1px solid ${line}`, position: "relative",
        boxShadow: hover ? "0 18px 40px rgba(0,0,0,0.12)" : "0 1px 0 rgba(0,0,0,0.02)",
        transition: "box-shadow 360ms",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `url(${pack.image}) center/cover no-repeat`,
          transform: hover ? "scale(1.04)" : "scale(1)",
          transition: "transform 700ms cubic-bezier(.2,.8,.2,1)",
        }} />
        <div style={{
          position: "absolute", top: 16, left: 16,
          background: "rgba(255,255,255,0.92)", borderRadius: 999,
          padding: "6px 14px",
          fontFamily: "Inter, sans-serif", fontSize: 14, color: ink2,
        }}>{pack.tag}</div>
      </div>
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: `url(assets/avatar-thumb.jpg) center/cover` }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 600, color: ink }}>{pack.title}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: muted }}>by {pack.author}</div>
        </div>
        <div style={{
          fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: ink,
          border: `1px solid ${line}`, borderRadius: 999, padding: "8px 16px",
        }}>{pack.price}</div>
      </div>
    </div>
  );
}

function AssetsPage({ setPage }) {
  return (
    <>
      <section style={{ padding: "80px 80px 30px" }}>
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 96,
          margin: 0, letterSpacing: "-0.02em",
        }}>Assets</h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 22, color: ink2, marginTop: 16, maxWidth: 720 }}>
          設計師的工作包，邊做邊長 — Templates · Stickers · Workbooks · Kits.
        </p>
      </section>

      <section style={{
        padding: "30px 80px 100px",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36,
      }}>
        {ASSET_PACKS.map(p => <AssetCard key={p.id} pack={p} onClick={() => setPage("asset-detail")} />)}
      </section>

      <CTA setPage={setPage} />
    </>
  );
}

// ────────────────────────────────────────────────────────────
//  Page: Contact (modal-style page)
// ────────────────────────────────────────────────────────────
function ContactPage({ setPage }) {
  const [form, setForm] = useState({ name: "", email: "", topic: "Brand", budget: "", msg: "" });
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm({ ...form, [k]: v });
  const valid = form.name && form.email && form.msg;

  return (
    <>
      <section style={{ padding: "80px 80px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <h1 style={{
              fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 84,
              margin: 0, letterSpacing: "-0.02em", lineHeight: 1.05,
            }}>Let's make<br/>something good.</h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 22, color: ink2, marginTop: 24, maxWidth: 540, lineHeight: 1.7 }}>
              告訴我一點點背景就好 — 我通常 24 小時內回信。或寄信到 <strong>hello@funkuki.com</strong>。
            </p>

            <div style={{ marginTop: 40, display: "grid", gap: 20 }}>
              {[
                ["Email","hello@funkuki.com"],
                ["Studio","Funkuki · Taipei"],
                ["Hours","Mon–Fri  10:00–19:00"],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "16px 0", borderBottom: `1px solid ${line}`,
                  fontFamily: "Inter, sans-serif", fontSize: 18,
                }}>
                  <span style={{ color: muted }}>{k}</span>
                  <span style={{ color: ink, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* form */}
          <form
            onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }}
            style={{
              border: `1px solid ${line}`, borderRadius: 24, padding: 40,
              background: "#fff",
              display: "grid", gap: 18,
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 10px" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✿</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 32, color: ink }}>Sent — talk soon!</div>
                <p style={{ fontFamily: "Inter, sans-serif", color: ink2, marginTop: 12 }}>I'll reply to <strong>{form.email}</strong> within a day.</p>
                <div style={{ marginTop: 22 }}>
                  <Pill onClick={() => { setSent(false); setForm({ name:"",email:"",topic:"Brand",budget:"",msg:"" }); }}>Send another</Pill>
                </div>
              </div>
            ) : (
              <>
                <Field label="Your name">
                  <input value={form.name} onChange={e=>update("name", e.target.value)} required style={inputCss} placeholder="Mei-ling Wang" />
                </Field>
                <Field label="Email">
                  <input type="email" value={form.email} onChange={e=>update("email", e.target.value)} required style={inputCss} placeholder="you@example.com" />
                </Field>
                <Field label="Project type">
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Brand","Product","IP / Visual","Vibe Coding","Other"].map(t => (
                      <button key={t} type="button" onClick={() => update("topic", t)} style={{
                        appearance: "none", border: `1px solid ${form.topic === t ? "#000" : line}`,
                        background: form.topic === t ? ink2 : "#fff", color: form.topic === t ? "#fff" : ink,
                        borderRadius: 999, padding: "8px 16px",
                        fontFamily: "Inter, sans-serif", fontSize: 16, cursor: "pointer", transition: "all 200ms",
                      }}>{t}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Budget (optional)">
                  <input value={form.budget} onChange={e=>update("budget", e.target.value)} style={inputCss} placeholder="USD 5,000 – 20,000" />
                </Field>
                <Field label="Tell me a bit">
                  <textarea value={form.msg} onChange={e=>update("msg", e.target.value)} required rows={5} style={{ ...inputCss, resize: "vertical" }} placeholder="What are you trying to build, and when?" />
                </Field>
                <div style={{ marginTop: 6 }}>
                  <button type="submit" disabled={!valid} style={{
                    appearance: "none", border: "1px solid #000", borderRadius: 999,
                    padding: "16px 30px", fontSize: 22, fontFamily: "Inter, sans-serif",
                    background: valid ? ink2 : "#bbb", color: "#fff",
                    cursor: valid ? "pointer" : "not-allowed", width: "100%",
                    transition: "background 200ms",
                  }}>Send message →</button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

const inputCss = {
  width: "100%", border: `1px solid ${line}`, borderRadius: 14,
  padding: "14px 16px", fontFamily: "Inter, sans-serif", fontSize: 17,
  outline: "none", background: "#fff", boxSizing: "border-box",
  transition: "border-color 200ms, box-shadow 200ms",
};

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      {children}
    </label>
  );
}

// ────────────────────────────────────────────────────────────
//  Root
// ────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState("home");

  // scroll to top + restore on page change
  const scrollerRef = useRef(null);
  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  // page transition
  const [enterKey, setEnterKey] = useState(0);
  useEffect(() => { setEnterKey(k => k + 1); }, [page]);

  return (
    <div ref={scrollerRef} data-scroller data-snap={page === "home" ? "true" : "false"} style={{
      height: "100vh", overflow: "auto",
      background: cream, color: ink,
      fontFamily: "Inter, sans-serif",
    }}>
      <Nav page={page} setPage={setPage} />
      <main key={enterKey} className="page-enter">
        {page === "home"         && <HomePage setPage={setPage} />}
        {page === "about"        && <AboutPage setPage={setPage} />}
        {page === "work"         && <WorkPage setPage={setPage} />}
        {page === "blog"         && <BlogPage setPage={setPage} />}
        {page === "assets"       && <AssetsPage setPage={setPage} />}
        {page === "contact"      && <ContactPage setPage={setPage} />}
        {page === "work-detail"  && <WorkDetailPage setPage={setPage} />}
        {page === "blog-detail"  && <BlogDetailPage setPage={setPage} />}
        {page === "asset-detail" && <AssetDetailPage setPage={setPage} />}
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
