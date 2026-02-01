import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Analytics() {
  const [summary, setSummary] = useState(null);
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    api.get("/analytics/summary")
      .then(res => setSummary(res.data))
      .catch(console.error);

    api.get("/analytics/top-sellers")
      .then(res => setTopSellers(res.data))
      .catch(console.error);
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div>
      <h2>Analytics</h2>

      <p>Total Orders: {summary.totalOrders}</p>
      <p>Total Revenue: ₹{summary.totalRevenue}</p>

      <h3>Top Sellers</h3>
      {topSellers.map((item, i) => (
        <p key={i}>
          {item.name} — {item.totalQuantity} sold
        </p>
      ))}
    </div>
  );
}
