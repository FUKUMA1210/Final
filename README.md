## 專案主題與目標

**專案主題**：
- 留言板

**專案目標**：
- 建立一個基於前後端分離架構的留言管理系統。
- 提供基本的留言 CRUD 功能（新增、查詢、更新、刪除）。

---

## 技術選擇原因
- **前端**：React.js
  - 易於構建動態的使用者界面。
  - 具備強大的社群支持與豐富的 UI 庫。

- **後端**：Node.js + Express
  - 單執行緒模型適合 I/O 密集型應用。
  - 擁有豐富的中間件支持，簡化 API 開發。

- **資料庫**：MongoDB
  - 非結構化數據的靈活存儲，特別適合留言數據模型。
  - 提供高效的查詢能力與水平擴展支持。

---

## 架構說明
- **前端**：用戶通過 React 應用操作留言界面。
- **後端**：Express 負責處理 API 請求並與資料庫交互。
- **資料庫**：MongoDB 用於存儲用戶留言及其相關數據。

---

## 安裝與執行指引

### 前置條件
1. 安裝 [Node.js](https://nodejs.org/) 與 npm。
2. 安裝 [MongoDB](https://www.mongodb.com/) 並啟動服務。

### 安裝步驟

1. Clone 專案
```bash
git clone <repository_url>
cd <project_directory>
```
2. 安裝依賴
```bash
npm install
```
3. 配置環境變數
```bash
cp .env.example .env
#修改 .env 文件，配置 MongoDB URI
```

4. 啟動後端服務
```bash
npm start
```

---

# API 規格說明文件

| 路由                                | HTTP 方法 | 描述              |
|------------------------------------|-----------|-------------------|
| `/api/v1/auth/login`               | POST      | 用戶登入           |
| `/api/v1/auth/logout`              | POST      | 用戶登出           |
| `/api/v1/user/addUser`             | POST      | 新增用戶           |
| `/api/v1/user/getAllUsers`         | GET       | 取得所有用戶       |
| `/api/v1/comment/addComment`       | POST      | 新增留言           |
| `/api/v1/comment/update/:commentId`| PUT       | 更新留言           |
| `/api/v1/comment/delete/:commentId`| DELETE    | 刪除留言           |
| `/api/v1/comment/user/:username`   | GET       | 取得用戶的所有留言  |

---

### API 詳細規格

#### 1. 用戶登入
- **路由**: `/api/v1/auth/login`
- **方法**: POST
- **請求參數**:
  ```json
   {
   "username": "testUser",
   "password": "password123"
   }
  ```
- **回應格式**:
  ```json
   {
   "message": "Login successful.",
   "token": "your_jwt_token_here"
   }
  ```

#### 2. 用戶登出
- **路由**: `/api/v1/auth/logout`
- **方法**: POST
- **回應格式**:
  ```json
   {
   "message": "Logout successful."
   }
  ```

#### 3. 新增用戶
- **路由**: `/api/v1/user/addUser`
- **方法**: POST
- **請求參數**:
  ```json
   {
   "username": "newUser",
   "password": "securePassword"
   }
  ```
- **回應格式**:
  ```json
   {
   "message": "User created successfully.",
   "user": {
      "id": "1",
      "username": "newUser",
      "createdAt": "2025-01-08T12:00:00Z"
   }
   }
  ```

#### 4. 取得所有用戶
- **路由**: `/api/v1/user/getAllUsers`
- **方法**: GET
- **回應格式**:
  ```json
   [
   {
      "id": "1",
      "username": "user1",
      "createdAt": "2025-01-08T12:00:00Z"
   },
   {
      "id": "2",
      "username": "user2",
      "createdAt": "2025-01-08T12:05:00Z"
   }
   ]
  ```

#### 5. 新增留言
- **路由**: `/api/v1/comment/addComment`
- **方法**: POST
- **請求參數:**:
   ```json
   {
   "username": "user1",
   "message": "This is a test comment."
   }
   ```
- **回應格式**:
   ```json
   {
   "message": "Comment added successfully.",
   "comment": {
      "id": "1",
      "username": "user1",
      "message": "This is a test comment.",
      "createdAt": "2025-01-08T12:10:00Z"
   }
   }
   ```
#### 6. 更新留言
- **路由**: `/api/v1/comment/update/:commentId`
- **方法**: PUT
- **請求參數:**:
   ```json
   {
   "message": "Updated comment content."
   }
   ```
- **回應格式**:
   ```json
   {
   "message": "Comment updated successfully.",
   "comment": {
      "id": "1",
      "username": "user1",
      "message": "Updated comment content.",
      "updatedAt": "2025-01-08T12:20:00Z"
   }
   }
   ```

#### 7. 刪除留言
- **路由**: `/api/v1/comment/delete/:commentId`
- **方法**: DELETE
- **回應格式:**:
   ```json
   {
   "message": "Comment deleted successfully."
   }
   ```

#### 8. 取得用戶的所有留言
- **路由**: `/api/v1/comment/user/:username`
- **方法**: GET
- **請求參數:**:
   ```json
   [
   {
      "id": "1",
      "username": "user1",
      "message": "First comment.",
      "createdAt": "2025-01-08T12:10:00Z"
   },
   {
      "id": "2",
      "username": "user1",
      "message": "Second comment.",
      "createdAt": "2025-01-08T12:15:00Z"
   }
   ]

   ```
---

# 架構圖與流程圖

## 架構圖

```
+-----------+        +-------------+        +------------+
|           |        |             |        |            |
|   前端    | <----> |    後端      | <----> |   資料庫   |
|  (React)  |        | (Express)   |        | (MongoDB)  |
|           |        |             |        |            |
+-----------+        +-------------+        +------------+
```

## CRUD 流程圖

```
用戶操作（前端）
    |
    V
API 請求（POST/GET/PUT/DELETE）
    |
    V
後端處理（Express 中間件）
    |
    V
資料庫操作（MongoDB）
    |
    V
回應結果（JSON 格式）
```