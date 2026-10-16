# PC Shop — Session Handoff Note
_Last updated: 2026-08-09（CODE session：完成 GA4 lead tracking）_
_Cowork session → Claude Code session 交接_

---

## 網站基本資料

| 項目 | 內容 |
|---|---|
| Live URL | https://pcshop-net.com |
| Repo | https://github.com/millkei427/pcshop-net.git |
| Branch | main |
| 本地路徑 | `D:\ClaudeAI\WonderShop\` |
| 主文件 | `index.html`（單一文件，全部 HTML/CSS/JS inline） |
| 架構 | 靜態 GitHub Pages |
| 最新 commit | `89d3ece` — "Add GA4 product_view tracking for service cards" |

---

## 本 session 已完成的全部工作

### ✅ 1. SmartBoard 相片集（新增 2 張）
- `Photos/SmartBoard-Photos/sb-photo-34.jpg`（200KB）
- `Photos/SmartBoard-Photos/sb-photo-35.jpg`（121KB）
- 內容：澳門街坊會聯合總會 98吋 Interactive Flat Panel 安裝現場
- 已加入 HTML carousel（`<div class="sb-slide">` class）
- 相片集現共 **35 張**（sb-photo-01 至 sb-photo-35）

### ✅ 2. 電子白板軟件介紹區塊（全新）

**位置**：`<section id="smartboard">` 內，`<div class="sb-dots" id="sbDots"></div>` 之後

**HTML 結構**：
```
<div class="sb-software">
  ├── sb-sw-header（標題 + "持續開發中" badge）
  ├── sb-sw-mockup（SVG 介面預覽）
  ├── sb-diff-cards（4 張差異化卡片）
  ├── sb-sw-pills（功能 pills：已推出 / 即將推出）
  ├── sb-devlog（開發動態：2026.07–08）
  └── sb-tutorial-teaser（教學資源預告 + 聯絡按鈕）
</div>
```

**SVG Mockup 內容**：
- 模擬 Mac 風格瀏覽器框（標題列 + traffic lights）
- URL bar 顯示 `smartboard.pcshop.mo`
- Toolbar：工具列（游標/筆/螢光筆/形狀/文字/橡皮）+ 語言切換（繁中/EN/简中）
- 左側 sidebar：繪圖/形狀/文字/媒體/便條/縮放/設定
- 主畫布：語言對比卡（繁中⇄英文）、流程圖、便利貼（開發進度）、工具列預覽
- 狀態欄：頁碼、版本號、語言、儲存狀態

**4 張差異化卡片**：
- 🇲🇴 澳門本地研發
- 🔗 硬軟一體整合
- 🌐 三語無縫切換
- 🛠️ 按需迭代更新

**CSS 新增 classes**（全部已在 index.html `<style>` 內）：
`.sb-software`, `.sb-sw-dev-badge`, `.sb-sw-pills`, `.sb-sw-pill`, `.sb-sw-pill.ready`, `.sb-sw-pill.coming`, `.sb-devlog`, `.sb-tutorial-teaser`, `.sb-sw-mockup`, `.sb-sw-mockup-label`, `.sb-sw-mockup-frame`, `.sb-diff-cards`, `.sb-diff-card`, `.sb-diff-icon`, `.sb-diff-title`, `.sb-diff-desc`

響應式斷點：`@media(max-width:900px)` → diff cards 2欄；`@media(max-width:480px)` → 1欄

### ✅ 3. Git 同步
- 所有改動已 commit + push
- 已解決 remote rejected 問題（`git stash` → `git pull --rebase` → `git stash pop` → `git push`）

---

## ✅ 已完成：GA4 Lead Tracking（CODE session · 2026-08-09）

**參考規格**：`D:\Claude Code\GA4_KEY_EVENTS_SPEC.md` → **§2 PC Shop**
**Measurement ID**：`G-H76SZSZJ8C`（早已裝好，只加事件、冇重裝）

### 落 code 咗嘅事件（全部已部署上線，本地 = GitHub = 線上一致）

| 事件 | 觸發點 | 帶參數 | 優先 | commit |
|---|---|---|---|---|
| `whatsapp_click` | 所有 wa.me 連結（含右下浮動掣） | `method`, `location`, `link_url` | P0 | `f381ef1` |
| `phone_click` | 所有 `tel:` 連結（頁尾/聯絡區） | `method`, `location`, `link_url` | P0 | `f381ef1` |
| `contact_submit` | 查詢表提交 `sendContactEmail()` | `item_name`(查詢類別), `method`, `location` | P1 | `f381ef1` |
| `product_view` | 9 張 `.service-card` 進視窗各 fire 一次 | `item_name`(服務名), `location` | P2 | `89d3ece` |

**做法重點**：
- WhatsApp / 電話用**事件委派**（`document.addEventListener('click'…closest)`），覆蓋現有 + 將來所有連結，唔使逐個綁 —— 位置喺 `<head>` gtag block（index.html 頂）
- `contact_submit` 加喺 `sendContactEmail()` 開 WhatsApp 之前；查詢類別做 `item_name`
- `product_view` 用 `IntersectionObserver`（threshold 0.5，fire-once 去重），喺 `sendContactEmail()` 之後
- `quote_request` 冇獨立做：全站得一個查詢表，已由 `contact_submit` 涵蓋，避免重複計數
- 驗證：Browser JS spy 攔 gtag 實測 P0/P1 真 fire 參數啱；`product_view` 因 preview pane 唔派 IO callback，改合成 entry 驗 callback 邏輯（9 卡/去重/item_name 全對）

### ⏳ 淨返用戶喺 GA4 後台手動（唔喺 code 層）
1. 開 `https://pcshop-net.com/?debug_mode=1` 撳吓 WhatsApp/電話/提交查詢 → **管理 → DebugView** 即時見事件+參數
2. **管理 → 資料顯示 → 事件** → 將 `whatsapp_click`、`phone_click`、`contact_submit` 標「**關鍵事件**」（`product_view` 唔標，保留輔助）
3. 照 `PCSHOP_GA4_FUNNEL_GUIDE.md` 起 3 張報表（lead×channel / 漏斗 / 服務熱度）
4. 一週後覆盤 lead 數 + Organic 有冇轉化

