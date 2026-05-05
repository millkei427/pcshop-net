---
name: fb-post-generator
description: >
  Generate a full batch of Facebook promotional posts for PC Shop (澳門專業電腦店) — including Traditional Chinese post text AND matching 1200×630 px HTML image designs. Use this skill whenever the user asks to create Facebook posts, social media content, FB帖文, promotional images, or wants to batch-generate marketing content for the PC shop. Also use when the user says "幫我出帖文", "做Facebook post", "生成推廣貼", or any similar request about social media content. Always use this skill proactively when the user wants to promote products or share tech news on Facebook.
---

# FB Post Generator — PC Shop 澳門

This skill generates a ready-to-post Facebook content batch for PC Shop, Macau's professional computer store. Each batch includes:

- **5–7 Facebook post texts** in Traditional Chinese (with hashtags, contact info, CTA)
- **Matching HTML image files** (1200×630 px) for each post, saved to `FB帖文圖片/`
- **A suggested posting schedule**

---

## Shop Identity (hardcode into every post)

```
店名: PC Shop 專業電腦店
電話: 📞 2840 3503
網址: 🌐 pcshop-net.com
地址: 📍 澳門 PC Shop 專業電腦店
```

Every image footer and every post text must include the phone number **2840 3503** and website **pcshop-net.com**.

---

## Step 1 — Research (web search)

Before writing any posts, search for the latest relevant tech news. Good search queries:

- `RTX 5060 Ti 16GB shortage 2025`
- `Samsung Odyssey monitor new release`
- `PCIe 5.0 SSD price drop`
- `AMD Ryzen gaming PC 2025`
- `best gaming monitor under $2000 HKD 2025`

Pick **1–2 real news stories** to anchor the "科技資訊" post type. The rest of the posts can focus on products currently in stock.

---

## Step 2 — Choose Post Mix

A balanced weekly batch of 7 posts:

| # | Type | Chinese Label | Colour Theme |
|---|------|---------------|--------------|
| 1 | New product arrival | 新品登場 | Red/orange `#ff4444 → #ff8800` |
| 2 | Brand spotlight | 品牌推介 | Yellow/gold `#ffc800 → #ff8800` |
| 3 | Product lineup | 系列介紹 | Blue `#1428a0 → #00b2ff` |
| 4 | Weekly deal | 每週優惠 | Green `#00ff88 → #00cc66` |
| 5 | Tech news | 科技資訊 | Orange/red `#ff6400 → #ff0000` |
| 6 | Upgrade tip | 電腦升級 | Speed blue `#0050c8 → #00a8ff` |
| 7 | Interactive poll | 互動帖 | Teal `#4AADA8 → #2D8F8A` |

Adapt the types to whatever the user actually wants to promote. If they ask for fewer posts, pick the most relevant types.

---

## Step 3 — Write Post Text (Traditional Chinese)

Each post text follows this structure:

```
[Attention-grabbing headline — 1 line, punchy]

[Body — 3–5 lines. Product details, news, or tips. Benefit-focused.]

👉 立即查詢：pcshop-net.com
📞 2840 3503
📍 澳門 PC Shop 專業電腦店

[3–5 hashtags on one line]
```

**Tone:** Professional but friendly. Aimed at Macau gamers, office users, and DIY builders. Use Hong Kong/Macau Cantonese writing style (e.g. 咁, 係, 喺, 啱).

**Hashtag bank** (pick relevant ones per post):
`#澳門電腦` `#PCShop` `#電腦推薦` `#電競` `#DIY電腦` `#顯示卡` `#顯示器` `#Samsung` `#NVIDIA` `#RTX` `#SSD升級` `#電競螢幕` `#每週優惠` `#新品` `#性價比`

---

## Step 4 — Create HTML Image Files

For each post, create a standalone HTML file at:
`FB帖文圖片/帖文{N}_{shortname}.html`

