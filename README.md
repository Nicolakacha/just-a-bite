# Just A Bite

此專案是為了練習 Express MVC 架構 及 ORM 工具 Sequelize 所實作的餐廳網站。

## [DEMO 連結](https://gentle-caverns-02920.herokuapp.com/)

## 功能

### 身為使用者
- 可以瀏覽餐廳菜單，並將餐點加入購物車內。
- 可以在我要抽獎頁面玩抽獎遊戲。
- 可以查看常見問題。

### 身為管理員
- 可以新增、編輯、修改及刪除餐廳餐點。
- 可以新增、編輯、修改及刪除抽獎獎項。
- 可以新增、編輯、修改及刪除常見問題。

## 技術：

- 利用 Express.js 和 EJS 建立 MVC 架構
- 採用 ORM 工具 Sequelize 串接 MySQL DB
- 以 Gulp 進行前端程式碼壓縮及優化
- 使用 [compression](http://expressjs.com/en/resources/middleware/compression.html) 進行 GZIP 壓縮。
- 使用 [helmet](https://helmetjs.github.io/) 增加網站安全性。

## 畫面

### 首頁
![首頁](https://i.imgur.com/qKMkCNe.png)

### 抽獎頁面
![抽獎頁面](https://i.imgur.com/r0hMnse.png)

### 點餐頁面
![點餐頁面](https://i.imgur.com/fMnlW5x.png)

### 常見問題
![常見問答](https://i.imgur.com/r6YGbd7.png)

### 購物車
![購物車](https://i.imgur.com/GkqdAkQ.png)

### 管理餐點
![管理餐點](https://i.imgur.com/VpU7QKu.png)

### 管理常見問題
![管理常見問題](https://i.imgur.com/tVQTiaB.png)

### 管理抽獎獎項
![管理抽獎獎項](https://i.imgur.com/we9BTX0.png)

## 指令

### `npm run migrate`
在資料庫中建立好所需要的 tables。

### `npm run start`
在本地端的資料庫中建立好所需要的 tables，並在 [http://localhost:5556](localhost:5556) 啟動伺服器以運行網站。

### `npm run onlyStart`
若資料庫中已建立好 tables，只是需要啟動伺服器以運行此網站時，可使用此指令。