---

## 其他待辦（較低優先）

### 白板軟件開發（另一 CODE session）
- 技術棧：Next.js + React
- i18n 已完成（繁/簡/英即時切換）
- Toolbar 組件完成
- 下一步：教學模式、雲端同步

### 推廣文稿（已備好，可直接用）
澳門街坊會 IFP 安裝完成 → 朋友圈發文，共 6 個版本（A–F）備選：
- A: 簡潔有力（五步驟清單）
- B: 有溫度講故事
- C: 輕鬆活潑加 hashtag
- D: 站在客戶角度（解決閒置問題）
- E: 數字專業版
- F: 幽默對話版

---

## 文件結構快覽

```
D:\ClaudeAI\WonderShop\
├── index.html                          ← 主文件（全部頁面內容 + GA4 tracking）
├── SESSION_HANDOFF.md                  ← 本文件
├── _config.yml                         ← Jekyll exclude：內部 .md + docx + pdf + FB帖文圖片/ 唔公開 serve（線上 404，檔案仍在 repo）
├── PCSHOP_GA4_FUNNEL_GUIDE.md          ← GA4 後台報表設定指南（入 repo 但 Jekyll 排除、線上 404）
├── Photos/
│   └── SmartBoard-Photos/
│       ├── sb-photo-01.jpg ... sb-photo-33.jpg  （原有）
│       ├── sb-photo-34.jpg             ← 新增（澳門街坊會）
│       └── sb-photo-35.jpg             ← 新增（澳門街坊會）
└── cpttm/                              （另一客戶文件夾）
```

---

## 2026-10-03 Session — 軟件服務頁擴充 + Blog 機器修復

### ✅ 已完成

**1. 網站本體（WonderShop / pcshop-net.com）**
- 首頁「軟件解決方案」區域新增「我們可以為你度身開發的系統」網格（10 個系統類型）
- 新增 3 個獨立服務頁，全部已上線：
  - /service/appointment-system.html（預約排程系統）
  - /service/membership-crm.html（會員 CRM 系統）
  - /service/hr-system.html（HR 考勤薪酬系統）
- 服務總覽頁 /service/ 加入上述 3 項連結
- 首頁網格中 4 個項目（預約、CRM、POS、HR）已加「了解更多」連結
- sitemap.xml 已更新並補上 lastmod

