import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import { ToastProvider } from "./context/ToastContext";

const Orders = lazy(() => import("./pages/Orders"));
const MenuManagement = lazy(() => import("./pages/MenuManagement"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));


function Layout() {
  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h2 style={styles.title}>Admin Panel</h2>

        <nav style={styles.nav}>
          <NavLink to="/" end style={({ isActive }) => navLinkStyle(isActive)}>
            Orders
          </NavLink>

          <NavLink to="/menu" style={({ isActive }) => navLinkStyle(isActive)}>
            Menu
          </NavLink>

          <NavLink to="/dashboard" style={({ isActive }) => navLinkStyle(isActive)}>
            Dashboard
          </NavLink>

          <NavLink to="/analytics" style={({ isActive }) => navLinkStyle(isActive)}>
            Analytics
          </NavLink>
        </nav>
      </aside>

      <main style={styles.main}>
        <Suspense fallback={<div style={styles.loading}>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Orders />} />
              <Route path="/menu" element={<MenuManagement />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>

            <Route
              path="*"
              element={
                <div style={styles.notFound}>
                  <h1 style={styles.notFoundText}>404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </MenuProvider>
  );
}


const styles = {
  app: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#F3F4F6" 
  },
  sidebar: {
    width: 256,
    backgroundColor: "#FFFFFF",
    boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
    padding: 16,
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 24
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  main: {
    flex: 1,
    padding: 24,
    overflowY: "auto"
  },
  loading: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 16,
    color: "#6B7280"
  },
  notFound: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "#6B7280"
  },
  notFoundText: {
    fontSize: 24,
    fontWeight: 700
  }
};

function navLinkStyle(isActive) {
  return {
    padding: "8px 12px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    backgroundColor: isActive ? "#F59E0B" : "transparent",
    color: isActive ? "#FFFFFF" : "#374151",
    transition: "background-color 0.15s ease"
  };
}
