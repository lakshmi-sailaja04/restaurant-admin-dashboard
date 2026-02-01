import React, { useState, useEffect } from 'react';
import { ShoppingBag, UtensilsCrossed, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import api from '../utils/api';
import '../styles/Dashboard.css';

function StatCard({ title, value, icon: Icon, color, sub }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [sumRes, topRes] = await Promise.all([
          api.get('/analytics/summary'),
          api.get('/analytics/top-sellers'),
        ]);
        setSummary(sumRes.data);
        setTopSellers(topRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loader">
        <div className="spinner" />
      </div>
    );
  }

  const pendingCount =
    summary?.statusBreakdown?.find((s) => s._id === 'Pending')?.count || 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your restaurant at a glance.</p>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Orders" value={summary?.totalOrders ?? 0} icon={ShoppingBag} color="bg-blue" sub={`${pendingCount} pending`} />
        <StatCard title="Menu Items" value={summary?.totalMenuItems ?? 0} icon={UtensilsCrossed} color="bg-amber" />
        <StatCard title="Total Revenue" value={`$${(summary?.totalRevenue ?? 0).toFixed(2)}`} icon={DollarSign} color="bg-emerald" />
        <StatCard title="Orders Today" value={pendingCount} icon={CheckCircle} color="bg-purple" />
      </div>

      <div className="card">
        <div className="card-header">
          <TrendingUp size={16} />
          <h2>Top 5 Best-Selling Items</h2>
        </div>

        {topSellers.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
            No sales data yet.
          </p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Qty Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topSellers.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <span className={`rank ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other'}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.totalQuantity}</td>
                    <td style={{ color: '#10b981', fontWeight: 600 }}>
                      ${item.totalRevenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {summary?.statusBreakdown && (
        <div className="card" style={{ marginTop: '24px' }}>
          <div className="card-header">
            <h2>Order Status Breakdown</h2>
          </div>
          <div className="status-box">
            {summary.statusBreakdown.map((s) => (
              <div key={s._id} className="status-item">
                <span className={`dot ${
                  s._id === 'Pending' ? 'yellow' :
                  s._id === 'Preparing' ? 'blue' :
                  s._id === 'Ready' ? 'green' :
                  s._id === 'Delivered' ? 'gray' : 'red'
                }`} />
                <span>{s._id}</span>
                <strong>{s.count}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
