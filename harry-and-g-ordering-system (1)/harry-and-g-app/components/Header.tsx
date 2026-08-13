"use client";

import { useState } from "react";
import { useCart } from "@/lib/cartContext";
import TrackOrderModal from "./TrackOrderModal";

export default function Header() {
  const { count, openDrawer } = useCart();
  const [trackOpen, setTrackOpen] = useState(false);

  return (
    <>
      <header className="site-nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="brand-mark">H&amp;G</span> Harry &amp; G
          </div>
          <nav className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#reviews">Reviews</a>
            <a href="#location">Location</a>
          </nav>
          <div className="nav-cta">
            <button className="track-btn" type="button" onClick={() => setTrackOpen(true)}>
              📦 Track Order
            </button>
            <button className="cart-btn" type="button" onClick={openDrawer}>
              🛒 Order <span className="cart-count">{count}</span>
            </button>
          </div>
        </div>
      </header>
      <TrackOrderModal open={trackOpen} onClose={() => setTrackOpen(false)} />
    </>
  );
}
