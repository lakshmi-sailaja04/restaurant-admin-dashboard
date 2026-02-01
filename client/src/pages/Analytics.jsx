import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";

export default function Analytics() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/analytics/summary`)
      .then(res => res.json())
      .then(setSummary)
      .catch(() => alert("Analytics error"));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div>
      <h2>Analytics</h2>
      <p>Total Orders: {summary.totalOrders}</p>
      <p>Total Revenue: ₹{summary.totalRevenue}</p>
    </div>
  );
}
