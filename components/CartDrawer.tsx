"use client";

import { useState } from "react";
import { useCart } from "@/lib/cartContext";

function fmt(n: number) {
  return "Rs " + n.toLocaleString();
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923349552891";

export default function CartDrawer() {
  const {
    cart,
    addItem,
    decItem,
    clearCart,
    count,
    total,
    drawerOpen,
    closeDrawer,
    step,
    setStep,
    lastOrder,
    setLastOrder
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderType, setOrderType] = useState<"Delivery" | "Takeout" | "Dine-in">("Delivery");
  const [paymentMethod, setPaymentMethod] = useState<"Cash on Delivery" | "Card on Delivery">(
    "Cash on Delivery"
  );
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function resetFormState() {
    setName("");
    setPhone("");
    setAddress("");
    setOrderType("Delivery");
    setPaymentMethod("Cash on Delivery");
    setNotes("");
    setErrors({});
    setSubmitError(null);
  }

  function validateDetails() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!phone.trim() || phone.trim().length < 10) next.phone = "Please enter a valid phone number.";
    if (orderType === "Delivery" && !address.trim()) next.address = "Address is required for delivery.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function placeOrder() {
    if (!validateDetails()) return;
    setSubmitting(true);
    setSubmitError(null);

    const items = Object.values(cart).map((c) => ({ name: c.name, price: c.price, qty: c.qty }));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          name,
          phone,
          address,
          orderType,
          paymentMethod,
          notes
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong placing your order. Please try again.");
        setSubmitting(false);
        return;
      }

      setLastOrder({ orderNumber: data.orderNumber, total: data.subtotal });
      clearCart();
      setStep("confirm");
    } catch (err) {
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function sendWhatsAppBackup() {
    if (!lastOrder) return;
    const msg =
      `Hi Harry & G! Confirming my order ${lastOrder.orderNumber}\n` +
      `Total: ${fmt(lastOrder.total)}\n` +
      `Name: ${name}\nPhone: ${phone}\n` +
      (orderType === "Delivery" ? `Address: ${address}\n` : "") +
      `Payment: ${paymentMethod}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function handleDone() {
    closeDrawer();
    resetFormState();
    setStep("cart");
    setLastOrder(null);
  }

  const stepIndex = step === "cart" ? 0 : step === "details" ? 1 : 2;

  return (
    <>
      <div
        className={"drawer-overlay" + (drawerOpen ? " open" : "")}
        onClick={() => {
          if (step !== "confirm") closeDrawer();
        }}
      />
      <div className={"drawer" + (drawerOpen ? " open" : "")} aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <div className="drawer-head-top">
            <h3>{step === "confirm" ? "Order Placed" : "Your Order"}</h3>
            <button
              className="drawer-close"
              type="button"
              onClick={() => {
                if (step === "confirm") handleDone();
                else closeDrawer();
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="stepper">
            <div className={"step-dot" + (stepIndex >= 0 ? " active" : "")} />
            <div className={"step-dot" + (stepIndex >= 1 ? " active" : "")} />
            <div className={"step-dot" + (stepIndex >= 2 ? " active" : "")} />
          </div>
          <div className="step-label">
            {step === "cart" && "Step 1 — Review cart"}
            {step === "details" && "Step 2 — Delivery details & payment"}
            {step === "confirm" && "Step 3 — Confirmed"}
          </div>
        </div>

        {/* Everything scrollable lives in this one panel — this is what fixes the
            "checkout pushes the page down" bug: the form can never grow past the
            viewport and drag the whole page with it, because only this element scrolls. */}
        <div className="drawer-body">
          {step === "cart" && (
            <>
              {count === 0 ? (
                <div className="cart-empty">
                  Your cart is empty.
                  <br />
                  Add something delicious from the menu.
                </div>
              ) : (
                Object.values(cart).map((c) => (
                  <div className="cart-item" key={c.id}>
                    <div>
                      <div className="cart-item-name">{c.name}</div>
                      <div className="cart-item-price">
                        {fmt(c.price)} × {c.qty}
                      </div>
                    </div>
                    <div className="qty-ctrl">
                      <button type="button" onClick={() => decItem(c.id)}>
                        −
                      </button>
                      <span>{c.qty}</span>
                      <button type="button" onClick={() => addItem(c.id, c.name, c.price)}>
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {step === "details" && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>Your Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ahmed Khan" />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03XX XXXXXXX" />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
              <div className="field">
                <label>Order Type</label>
                <div className="option-row">
                  {(["Delivery", "Takeout", "Dine-in"] as const).map((t) => (
                    <div
                      key={t}
                      className={"option-pill" + (orderType === t ? " active" : "")}
                      onClick={() => setOrderType(t)}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              {orderType === "Delivery" && (
                <div className="field">
                  <label>Delivery Address</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / street, Soan Gardens..."
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>
              )}
              <div className="field">
                <label>Payment Method</label>
                <div className="option-row">
                  <div
                    className={"option-pill" + (paymentMethod === "Cash on Delivery" ? " active" : "")}
                    onClick={() => setPaymentMethod("Cash on Delivery")}
                  >
                    Cash on Delivery
                  </div>
                  <div
                    className={"option-pill" + (paymentMethod === "Card on Delivery" ? " active" : "")}
                    onClick={() => setPaymentMethod("Card on Delivery")}
                  >
                    Card on Delivery
                  </div>
                  <div className="option-pill disabled" title="Coming soon — payment gateway not yet connected">
                    Online Payment (Soon)
                  </div>
                </div>
              </div>
              <div className="field">
                <label>Notes (optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Less spicy, no onions, etc."
                />
              </div>
              {submitError && <p className="field-error">{submitError}</p>}
            </form>
          )}

          {step === "confirm" && lastOrder && (
            <div className="confirm-screen">
              <div className="confirm-icon">✓</div>
              <p>Your order has been placed and saved.</p>
              <div className="order-number">{lastOrder.orderNumber}</div>
              <p className="order-note">
                Save this order number — you can look it up any time with "Track Order" in the menu
                using this number and your phone number.
              </p>
              <button className="btn btn-outline btn-sm" type="button" onClick={sendWhatsAppBackup} style={{ marginTop: 16 }}>
                Also send to WhatsApp (optional)
              </button>
            </div>
          )}
        </div>

        <div className="drawer-foot">
          {step === "cart" && (
            <>
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>{fmt(total)}</strong>
              </div>
              <button
                className="btn btn-primary full-btn"
                type="button"
                disabled={count === 0}
                onClick={() => setStep("details")}
              >
                Continue to Details
              </button>
            </>
          )}
          {step === "details" && (
            <>
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>{fmt(total)}</strong>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline" type="button" onClick={() => setStep("cart")}>
                  Back
                </button>
                <button
                  className="btn btn-primary full-btn"
                  type="button"
                  disabled={submitting}
                  onClick={placeOrder}
                >
                  {submitting ? "Placing order…" : "Place Order"}
                </button>
              </div>
            </>
          )}
          {step === "confirm" && (
            <button className="btn btn-primary full-btn" type="button" onClick={handleDone}>
              Done
            </button>
          )}
        </div>
      </div>
    </>
  );
}
