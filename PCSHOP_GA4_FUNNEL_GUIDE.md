# PC Shop — GA4 Lead 報表設定指南

_對應 property：`pcshop-net.com`（掛喺 Sunrise Yoga 帳戶下）· Measurement ID `G-H76SZSZJ8C`_
_已落 code 事件：`whatsapp_click` · `phone_click` · `contact_submit` · `product_view`_
_建立：2026-08-09_

---

## 第 0 步（一次性）標記關鍵事件

**管理 → 資料顯示 → 事件**，等三個新事件真 fire 過後出現，逐個開「標記為關鍵事件」：

- ✅ `whatsapp_click`
- ✅ `phone_click`
- ✅ `contact_submit`
- ⬜ `product_view`（**唔標**，保留一般事件做輔助 / 分母）

> 想即時見唔使等：開 `https://pcshop-net.com/?debug_mode=1` 撳吓掣 → **管理 → DebugView** 逐個確認。

---

## 報表 A：一星期幾多個 Lead？邊條 channel 帶入？（主報表）

**目的**：回答「WhatsApp + 電話一週幾多 lead」+「Organic 有冇轉化」。

1. 左側 **探索(Explore) → 建立新探索 → 空白**
2. 技巧(Technique)：**自由格式(Free form)**
3. **列(Rows)**：`工作階段主要管道群組`（Session primary channel group）
4. **值(Values)**：`事件計數`（Event count）
5. **篩選器(Filters)**：`事件名稱` **完全符合以下其中一項** → `whatsapp_click`、`phone_click`、`contact_submit`
   - （GA4 用 `符合規則運算式`：`whatsapp_click|phone_click|contact_submit`）
6. 日期揀 **過去 7 天**

→ 即刻睇到每條來源（Organic / Direct / AI Assistant…）各帶咗幾多個 lead。

**加碼**：把 `事件名稱` 拉去「欄(Columns)」，就變成
「channel × lead 類型」交叉表 —— 知道 Organic 客偏好 WhatsApp 定打電話。

---

## 報表 B：轉化漏斗（到站 → 睇服務 → 查詢）

**目的**：睇 lead 卡喺邊一步流失。

1. **探索 → 建立新探索 → 空白**
2. 技巧：**漏斗探索(Funnel exploration)**
3. 步驟(Steps) 設三層：
   - **步驟 1**：`session_start`（到站）
   - **步驟 2**：`product_view`（睇過服務卡）
   - **步驟 3**：`whatsapp_click` **或** `phone_click` **或** `contact_submit`（產生 lead）
     - 呢步用「或(OR)」條件，任一 lead 事件計入
4. 打開「**顯示經過的時間**」睇每步耗時
5. 日期 **過去 28 天**（漏斗要多啲資料先睇到率）

→ 睇「到站 100 人 → 幾多睇服務 → 幾多真查詢」，即係 lead 轉化率。

> ⚠️ PC Shop 係單頁站，lead 係終點動作而非長 funnel，所以呢個漏斗係「參與深度」指標，唔好當電商結帳漏斗咁解讀。

---

## 報表 C：邊項服務最多人睇（產品熱度）

**目的**：`product_view` 帶咗 `item_name`，知 9 項服務邊項最吸睛，指導推廣重點。

1. **探索 → 自由格式**
2. **列**：`item_name`（自訂維度；若揀唔到，見下方註）
3. **值**：`事件計數`
4. **篩選器**：`事件名稱` = `product_view`

> **註 · 自訂維度要先註冊**：`item_name` 係標準參數通常直接有；若列表揀唔到，去
> **管理 → 自訂定義 → 建立自訂維度** → 事件範圍 → 參數填 `item_name` → 儲存。
> 註冊後**只對之後**收集嘅資料生效（唔追溯），等一日左右先有數。

---

## 一星期後返嚟睇乜（對齊 spec §5）

- `whatsapp_click` + `phone_click` 一週合共幾多個 lead？
- Organic Search 帶入嚟嗰批，有冇轉化成 lead？（報表 A 睇）
- `chatgpt.com / AI Assistant` channel 嗰批人有冇轉化？（新指標，報表 A 有得睇）
- 報表 B 漏斗：睇服務 → 查詢 嘅流失位喺邊？

---

## 快速核對 checklist

- [ ] `whatsapp_click` / `phone_click` / `contact_submit` 已標關鍵事件
- [ ] DebugView 真撳過每個掣，參數（method / location / item_name）啱
- [ ] 報表 A（lead × channel）已儲存
- [ ] 報表 B（漏斗）已儲存
- [ ] （如需）`item_name` 自訂維度已註冊
- [ ] 一週後覆盤
