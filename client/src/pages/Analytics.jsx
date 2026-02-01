import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Analytics() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api
      .get("/analytics/summary")
      .then((res) => setSummary(res.data))
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
