# Eatoes – Restaurant Admin Dashboard

A full-stack MERN application for restaurant owners to manage menus, track inventory, and handle customer orders.


## Project Structure

eatoes/
├── server/                  
│   ├── config/db.js         
│   ├── models/              
│   ├── controllers/         
│   ├── routes/              
│   ├── scripts/seed.js      
│   ├── server.js            
│   ├── .env        
│   └── package.json
├── client/                  
│   ├── src/
│   │   ├── App.jsx          
│   │   ├── components/      
│   │   ├── pages/           
│   │   ├── hooks/           
│   │   ├── context/         
│   │   └── utils/api.js     
│   ├── public/index.html
│   ├── .env                 
│   └── package.json
└── README.md                



## How to Run - Step by Step

### Step 1 — Set up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas and create a **free** account.
2. Create a new **Cluster** (choose the free shared tier).
3. Click **Connect** → choose **MongoDB Shell** or **Application**.
4. Copy your connection string. It looks like:
   ```
   mongodb+srv://youruser:yourpassword@yourcluster.mongodb.net/eatoes?retryWrites=true&w=majority
   ```
5. In Atlas, go to **Security → Network Access** → Add IP Address → add `0.0.0.0/0` (allows all — fine for development).

---

### Step 2 — Configure the Server `.env`

1. Open a terminal and navigate into the `server` folder:
   ```bash
   cd eatoes/server
   ```
2. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
   On Windows (PowerShell):
   ```powershell
   copy .env.example .env
   ```
3. Open `.env` in any text editor and paste your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://youruser:yourpassword@yourcluster.mongodb.net/eatoes?retryWrites=true&w=majority
   PORT=5000
   ```

---

### Step 3 — Install Server Dependencies & Start

```bash
cd eatoes/server
npm install
```
This installs: express, mongoose, cors, dotenv, and nodemon (dev).

**Start the server (development mode with auto-reload):**
```bash
npm run dev
```
You should see:
```
✅ MongoDB Connected: yourcluster.mongodb.net
🚀 Eatoes Server running on http://localhost:5000
```

> Keep this terminal open. Open a **new terminal** for the next steps.

---

### Step 4 — Seed Sample Data (optional but recommended)

In a **new terminal**:
```bash
cd eatoes/server
npm run seed
```
Output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
🍽️  Inserted 13 menu items
📦 Inserted 20 sample orders
✅ Seed complete!
```
This populates your database with 13 menu items and 20 orders so the dashboard isn't empty.

---

### Step 5 — Install Client Dependencies & Start

```bash
cd eatoes/client
npm install
```
This installs: react, react-dom, axios, lucide-react, tailwindcss, vite, and related plugins.

**Start the frontend dev server:**
```bash
npm run dev
```
You should see:
```
  VITE v6.x.x  ready in Xms

  ➜  Local:   http://localhost:3000/
```

---

### Step 6 — Open the App

Open your browser and go to:
```
http://localhost:3000
```

You should see the **Eatoes Restaurant Admin Dashboard** with:
- ✅ Dashboard with stat cards and top-sellers table
- ✅ Menu Management with search, filters, add/edit/delete, availability toggle
- ✅ Orders page with pagination and status updates

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | List all menu items (supports `?category=`) |
| GET | `/api/menu/search?q=` | Full-text search |
| POST | `/api/menu` | Create a menu item |
| PUT | `/api/menu/:id` | Update a menu item |
| DELETE | `/api/menu/:id` | Delete a menu item |
| PATCH | `/api/menu/:id/availability` | Toggle availability |
| GET | `/api/orders` | List orders (supports `?status=&page=&limit=`) |
| POST | `/api/orders` | Create an order |
| PATCH | `/api/orders/:id/status` | Update order status |
| GET | `/api/analytics/summary` | Dashboard summary stats |
| GET | `/api/analytics/top-sellers` | Top 5 best-selling items |

---

## 🛠️ Key Technical Concepts Demonstrated

| Concept | Where |
|---------|-------|
| **Debouncing** | `client/src/hooks/useDebounce.js` — delays search API calls until user stops typing |
| **Optimistic UI** | `client/src/components/MenuCard.jsx` — toggles availability instantly, reverts on failure |
| **Context API** | `MenuContext` (global menu state), `ToastContext` (global notifications) |
| **MongoDB Aggregation** | `server/controllers/orderController.js` → `getTopSellers()` pipeline |
| **Text Search Index** | `server/models/MenuItem.js` — compound text index on `name` + `ingredients` |
| **Pagination** | `server/controllers/orderController.js` → `getOrders()` with skip/limit |

---

## 🚧 Deployment (Bonus)

### Backend → Render
1. Push your code to GitHub.
2. Go to https://render.com → New → Web Service → link your repo.
3. Set **Build Command**: `cd server && npm install`
4. Set **Start Command**: `cd server && npm start`
5. Add environment variable: `MONGODB_URI` = your Atlas connection string.

### Frontend → Netlify
1. Go to https://www.netlify.com → New Site → link your repo.
2. Set **Build Command**: `cd client && npm run build`
3. Set **Publish Directory**: `client/dist`
4. Add environment variable: `VITE_API_URL` = your Render backend URL (e.g. `https://eatoes-server.onrender.com/api`)

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| `MongoDB Connection Error` | Check your `.env` URI. Make sure Atlas Network Access allows `0.0.0.0/0`. |
| `CORS error` in browser | Make sure the server is running on port 5000. Check `client/.env` has `VITE_API_URL=http://localhost:5000/api`. |
| `Cannot find module` | Run `npm install` inside both `server/` and `client/` folders. |
| Port 3000 already in use | Change port in `client/vite.config.js` or kill the process using it. |
| Port 5000 already in use | Change `PORT` in `server/.env`. |
