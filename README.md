# Instagram DM 分析器

一個強大的工具，用於分析您的 Instagram 私人訊息數據，提供詳細的統計資訊和視覺化圖表。

## ✨ 主要功能

- 📊 **詳細統計**: 訊息數量、參與者統計、對話分析
- 📈 **時間分析**: 按小時、星期、月份的訊息分佈圖表
- 💬 **詞頻分析**: 分析最常使用的詞彙（支援中英文）
- 🔤 **中文解碼**: 自動解碼 Unicode 編碼的中文字符
- 🛡️ **隱私保護**: 所有處理完全在瀏覽器端進行，不上傳任何數據
- 📱 **響應式設計**: 支援電腦、平板、手機各種裝置

## 🚀 快速開始

### 1. 獲取 Instagram 數據

1. 打開 Instagram 手機應用或網頁版
2. 前往 **設定 > 隱私與安全 > 下載資料**
3. 申請下載您的完整數據副本
4. 等待 Instagram 處理（通常需要 1-2 天）
5. 下載並解壓縮檔案

### 2. 尋找訊息檔案

在解壓縮的檔案中找到：
```
your_instagram_data/
├── messages/
│   └── inbox/
│       └── message_1.json  ← 這個檔案
```

### 3. 使用分析工具

1. 開啟網頁應用
2. 點擊「上傳檔案」按鈕
3. 選擇 `message_1.json` 檔案
4. 等待處理完成
5. 查看詳細的分析結果

## 📊 分析功能

### 基本統計
- 總訊息數量
- 參與者數量
- 對話數量
- 平均每日訊息數

### 圖表分析
- **時間分佈圖**: 一天中各小時的訊息活躍度
- **星期分佈圖**: 一週中各天的訊息分佈
- **發送者分析**: 圓餅圖顯示各參與者的訊息比例
- **詞頻分析**: 最常使用的詞彙雲

### 中文支援
- 自動檢測 Unicode 編碼的中文字符
- 智能中文分詞
- 中英文混合詞頻分析

## 🛠️ 技術棧

- **前端框架**: React 16+
- **UI 庫**: Material-UI
- **圖表庫**: Chart.js, React-Chartjs-2
- **樣式**: Material Kit React
- **建構工具**: Create React App

## 📱 支援的瀏覽器

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🔒 隱私與安全

此工具具有以下隱私保護特性：

- ✅ **本地處理**: 所有數據處理完全在您的瀏覽器中進行
- ✅ **無數據上傳**: 不會將任何數據傳送到外部伺服器
- ✅ **無儲存**: 重新整理頁面即清除所有數據
- ✅ **開源透明**: 完整原始碼公開可查

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

### 開發環境設置

```bash
# 複製專案
git clone https://github.com/your-username/instagram-dm-analyzer.git

# 安裝依賴
npm install

# 啟動開發伺服器
npm start

# 建構生產版本
npm run build
```

## 📄 授權

此專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案

## ⚠️ 免責聲明

- 此工具僅供個人分析使用
- 請確保您有權分析所上傳的數據
- 開發者不對數據的使用承擔任何責任
- Instagram 是 Meta Platforms, Inc. 的商標

## 🆘 常見問題

### Q: 為什麼我的中文訊息顯示亂碼？
A: 此工具支援自動解碼，但如果仍有問題，請確保您的 JSON 檔案編碼正確。

### Q: 支援多大的檔案？
A: 理論上沒有限制，但建議檔案大小不超過 100MB 以確保最佳效能。

### Q: 數據會被上傳嗎？
A: 絕對不會！所有處理都在您的瀏覽器本地進行。

### Q: 支援群組對話嗎？
A: 是的，工具會自動識別並分析群組對話。

## 🔧 疑難排解

### 清除快取

如果遇到以下問題，請嘗試清除快取：
- ESLint 解析器錯誤
- 樣式不正確顯示
- 開發伺服器啟動失敗
- 組件無法正常載入

#### 方法一：重新構建 CSS（推薦）
```bash
npm run build-css
```

#### 方法二：完全重新安裝依賴
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# macOS/Linux
rm -rf node_modules/
rm package-lock.json
npm install
```

#### 方法三：清除 npm 快取
```bash
npm cache clean --force
```

#### 方法四：重新啟動開發伺服器
停止當前的開發伺服器（Ctrl+C），然後重新執行：
```bash
npm start
```

### 常見錯誤解決方案

**babel-eslint 解析器錯誤**
```bash
# 重新構建 CSS 通常可以解決此問題
npm run build-css
npm start
```

**Sass 編譯錯誤**
```bash
# 確保 Sass 依賴正確安裝
npm install sass --save-dev
npm run build-css
```

**端口被佔用**
```bash
# 修改端口或結束佔用進程
npm start -- --port 3001
```

---

Made with ❤️ by [Your Name] 