import React from "react";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";

const STATUSES = ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"];

const STATUS_COLORS = {
  Pending: { bg: "#FEF3C7", text: "#B45309" },
  Preparing: { bg: "#DBEAFE", text: "#1D4ED8" },
  Ready: { bg: "#D1FAE5", text: "#047857" },
  Delivered: { bg: "#F3F4F6", text: "#4B5563" },
  Cancelled: { bg: "#FEE2E2", text: "#B91C1C" },
};

export default function OrderRow({ order, onStatusChange }) {
  const { addToast } = useToast();

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await api.patch(`/orders/${order._id}/status`, { status: newStatus });
      onStatusChange(order._id, newStatus);
      addToast(
        `Order #${order._id.slice(-6)} updated to "${newStatus}".`,
        "success",
      );
    } catch {
      addToast("Failed to update order status.", "error");
    }
  };

  const createdDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const createdTime = new Date(order.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.Delivered;

  return (
    <tr
      style={styles.row}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <td style={styles.cell}>
        <span style={styles.orderId}>#{order._id.slice(-6)}</span>
      </td>

      <td style={styles.cell}>
        <div>
          <div style={styles.customer}>{order.customerName}</div>
          {order.tableNumber && (
            <div style={styles.subText}>Table {order.tableNumber}</div>
          )}
        </div>
      </td>

      <td style={styles.cell}>
        {order.items.map((it, i) => (
          <div key={i} style={styles.item}>
            {it.quantity}× {it.menuItem?.name || "Unknown"}
          </div>
        ))}
      </td>

      <td style={styles.cell}>
        <span style={styles.total}>${order.totalAmount.toFixed(2)}</span>
      </td>

      <td style={styles.cell}>
        <select
          value={order.status}
          onChange={handleStatusChange}
          style={{
            ...styles.status,
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>

      <td style={styles.cell}>
        <div style={styles.date}>{createdDate}</div>
        <div style={styles.time}>{createdTime}</div>
      </td>
    </tr>
  );
}

const styles = {
  row: {
    borderBottom: "1px solid #F3F4F6",
    transition: "background 0.15s ease",
  },
  cell: {
    padding: "12px 16px",
    verticalAlign: "top",
  },
  orderId: {
    fontSize: 12,
    fontFamily: "monospace",
    color: "#6B7280",
  },
  customer: {
    fontSize: 14,
    fontWeight: 500,
    color: "#1F2937",
  },
  subText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  item: {
    fontSize: 12,
    color: "#4B5563",
  },
  total: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
  },
  status: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    outline: "none",
  },
  date: {
    fontSize: 12,
    color: "#6B7280",
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
  },
};
