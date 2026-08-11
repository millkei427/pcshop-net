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
