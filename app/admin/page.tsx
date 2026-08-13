"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

type OrderRow = {
  id: string;
  order_number: string;
  status: "New" | "Confirmed" | "Preparing" | "Ready" | "Delivered";
  order_type: string;
  payment_method: string;
  subtotal: number;
  notes: string | null;
  created_at: string;
  customers: { name: string; phone: string; address: string | null } | null;
  order_items: { product_name: string; quantity: number; unit_price: number }[];
};

const STATUSES: OrderRow["status"][] = ["New", "Confirmed", "Preparing", "Ready", "Delivered"];

function fmt(n: number) {
  return "Rs " + n.toLocaleString();
}

export default function AdminDashboard() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | OrderRow["status"]>("All");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
        return;
      }
      setUserEmail(data.session.user.email ?? null);
      setCheckingAuth(false);
    });
  }, [router]);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabaseBrowser
      .from("orders")
      .select(
        `
        id, order_number, status, order_type, payment_method, subtotal, notes, created_at,
        customers ( name, phone, address ),
        order_items ( product_name, quantity, unit_price )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setOrders((data as unknown as OrderRow[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!checkingAuth) {
      loadOrders();
      const interval = setInterval(loadOrders, 20000); // light polling for new orders
      return () => clearInterval(interval);
    }
  }, [checkingAuth, loadOrders]);

  async function updateStatus(orderId: string, status: OrderRow["status"]) {
    const { error } = await supabaseBrowser.from("orders").update({ status }).eq("id", orderId);
    if (error) {
      alert("Could not update status: " + error.message);
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  }

  async function handleLogout() {
    await supabaseBrowser.auth.signOut();
    router.push("/admin/login");
  }

  if (checkingAuth) {
    return (
      <div className="admin-shell">
        <div className="admin-main">Checking session…</div>
      </div>
    );
  }

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div className="brand">
          <span className="brand-mark">H&amp;G</span> Admin
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="mono" style={{ fontSize: "0.8rem", color: "var(--smoke-500)" }}>
            {userEmail}
          </span>
          <button className="btn btn-outline btn-sm" onClick={handleLogout} type="button">
            Log out
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 className="section-title" style={{ fontSize: "1.6rem" }}>
            Incoming Orders
          </h2>
          <button className="btn btn-outline btn-sm" onClick={loadOrders} type="button">
            Refresh
          </button>
        </div>

        <div className="admin-filter-tabs">
          {(["All", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              className={"menu-tab" + (filter === s ? " active" : "")}
              type="button"
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}
        {loading && orders.length === 0 && <p style={{ color: "var(--smoke-500)" }}>Loading orders…</p>}
        {!loading && filtered.length === 0 && (
          <p style={{ color: "var(--smoke-700)" }}>No orders in this view yet.</p>
        )}

        {filtered.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Type</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Placed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id}>
                    <td className="mono">{o.order_number}</td>
                    <td>
                      {o.customers?.name}
                      <br />
                      <span className="mono" style={{ fontSize: "0.75rem", color: "var(--smoke-500)" }}>
                        {o.customers?.phone}
                      </span>
                      {o.customers?.address && (
                        <>
                          <br />
                          <span style={{ fontSize: "0.75rem", color: "var(--smoke-700)" }}>
                            {o.customers.address}
                          </span>
                        </>
                      )}
                    </td>
                    <td>
                      {o.order_items.map((it, idx) => (
                        <div key={idx} style={{ fontSize: "0.8rem" }}>
                          {it.quantity}× {it.product_name}
                        </div>
                      ))}
                    </td>
                    <td>{o.order_type}</td>
                    <td>{o.payment_method}</td>
                    <td className="mono">{fmt(o.subtotal)}</td>
                    <td style={{ fontSize: "0.78rem", color: "var(--smoke-500)" }}>
                      {new Date(o.created_at).toLocaleString()}
                    </td>
                    <td>
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value as OrderRow["status"])}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
