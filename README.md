# 專案畫面
![image](https://github.com/yun856839/expense-tracker/blob/master/expense-tracker.jpg)

# expense-tracker
* 供使用者記錄支出
* [請按此使用](https://limitless-lowlands-55482.herokuapp.com/)

# 功能描述 (features)
* 可在首頁一次瀏覽所有支出的清單
* 可在首頁看到所有支出清單的總金額
* 新增一筆支出
* 編輯支出的所有類別 (一次只能編輯一筆)
* 刪除任何一筆支出 (一次只能刪除一筆)
* 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

# 環境建置與需求 (prerequisites)
* Node.js: 13.5.0
* Express: 4.17.1
* Express-Handlebars: 5.2.0
* body-parser: 1.19.0
* mongoose": 5.10.15
* method-override: 3.0.0

# 安裝與執行步驟(installation and execution)
  1. 打開終端機(Terminal)，Clone 此專案至本地電腦
  ```
  git clone https://github.com/yun856839/expense-tracker.git
  ```

  2. 開啟終端機，進入專案資料夾
  ```
  cd expense-tracker
  ```

  3. 安裝 npm 套件
  ```
  npm install
  ```
  4. 執行種子資料腳本
  ```
  npm run seed
  ```

  5. 執行 server
  ```
  npm run dev
  ```

  6. 開啟任一瀏覽器瀏覽器，輸入網址
  ```
  http://localhost:3000
  ```
