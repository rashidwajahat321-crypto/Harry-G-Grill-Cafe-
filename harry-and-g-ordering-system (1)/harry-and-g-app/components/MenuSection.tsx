"use client";

import { useState } from "react";
import { MENU, IMG_BASE } from "@/lib/menu";
import { useCart } from "@/lib/cartContext";

function fmt(n: number) {
  return "Rs " + n.toLocaleString();
}

export default function MenuSection() {
  const [category, setCategory] = useState("Popular");
  const { cart, addItem, decItem } = useCart();
  const categories = Object.keys(MENU);

  return (
    <section id="menu">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-num">01 — Order online</span>
            <h2 className="section-title">Full menu, real prices</h2>
          </div>
          <p className="section-note">
            Every item and price below matches Harry & G's live menu. Add what you want, then
            check out below — cash or card on delivery.
          </p>
        </div>

        <div className="menu-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={"menu-tab" + (cat === category ? " active" : "")}
              onClick={() => setCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {MENU[category].map((item) => {
            const qty = cart[item.id]?.qty ?? 0;
            return (
              <div className="menu-card" key={item.id}>
                <div className="menu-card-img-wrap">
                  {item.popular && <span className="popular-badge">POPULAR</span>}
                  {/* Plain <img> (not next/image) keeps this identical across environments without extra image-loader config */}
                  <img
                    className="menu-card-img"
                    src={`${IMG_BASE}${item.img}.jpg?width=300&height=200`}
                    alt={item.name}
                    loading="lazy"
                  />
                </div>
                <div className="menu-card-body">
                  <h4>{item.name}</h4>
                  <p className="desc">{item.desc}</p>
                  <div className="menu-card-foot">
                    <span className="menu-price">{fmt(item.price)}</span>
                    {qty === 0 ? (
                      <button
                        className="add-btn"
                        type="button"
                        onClick={() => addItem(item.id, item.name, item.price)}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="qty-ctrl">
                        <button type="button" onClick={() => decItem(item.id)}>
                          −
                        </button>
                        <span>{qty}</span>
                        <button type="button" onClick={() => addItem(item.id, item.name, item.price)}>
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