**2. 增長引擎（pcshop-growth-engine）**
- Blog Factory 由 Google Sheet 遷移至 repo 內檔案（drafts/blog/*.json），根治 BLOG_SHEET_ID 未 set 導致 6 連敗嘅問題
- 更新 blog-weekly.yml：cron 自動生成 draft 並 commit 入 repo
- 刪除過時嘅 blog-publish.yml，重寫 docs/blog-setup.md
- 發佈第 4 篇 blog：[澳門人力資源系統選型指南](https://pcshop-net.com/blog/macau-hr-system-guide.html)
- 將舊 3 篇 blog backfill 入 draft store，令 blog index 齊 4 篇

### ⏳ 待辦 / 等你決定

**高優先**
1. **GMB OAuth 設定**：已開啟 Google Auth Platform consent screen，需繼續完成 Step 2–3，之後跑 `npm run gmb-oauth` 攞 token。
2. **實習生手動貼文**：posts 1–17 已 approved，實習生可按 `實習生工作包.md` 排程表每週發佈 FB + GBP。
3. **GBP 資料優化**：類別、服務清單、問與答（`實習生_文案與發佈指南.md` §2.3–§2.8）。

**中優先**
4. 剩餘 6 個系統類型要否做獨立頁：ERP、訂閱/套票、網店、智慧教學、設備保養、App/小程序。
5. Tender Radar：213 個活躍招標待 review，揀 IT 相關嘅投。
6. GA4 checkout 漏斗：檢查 `add_to_cart` 之後嘅 `begin_checkout` / `purchase` 流失。

**雜項**
- `DCL file/`、`data/`、`docs/*.docx`、`scripts/send-skechers.ts` 未入 git
- WonderShop 散檔：`GA4_KEY_EVENTS_SPEC.md`、`images/mpay-qr.jpg`

---

## 2026-10-16 Session — 推廣轉化優化 + 服務頁視覺升級

### ✅ 已完成

**1. shop.html 轉化優化**
- 產品卡加入 WhatsApp「查詢」掣、信任標籤（澳門門市、原廠保養、全澳送貨）、原價劃線
- 購物車側欄加入「WhatsApp 查詢購物車」掣
- 結帳彈窗加入信任條（安全付款、送貨、正品保證、快速回覆）及「以 WhatsApp 直接落單」掣
- 右下角加入浮動 WhatsApp 按鈕
- 新增 JS：`whatsappProduct()`、`whatsappCart()`、`whatsappCheckout()`，並帶 GA4 `whatsapp_click` 事件

**2. 服務頁面全面升級**
- `service/index.html` 重新設計：Hero + 卡片式服務總覽（商業系統 / IT 支援）+ 為什麼選擇 PC Shop + FAQ + CTA
- 所有服務分頁用語改為標準中文（例如「到府」→「上門」）
- POS、ERP、CRM 重點分頁豐富化：痛點、核心功能 grid、服務流程、FAQ、為什麼選擇 PC Shop
- 其餘 7 個系統分頁加入 Hero CTA 按鈕及「為什麼選擇 PC Shop」section：
  - appointment-system.html、hr-system.html、subscription-system.html、maintenance-system.html、smart-school-system.html、mobile-app-system.html、ecommerce-system.html
- `service/index.html` 加入 FAQ 內容及 FAQPage schema，強化 AI 搜尋可見性

**3. 再行銷追蹤 placeholder**
- 新增 `tracking.js`：Meta Pixel + Google Ads Remarketing 載入器（placeholder ID）
- 在 `index.html`、`shop.html`、`service/index.html` 引入
- 用戶只需將 `REPLACE_META_PIXEL_ID` 及 `REPLACE_GOOGLE_ADS_ID` 替換為實際 ID 即可啟用

**4. Google Business Profile 內容策略**
- 新增 `docs/gbp-content-strategy.md`：
  - 每週 GBP Post 發佈計劃（產品優惠 / 服務案例 / 知識分享 / 客戶評價）
  - 評論引導話術（WhatsApp / 電郵 / 門市櫃檯）
  - 關鍵字與 hashtag 建議
  - 圖片/影片內容建議
  - 追蹤指標與執行檢查清單
- `review.html` 用語標準化：「推薦畀朋友」→「推薦給朋友」

### 📌 建議新增 SKILL（供下次參考）

1. **`pcshop-service-page-template`**  
   快速生成新的 `/service/<system>.html` 分頁，自動帶入：
   - 標準 head（GA4、SEO meta、canonical、alternate、og、schema）
   - Hero + SVG 視覺 + CTA 按鈕
   - 痛點、核心功能 grid、適用行業、服務流程、FAQ、為什麼選擇 PC Shop、CTA、相關服務
   - 標準中文用語檢查

2. **`standard-chinese-lint`**  
   掃描 HTML / Markdown 內容，標記並建議修正廣東話口語字（唔、嘅、喺、睇、揀、俾、攞、搵、冇、啲、咁、呢、嗰、喎、咋、嘛、囉、落單、有冇、幾多、幾時、點解、點樣、邊個、係咪、而家、到府等）。

### ⏳ 待辦 / 等你決定

**高優先**
1. **Meta Pixel / Google Ads ID**：請提供實際 ID，替換 `tracking.js` 及三個頁面的 `REPLACE_META_PIXEL_ID` / `REPLACE_GOOGLE_ADS_ID`。
2. **GBP 執行**：按 `docs/gbp-content-strategy.md` 每週發 Post，並在服務完成後 24 小時內發送評論邀請。
3. **shop.html 實測**：GitHub Pages 更新後開 `https://pcshop-net.com/shop.html?nocache=1` 確認新 CTA 顯示正常。

**中優先**
4. 其餘維修支援分頁可加強視覺（repair、onsite、data-recovery、network、printer、cctv、store）。
5. 為所有服務分頁建立統一連結至 `review.html`，強化評論轉化。
6. 考慮將熱門系統分頁加入首頁「軟件解決方案」區域的「了解更多」連結。

**雜項**
- `tracking.js` 目前為 placeholder，啟用前請勿忘記替換 ID。
- `service/index.html` 的視覺 redesign 需等待 GitHub Pages build 後線上驗證。
