const { useState, useEffect } = React;

// ────────────────────────────────────────────────────────────
//  Shared helpers
// ────────────────────────────────────────────────────────────
const dInk = "#0c0c0c";
const dInk2 = "#2e2e2e";
const dMuted = "#8f8a8a";
const dLine = "#e6e6e6";

function BackBar({ to, label, setPage }) {
  return (
    <div style={{ padding: "30px 80px 0" }}>
      <button
        onClick={() => setPage(to)}
        style={{
          appearance: "none", border: "none", background: "none",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontSize: 18, color: dInk2,
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "8px 0",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = dInk}
        onMouseLeave={(e) => e.currentTarget.style.color = dInk2}
      >
        <span style={{ fontSize: 20 }}>←</span> Back to {label}
      </button>
    </div>
  );
}

function Tag({ children, dark = false }) {
  return (
    <span style={{
      display: "inline-block",
      background: dark ? "#2e2e2e" : "#e6e6e6",
      color: dark ? "#fff" : "#0c0c0c",
      borderRadius: 12, padding: "8px 16px",
      fontFamily: "Inter, sans-serif", fontSize: 18,
    }}>{children}</span>
  );
}

// ────────────────────────────────────────────────────────────
//  Long-form prose block — handles ### h3, - bullets, blank lines
// ────────────────────────────────────────────────────────────
function Prose({ text }) {
  // Split into blocks separated by blank lines
  const blocks = text.split(/\n\n+/);
  return (
    <div style={{
      fontFamily: "Inter, sans-serif", fontSize: 20, lineHeight: 1.95,
      color: dInk, maxWidth: 760, margin: "0 auto",
    }}>
      {blocks.map((blk, i) => {
        const lines = blk.split("\n");
        // h3
        if (lines[0]?.startsWith("### ")) {
          return (
            <h3 key={i} style={{
              fontFamily: "Inter, sans-serif", fontWeight: 700,
              fontSize: 32, marginTop: 48, marginBottom: 16, color: dInk,
            }}>{lines[0].replace(/^### /, "")}</h3>
          );
        }
        // h2 (lines that are short stand-alone titles like "正文開始" / "說明" / "特色")
        if (lines.length === 1 && lines[0].length <= 6 && /^[\u4e00-\u9fa5A-Za-z]+$/.test(lines[0])) {
          return (
            <h2 key={i} style={{
              fontFamily: "Inter, sans-serif", fontWeight: 800,
              fontSize: 36, marginTop: 56, marginBottom: 12, color: dInk,
              borderTop: `1px solid ${dLine}`, paddingTop: 36,
            }}>{lines[0]}</h2>
          );
        }
        // bullets
        if (lines.every(l => l.trim().startsWith("-"))) {
          return (
            <ul key={i} style={{ paddingLeft: 22, margin: "16px 0" }}>
              {lines.map((l, j) => (
                <li key={j} style={{ marginBottom: 8 }}>{l.replace(/^[-\s]+/, "")}</li>
              ))}
            </ul>
          );
        }
        // ordinary paragraph (preserve internal line breaks within block)
        return (
          <p key={i} style={{ margin: "0 0 22px" }}>
            {lines.map((l, j) => (
              <React.Fragment key={j}>
                {l}{j < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
//  Author byline
// ────────────────────────────────────────────────────────────
function Byline({ date }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      maxWidth: 760, margin: "0 auto 36px",
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: "url(assets/little-sui.png) center/cover",
        border: `1px solid ${dLine}`,
      }} />
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: dInk }}>SUI</span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: dMuted }}>·</span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: dMuted }}>{date}</span>
    </div>
  );
}

function AuthorCard() {
  return (
    <section style={{ padding: "40px 80px 80px" }}>
      <div style={{
        display: "flex", gap: 40, alignItems: "center",
        border: `1px solid ${dLine}`, borderRadius: 24, padding: 50,
        maxWidth: 1132, margin: "0 auto",
      }}>
        <div style={{
          width: 130, height: 130, borderRadius: "50%",
          background: "url(assets/little-sui.png) center/cover, #fdfcf9",
          border: `1px solid ${dLine}`, flexShrink: 0,
        }} />
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 22, lineHeight: 1.85, color: dInk }}>
          Hi, 我是 <strong>Sui</strong>！專攻品牌策略與體驗設計的數位產品設計師。<br />
          我在這裡記錄我的數位作品，同時也記錄產品開發的歷程，有時也留下一些生活雜記。
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
//  Work Detail
// ────────────────────────────────────────────────────────────
function WorkDetailPage({ setPage }) {
  return (
    <>
      <BackBar to="work" label="Work" setPage={setPage} />

      {/* Hero image */}
      <section style={{ padding: "30px 80px 0" }}>
        <div style={{
          width: "100%", maxWidth: 1100, margin: "0 auto",
          aspectRatio: "1100/700", borderRadius: 20, overflow: "hidden",
          border: `1px solid ${dLine}`,
          background: "url(assets/work-detail-cards.png) center/contain no-repeat, linear-gradient(135deg, #f3eee7, #fdfcf9)",
        }} />
      </section>

      {/* Title + meta */}
      <section style={{ padding: "60px 80px 20px", textAlign: "center" }}>
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 72,
          margin: 0, letterSpacing: "-0.02em",
        }}>我的小星星牌卡</h1>
        <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Tag>mobile app</Tag>
          <Tag>UI / UX</Tag>
          <Tag>vibe coding</Tag>
          <Tag>2026</Tag>
        </div>
      </section>

      {/* Project meta strip */}
      <section style={{ padding: "40px 80px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
          padding: "30px 0", borderTop: `1px solid ${dLine}`, borderBottom: `1px solid ${dLine}`,
        }}>
          {[
            ["Role", "Lead Designer · Solo Build"],
            ["Timeline", "2025.06 – 2026.01"],
            ["Stack", "Midjourney · Cursor · React Native"],
            ["Status", "Live on App Store · Google Play"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{k}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: dInk, fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Project description */}
      <section style={{ padding: "40px 80px 20px" }}>
        <Prose text={
`專案說明

《我的小星星》牌卡是我創作的第一款結合紫微斗數卡片與正念鼓勵語的療癒系 App。

內容超級單純：每天抽取一張小星星卡片，獲得專屬於你的心靈小語，或許能為你在生活中找到小小的平衡與快樂。

特色

每日收獲一句正念鼓勵，帶來正向的小小幸福片刻。
58 種紫微星曜角色可收藏。
支援 3 種不同語言：繁體中文、English、日文。`
        } />
      </section>

      {/* App screenshots */}
      <section style={{ padding: "30px 80px 60px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60,
          maxWidth: 1033, margin: "0 auto",
        }}>
          {[
            "assets/work-detail-app1.png",
            "assets/work-detail-app2.png",
          ].map((src, i) => (
            <div key={i} style={{
              aspectRatio: "384/716",
              background: `url(${src}) center/contain no-repeat`,
              borderRadius: 32,
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.18))",
            }} />
          ))}
        </div>
      </section>

      {/* Related posts */}
      <section style={{ padding: "60px 80px 80px" }}>
        <div style={{ maxWidth: 1033, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 36,
            margin: "0 0 24px", borderTop: `1px solid ${dLine}`, paddingTop: 36,
          }}>相關文章</h2>
          <div style={{ display: "grid", gap: 4 }}>
            {[
              "我的小星星 上篇：視覺化設計｜AI 協作手機 APP 創作實錄",
              "我的小星星 下篇：Vibe Coding 建置 APP｜AI 協作手機 APP 創作實錄",
              "我的小星星 終章：打包與上架｜AI 協作手機 APP 創作實錄",
            ].map((t, i) => (
              <button key={i}
                onClick={() => setPage("blog-detail")}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(8px)"; e.currentTarget.querySelector("span:last-child").style.color = dInk; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.querySelector("span:last-child").style.color = dMuted; }}
                style={{
                  appearance: "none", background: "none", border: "none",
                  borderBottom: `1px solid ${dLine}`,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "22px 4px", fontFamily: "Inter, sans-serif", fontSize: 22,
                  color: dInk, textAlign: "left", cursor: "pointer",
                  transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <span>{t}</span>
                <span style={{ color: dMuted, transition: "color 200ms" }}>↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ────────────────────────────────────────────────────────────
//  Blog Detail
// ────────────────────────────────────────────────────────────
const BLOG_BODY =
`在正文開始前，先和你介紹一下我自己。

我是 Sui，我的主修是行銷與數位策略。雖然大學時學過數位設計，但我並非設計科班出身。人生前半段職涯，我長時間在品牌與行銷領域打滾，熟悉從策略規劃到內容轉譯的整體流程。創業以後，則一頭栽進令人怦然心動的 UI/UX 和 3D 設計的世界。

因為不是傳統設計師的養成路線，我自然地會傾向嘗試各種新工具與實驗方法來達成設計目的。無論是生成式 AI、Vibe Coding、還是介面開發，只要能幫助實現想像，我都會主動摸索。對我而言，設計的價值不只是創造美觀的畫面，更是藉由設計提出解決問題的方案。

這個《AI 協作手機 APP 創作實錄》系列，是我對近期發展《我的小星星》手機 APP 專案的紀錄。我想把我怎麼發展小星星牌卡的歷程做一個整理和記錄，同時也在此宣告原創的聲明。

正文開始

《我的小星星》是一款結合紫微斗數牌卡 + 正念鼓勵語 + AI 視覺設計 + vibe coding 的手機 APP。我希望它能成為使用者每日的小儀式：藉由抽一張星星牌卡、獲得一句心靈小語，帶來正向的小小幸福片刻。

這是一個再單純不過、沒有動畫、沒有音效，只是希望透過簡單的操作 — 抽卡加收藏，讓大家可以每天進行一次單純的正念行動，沒有負擔的 APP 小品。

我將這個 APP 製作歷程分為上下兩篇文章來分享：

- 上篇將聚焦於 如何以 Midjourney 和 ChatGPT 完成視覺設計
- 下篇則說明 如何用 Cursor 進行 Vibe Coding
- 終章則記錄打包與上架 App Store 與 Google Play 的流程

### 專案說明

《我的小星星》是我對紫微斗數學習的實踐，是一個結合命理哲學與互動設計的小實驗。我想讓紫微斗數這門知識，能用更輕盈、溫柔的方式進入大家的日常。

紫微斗數是一門深奧的學問，各家各派對星曜與命盤結構都有些許不同見解，市面上的紫微牌卡也都是由專業的論命系統而生，搭配解析方式與使用教學，自成一套操作規則並需要專門學習才能分析。

《我的小星星》並不是那樣的「專業論命工具」，我期待它更像是一個柔軟的日常陪伴。

以紫微作為背景理論，牌卡裡的每一個角色、每一句心靈小語，都是透過我對紫微星曜的理解與解譯而生。它們來自紫微，但也試著跳脫紫微的語言，用更貼近生活的方式，讓使用者無需技巧，也能感受到來自星星的祝福。

### 牌卡組成

APP 第一版的牌卡總數為 58 張，包含：

- 28 個主星
- 5 個雙主星男孩
- 20 個輔星精靈
- 5 張隱藏角色

每張牌卡除了星曜角色本身，還會附上一句根據星曜特質設計的「心靈小語」和來自星星的提醒，包括建議可行（Do）和不可行的方向（Don't）和小小的建議。`;

function ReadingProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const scroller = document.querySelector("[data-scroller]") || el;
      const top = scroller.scrollTop;
      const h = scroller.scrollHeight - scroller.clientHeight;
      setPct(h > 0 ? Math.min(100, (top / h) * 100) : 0);
    };
    const sc = document.querySelector("[data-scroller]");
    (sc || window).addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => (sc || window).removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{
      position: "sticky", top: 86, zIndex: 30,
      height: 3, background: "transparent",
      maxWidth: "100%",
    }}>
      <div style={{
        width: pct + "%", height: 3, background: dInk,
        transition: "width 80ms linear",
      }} />
    </div>
  );
}

function BlogDetailPage({ setPage }) {
  return (
    <>
      <ReadingProgressBar />
      <BackBar to="blog" label="Blog" setPage={setPage} />

      {/* Hero image */}
      <section style={{ padding: "30px 80px 0" }}>
        <div style={{
          width: "100%", maxWidth: 1100, margin: "0 auto",
          aspectRatio: "1100/700", borderRadius: 20, overflow: "hidden",
          border: `1px solid ${dLine}`,
          background: "url(assets/blog-3.png) center/cover no-repeat",
        }} />
      </section>

      {/* Title */}
      <section style={{ padding: "50px 80px 30px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
            <Tag>mobile app</Tag>
            <Tag>vibe coding</Tag>
            <Tag>AI</Tag>
          </div>
          <h1 style={{
            fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 56,
            margin: 0, letterSpacing: "-0.01em", lineHeight: 1.15, color: dInk,
          }}>我的小星星 上篇：視覺化設計｜AI 協作手機 APP 創作實錄</h1>
        </div>
      </section>

      {/* Byline */}
      <section style={{ padding: "10px 80px 30px" }}>
        <Byline date="2025.06.20" />
      </section>

      {/* Body */}
      <section style={{ padding: "20px 80px 60px" }}>
        <Prose text={BLOG_BODY} />
      </section>

      {/* Share row */}
      <section style={{ padding: "20px 80px 40px" }}>
        <div style={{
          maxWidth: 760, margin: "0 auto",
          display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
          padding: "30px 0", borderTop: `1px solid ${dLine}`, borderBottom: `1px solid ${dLine}`,
        }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: dMuted, alignSelf: "center", marginRight: 8 }}>Share</span>
          {["Copy link","Threads","X","LinkedIn","Mail"].map(s => (
            <button key={s} style={{
              appearance: "none", border: `1px solid ${dLine}`, background: "#fff",
              borderRadius: 999, padding: "8px 18px",
              fontFamily: "Inter, sans-serif", fontSize: 16, color: dInk2,
              cursor: "pointer", transition: "all 200ms",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.background = "#f3f1ee"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = dLine; e.currentTarget.style.background = "#fff"; }}
            >{s}</button>
          ))}
        </div>
      </section>

      <AuthorCard />

      {/* More posts */}
      <section style={{ padding: "20px 80px 100px" }}>
        <div style={{ maxWidth: 1132, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 32, margin: "0 0 24px" }}>Continue reading</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              { img: "assets/blog-2.png", title: "我的小星星 下篇：Vibe Coding 建置 APP", date: "2025.07.04" },
              { img: "assets/blog-1.png", title: "我的小星星 終章：打包與上架", date: "2026.03.18" },
            ].map((p, i) => (
              <button key={i} onClick={() => setPage("blog-detail")}
                style={{
                  appearance: "none", background: "none", border: "none",
                  textAlign: "left", padding: 0, cursor: "pointer",
                }}>
                <div style={{
                  aspectRatio: "16/10", borderRadius: 16, overflow: "hidden",
                  border: `1px solid ${dLine}`,
                  background: `url(${p.img}) center/cover`,
                }} />
                <div style={{ marginTop: 14, fontFamily: "Inter, sans-serif", fontSize: 14, color: dMuted }}>{p.date}</div>
                <div style={{ marginTop: 4, fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 600, color: dInk, lineHeight: 1.4 }}>{p.title}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ────────────────────────────────────────────────────────────
//  Asset Detail
// ────────────────────────────────────────────────────────────
const ASSET_BODY =
`說明

《AI 詠唱養成術》是每週更新一篇主題文章的全中文電子書。本書主要的內容是希望用平實簡單易行的方式說明如何運用 Midjourney 詠唱生成不同的藝術風格、如何應用，以及和其他設計工具與 AI 串接的可能。

每隔幾個月，Midjourney 就會推出重大更新，每次更新都會影響詠唱方式與結果。AI 生成藝術的應用範圍也在擴大，從插畫、品牌設計、UI 設計、NFT 到商業應用 — 我們的創作內容也可以隨著這些變化延伸，這些變化讓持續學習 Midjourney 變得更有價值。

主要的內容

《AI 詠唱週報》是持續更新的內容。每週都會更新一個 Midjourney 或 AI 生成圖片相關的主題專欄送到你的信箱。內容主要探討 Midjourney 詠唱的技巧與練習，但不限於詠唱，也包括如何應用與各種藝術風格討論的內容。專欄內容也不僅限於 Midjourney，會持續加入其他生成圖片相關的新內容分享。

🎁 附帶的禮物：《Midjourney 101》。如果你是 Midjourney 的初學者，歡迎在我為新手準備的 Midjourney 新手村中查看基礎教學，從零開始建立你的 Midjourney 基礎。

適合誰閱讀

適合 AI 生成愛好者，也適合：

- 品牌與商業創作（如插畫、產品設計、廣告、電影分鏡）
- 個人藝術創作（如 NFT、數位藝術、概念設計）
- 社群行銷與內容創作（如 IG 貼文、封面設計）

從 0 到 1 的創作、創意發想往往是最困難的，不如把 Midjourney 變成你的靈感庫，豐富創作時的創意。就算不是使用 Midjourney 為主要工具，也可以參考《AI 詠唱養成術》，跟著我持續補充 AI 生成的趨勢。`;

function AssetDetailPage({ setPage }) {
  return (
    <>
      <BackBar to="assets" label="Assets" setPage={setPage} />

      {/* Hero image */}
      <section style={{ padding: "30px 80px 0" }}>
        <div style={{
          width: "100%", maxWidth: 1100, margin: "0 auto",
          aspectRatio: "1100/700", borderRadius: 20, overflow: "hidden",
          border: `1px solid ${dLine}`,
          background: "url(assets/asset-1.jpg) center/cover no-repeat",
        }} />
      </section>

      {/* Title */}
      <section style={{ padding: "60px 80px 0", textAlign: "center" }}>
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 72,
          margin: 0, letterSpacing: "-0.02em",
        }}>AI 詠唱養成術</h1>
        <div style={{ marginTop: 16 }}>
          <Tag>電子書</Tag>
        </div>
      </section>

      {/* Two-column: prose + sticky purchase card */}
      <section style={{ padding: "60px 80px" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 360px", gap: 60,
          alignItems: "start",
        }}>
          {/* Left: prose */}
          <div>
            <Prose text={ASSET_BODY} />
          </div>

          {/* Right: sticky purchase card */}
          <aside style={{
            position: "sticky", top: 110,
            border: `1px solid ${dLine}`, borderRadius: 20,
            padding: 30, background: "#fff",
          }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Subscription</div>
            <div style={{ marginTop: 14, fontFamily: "Inter, sans-serif", fontSize: 44, fontWeight: 800, color: dInk, lineHeight: 1 }}>NT$150<span style={{ fontSize: 18, fontWeight: 500, color: dMuted, marginLeft: 6 }}>/ month</span></div>
            <div style={{ marginTop: 4, fontFamily: "Inter, sans-serif", fontSize: 14, color: dMuted }}>or US$ 4.99/month</div>

            <ul style={{ margin: "26px 0 24px", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {[
                "每週一篇主題專欄",
                "完整存取所有歷史內容",
                "🎁 附贈《Midjourney 101》",
                "可隨時取消",
              ].map(li => (
                <li key={li} style={{ display: "flex", gap: 10, fontFamily: "Inter, sans-serif", fontSize: 15, color: dInk }}>
                  <span style={{ color: "#3CB1B1" }}>✓</span>
                  <span>{li}</span>
                </li>
              ))}
            </ul>

            <button style={{
              width: "100%", appearance: "none",
              border: "1px solid #000", borderRadius: 999,
              padding: "16px 22px", fontFamily: "Inter, sans-serif", fontSize: 20,
              background: dInk2, color: "#fff", cursor: "pointer",
              transition: "transform 200ms, background 200ms",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#000"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = dInk2; e.currentTarget.style.transform = "translateY(0)"; }}
            >在 Gumroad 訂閱 →</button>

            <div style={{
              marginTop: 22, paddingTop: 18, borderTop: `1px solid ${dLine}`,
              fontFamily: "Inter, sans-serif", fontSize: 13, color: dMuted, lineHeight: 1.7,
            }}>
              訂閱後將收到每週信件，內含完整內容與下載連結。試閱後仍可隨時取消。
            </div>
          </aside>
        </div>
      </section>

      {/* What's inside grid */}
      <section style={{ padding: "20px 80px 80px" }}>
        <div style={{ maxWidth: 1132, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 36, margin: "0 0 30px" }}>What's inside</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { n: "01", t: "詠唱基礎", d: "從 prompt 結構、權重、版本差異說起，建立你的詠唱直覺。" },
              { n: "02", t: "藝術風格", d: "拆解攝影、插畫、3D、復古海報等風格的關鍵詞與組合。" },
              { n: "03", t: "商業應用", d: "如何把 Midjourney 圖片接上品牌設計、UI、廣告分鏡。" },
              { n: "04", t: "工具串接", d: "和 Photoshop、Figma、After Effects 串接的工作流。" },
              { n: "05", t: "案例拆解", d: "每月一個實作案例，從需求到交件完整紀錄。" },
              { n: "06", t: "趨勢觀察", d: "AI 圖像生態的快速變動 — 每月補充重點更新。" },
            ].map(b => (
              <div key={b.n} style={{
                border: `1px solid ${dLine}`, borderRadius: 18,
                padding: 28, background: "#fff",
                transition: "transform 280ms, box-shadow 280ms",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 30px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dMuted, letterSpacing: "0.1em" }}>{b.n}</div>
                <div style={{ marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 24, fontWeight: 700, color: dInk }}>{b.t}</div>
                <div style={{ marginTop: 10, fontFamily: "Inter, sans-serif", fontSize: 15, color: dInk2, lineHeight: 1.7 }}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// expose for app.jsx
Object.assign(window, { WorkDetailPage, BlogDetailPage, AssetDetailPage });