### HTML Template

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@400;700;900&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1200px; height:630px; overflow:hidden; font-family:'Noto Sans HK', sans-serif; }
.bg { width:100%; height:100%; background:linear-gradient(135deg, {BG_GRADIENT}); position:relative; overflow:hidden; }
/* --- decorative elements as needed --- */
.content { position:relative; z-index:10; padding:40px 60px; height:100%; display:flex; flex-direction:column; justify-content:space-between; }
.header { display:flex; align-items:center; gap:16px; }
.logo-badge { background:linear-gradient(135deg, {LOGO_COLORS}); color:white; font-weight:900; font-size:18px; padding:8px 18px; border-radius:8px; }
.cat-badge { background:rgba({ACCENT_RGB},0.15); border:1px solid rgba({ACCENT_RGB},0.4); color:{ACCENT_HEX}; font-size:14px; font-weight:700; padding:6px 16px; border-radius:20px; }
/* ... main content styles ... */
.footer { display:flex; justify-content:space-between; align-items:center; }
.contact { color:rgba(255,255,255,0.6); font-size:14px; line-height:1.9; }
.contact strong { color:{ACCENT_HEX}; }
.tags { color:rgba({ACCENT_RGB},0.4); font-size:12px; text-align:right; line-height:2; }
</style>
</head>
<body>
<div class="bg">
  <!-- decorative elements -->
  <div class="content">
    <div class="header">
      <div class="logo-badge">PC SHOP</div>
      <div class="cat-badge">{CATEGORY_EMOJI} {CATEGORY_LABEL}</div>
    </div>
    <!-- main content -->
    <div class="footer">
      <div class="contact">
        <strong>🌐 pcshop-net.com</strong><br>
        📞 2840 3503　📍 澳門 PC Shop 專業電腦店
      </div>
      <div class="tags">
        {HASHTAGS}
      </div>
    </div>
  </div>
</div>
</body>
</html>
```

### Design Rules

- **Background**: Always dark — near-black gradient. Adjust hue per post type (see table above).
- **Logo badge** (top-left): Always says `PC SHOP` in white bold text on a coloured gradient pill.
- **Category badge** (next to logo): Emoji + Chinese label, semi-transparent background matching accent colour.
- **Headline**: `font-size: 38–50px`, `font-weight: 900`, white with accent-coloured keywords wrapped in `<span>`.
- **Footer** (bottom): Left = contact info (website bold in accent colour, phone + address in muted white). Right = hashtags in faded accent colour.
- **Font**: Always `Noto Sans HK` via Google Fonts CDN — supports Traditional Chinese.
- **Never** use placeholder emoji for product visuals alone — add CSS-based price cards, spec tags, progress bars, or data grids to fill the right side.
- **Body dimensions**: exactly `width:1200px; height:630px`. Do not use viewport units.

### Per-type design elements

| Type | Right-side visual idea |
|------|------------------------|
| New arrival | Large `font-size:80px` product emoji + spec tag pills |
| Brand spotlight | Product lineup list with price on right |
| Weekly deal | `🔥 超筍價錢` badge + spec feature list |
| Tech news | Alert box `⚠️` + stock price cards |
| SSD upgrade | Speed bar (read speed number + CSS fill bar) + spec pills |
| Interactive poll | 2×2 grid of ABCD option cards, each with emoji + label |

---

## Step 5 — How Users Screenshot the HTML Files

Instruct the user to:
1. Open each HTML file in Chrome
2. Press **F12** → click the device toolbar icon (📱) at the top
3. Set custom size **1200 × 630**
4. Right-click the page → **Capture full size screenshot**
5. Save the PNG and attach it to the Facebook post

---

## Step 6 — Posting Schedule

Suggest a 7-day schedule. Good posting times for Macau: **12:00–13:00** (lunch) and **20:00–22:00** (evening).

Example:
```
週一 20:00 — 新品登場 (RTX 5060 Ti)
週二 12:00 — 品牌推介 (BenQ)
週三 20:00 — 系列介紹 (Samsung Odyssey)
週四 12:00 — 每週優惠
週五 20:00 — 科技資訊
週六 12:00 — 電腦升級 (SSD)
週日 20:00 — 互動帖
```

---

## Product Reference

Current stock categories to draw from:

**顯示器 (Monitors)**
- Samsung Odyssey G5 27"/32" QHD 180Hz
- Samsung Odyssey G6 OLED 27" 360Hz / G8 OLED 32" 4K 240Hz
- ViewSonic VX27G58-2K 27" 2K 210Hz (HK$1,455)
- BenQ ZOWIE XL2566K 25" 360Hz / XL2546X 24.5" 240Hz

**顯示卡 (GPUs)**
- RTX 5060 Ti 8GB (HK$3,738) / 16GB (HK$5,233)
- RTX 5070 Ti / RTX 5080 (flagship)
- Gigabyte AORUS / WINDFORCE series

**SSD**
- Samsung 9100 PRO 1TB (HK$2,220) — PCIe 5.0 Gen.5, 14,800 MB/s
- Samsung 990 PRO 1TB (HK$568) — PCIe 4.0, great value

**處理器 / 主機板 / 記憶體** — Intel Core Ultra / AMD Ryzen 9000 series

---

## Output Format

Always produce:
1. All post texts in one block (numbered 1–7)
2. All HTML files written to `FB帖文圖片/`
3. The posting schedule
4. A brief note reminding the user to screenshot each HTML in Chrome (F12 method)
