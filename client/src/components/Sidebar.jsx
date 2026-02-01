import React from 'react';
import { LayoutDashboard, UtensilsCrossed, ClipboardList, ChefHat } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed },
  { id: 'orders', label: 'Orders', icon: ClipboardList }
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>
            <ChefHat size={20} color="#111827" strokeWidth={2.5} />
          </div>
          <div>
            <h1 style={styles.title}>Eatoes</h1>
            <p style={styles.subtitle}>Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav style={styles.nav}>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              style={{
                ...styles.navItem,
                ...(active ? styles.navActive : styles.navInactive)
              }}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div style={styles.footer}>
        <p style={styles.footerText}>© 2025 Eatoes Inc.</p>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 256,
    backgroundColor: '#030712',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    flexShrink: 0
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid #1F2937'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #FBBF24, #F97316)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.25)'
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    fontFamily: "'Playfair Display', serif",
    margin: 0
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    margin: 0
  },
  nav: {
    flex: 1,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  navItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#9CA3AF',
    transition: 'all 0.15s ease',
    textAlign: 'left'
  },
  navActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    color: '#F59E0B'
  },
  navInactive: {
    color: '#9CA3AF'
  },
  footer: {
    padding: '16px 24px',
    borderTop: '1px solid #1F2937'
  },
  footerText: {
    fontSize: 12,
    color: '#4B5563',
    margin: 0
  }
};
