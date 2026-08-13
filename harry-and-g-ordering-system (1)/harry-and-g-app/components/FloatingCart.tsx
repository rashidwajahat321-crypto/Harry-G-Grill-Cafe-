"use client";

import { useCart } from "@/lib/cartContext";

function fmt(n: number) {
  return "Rs " + n.toLocaleString();
}

export default function FloatingCart() {
  const { count, total, openDrawer } = useCart();
  return (
    <div className={"floating-cart" + (count > 0 ? " show" : "")} onClick={openDrawer}>
      <span>{count} {count === 1 ? "item" : "items"}</span>
      <span className="mono">{fmt(total)}</span>
    </div>
  );
}
