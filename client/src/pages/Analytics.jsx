import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function Analytics() {
  const [summary, setSummary] = useState(null);
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    api
      .get("/analytics/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Summary error:", err));

    api
      .get("/analytics/top-sellers")
      .then((res) => setTopSellers(res.data))
      .catch((err) => console.error("Top sellers error:", err));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics</h2>

      <p><strong>Total Orders:</strong> {summary.totalOrders}</p>
      <p><strong>Total Revenue:</strong> ₹{summary.totalRevenue}</p>

      <h3>Top Sellers</h3>
      {topSellers.length === 0 && <p>No data</p>}

      {topSellers.map((item, i) => (
        <p key={i}>
          {item.name} — {item.totalQuantity} sold
        </p>
      ))}
    </div>
  );
}
