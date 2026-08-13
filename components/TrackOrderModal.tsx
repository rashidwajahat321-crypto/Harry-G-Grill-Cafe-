"use client";

import { useEffect, useState } from "react";

function fmt(n: number) {
  return "Rs " + n.toLocaleString();
}

type OrderResult = {
  order_number: string;
  status: string;
  order_type: string;
  payment_method: string;
  subtotal: number;
  created_at: string;
  order_items: { product_name: string; unit_price: number; quantity: number; line_total: number }[];
};

export default function TrackOrderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      setResult(null);
      setError(null);
    }
  }, [open]);

  async function lookup() {
    if (!orderNumber.trim() || !phone.trim()) {
      setError("Enter both your order number and phone number.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `/api/orders/track?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Order not found.");
        return;
      }
      setResult(data.order);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={"modal-overlay" + (open ? " open" : "")} onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Track Your Order</h3>
          <button className="drawer-close" type="button" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {!result && (
            <>
              <div className="field">
                <label>Order Number</label>
                <input
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="HG-XXXXX-XXX"
                />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03XX XXXXXXX" />
              </div>
              {error && <p className="field-error">{error}</p>}
              <button className="btn btn-primary full-btn" type="button" onClick={lookup} disabled={loading}>
                {loading ? "Looking up…" : "Track Order"}
              </button>
              <p className="order-note">
                Status is updated by Harry & G's staff as your order moves through the kitchen — it's
                not live GPS tracking, just an up-to-date kitchen status.
              </p>
            </>
          )}

          {result && (
            <div>
              <p className="order-number" style={{ marginTop: 0 }}>
                {result.order_number}
              </p>
              <span className={`status-badge status-${result.status}`}>{result.status}</span>
              <div style={{ marginTop: 18 }}>
                {result.order_items.map((it, idx) => (
                  <div className="cart-item" key={idx}>
                    <div>
                      <div className="cart-item-name">{it.product_name}</div>
                      <div className="cart-item-price">
                        {fmt(it.unit_price)} × {it.quantity}
                      </div>
                    </div>
                    <div className="mono">{fmt(it.line_total)}</div>
                  </div>
                ))}
              </div>
              <div className="subtotal-row" style={{ marginTop: 14 }}>
                <span>Total</span>
                <strong>{fmt(result.subtotal)}</strong>
              </div>
              <p className="order-note">
                {result.order_type} · {result.payment_method}
              </p>
              <button
                className="btn btn-outline full-btn"
                type="button"
                onClick={() => setResult(null)}
                style={{ marginTop: 16 }}
              >
                Look up another order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
