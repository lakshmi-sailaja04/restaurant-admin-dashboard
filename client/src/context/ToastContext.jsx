import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div style={styles.container}>
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";

          return (
            <div
              key={toast.id}
              style={{
                ...styles.toast,
                ...(isSuccess ? styles.success : styles.error),
              }}
            >
              {isSuccess ? (
                <CheckCircle size={18} style={styles.iconSuccess} />
              ) : (
                <XCircle size={18} style={styles.iconError} />
              )}

              <p style={styles.message}>{toast.message}</p>

              <button
                onClick={() => removeToast(toast.id)}
                style={styles.closeBtn}
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}


const styles = {
  container: {
    position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: 360,
  },
  toast: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "12px 16px",
    borderRadius: 12,
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    fontSize: 14,
    fontFamily: "sans-serif",
    animation: "slideIn 0.25s ease",
  },
  success: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #A7F3D0",
    color: "#065F46",
  },
  error: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #FECACA",
    color: "#7F1D1D",
  },
  iconSuccess: {
    color: "#10B981",
    marginTop: 2,
    flexShrink: 0,
  },
  iconError: {
    color: "#EF4444",
    marginTop: 2,
    flexShrink: 0,
  },
  message: {
    flex: 1,
    margin: 0,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#9CA3AF",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  },
};
