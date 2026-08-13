"use client";

import { CartProvider } from "@/lib/cartContext";
import Header from "@/components/Header";
import MenuSection from "@/components/MenuSection";
import CartDrawer from "@/components/CartDrawer";
import FloatingCart from "@/components/FloatingCart";

export default function Home() {
  return (
    <CartProvider>
      <Header />

      <section className="hero">
        <div className="hero-glow" />
        <div className="wrap hero-inner">
          <div>
            <span className="eyebrow">Grill Café · Soan Gardens, Islamabad</span>
            <h1 className="hero-title">
              Charcoal, char
              <br />
              <em>&amp; a little chaos.</em>
            </h1>
            <p className="hero-sub">
              Grill burgers, Chinese, pizza and panini in Soan Gardens Block D — order online below
              or call it in.
            </p>
            <div className="hero-meta">
              <div className="meta-chip">
                <span style={{ color: "var(--flame-400)" }}>🔥🔥🔥🔥</span> <strong>4.5</strong>&nbsp;· 645
                Google reviews
              </div>
              <div className="meta-chip mono">
                Rs 1,000–2,000 <span style={{ color: "var(--smoke-700)" }}>per person</span>
              </div>
              <div className="meta-chip">Dine-in · Takeout · Delivery</div>
            </div>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#menu">
                Order Online
              </a>
              <a
                className="btn btn-outline"
                href="https://www.google.com/maps/search/?api=1&query=Harry+%26+G+Grill+Cafe+Soan+Ave+Soan+Gardens+Block+D+Islamabad"
                target="_blank"
                rel="noopener"
              >
                Get Directions
              </a>
              <a className="btn btn-outline" href="tel:+923349552891">
                Call +92 334 9552891
              </a>
            </div>
            <div className="status-pill">
              <span className="status-dot" /> Open daily 4 PM – 3 AM{" "}
              <span style={{ color: "var(--smoke-700)" }}>— hours as listed on Foodpanda</span>
            </div>
          </div>
          <div>
            <div className="hero-gallery">
              <img
                className="hg-1"
                src="https://images.deliveryhero.io/image/fd-pk/products/4592766.jpg?width=500&height=700"
                alt="Mexican Beef Grilled Burger at Harry & G"
              />
              <img
                src="https://images.deliveryhero.io/image/fd-pk/products/3935069.jpg?width=400&height=300"
                alt="Panini Grilled Sandwich at Harry & G"
              />
              <img
                src="https://images.deliveryhero.io/image/fd-pk/products/45330196.jpg?width=400&height=300"
                alt="Chow Mein at Harry & G"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="info-strip">
        <div className="wrap">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Address</div>
              <div className="info-value">
                Soan Ave, Soan Gardens Block D
                <br />
                Islamabad, Pakistan
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Plus Code</div>
              <div className="info-value mono">H583+C7 Islamabad</div>
            </div>
            <div className="info-item">
              <div className="info-label">Phone</div>
              <div className="info-value">
                <a href="tel:+923349552891">+92 334 9552891</a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Service Options</div>
              <div className="service-tags">
                <span className="service-tag">Dine-in</span>
                <span className="service-tag">Takeout</span>
                <span className="service-tag">Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MenuSection />

      <section id="reviews" style={{ background: "var(--char-900)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="section-num">02 — Guest reviews</span>
              <h2 className="section-title">What Soan Gardens is saying</h2>
            </div>
            <p className="section-note">Real reviews, shown as posted.</p>
          </div>

          <div className="rating-hero">
            <div className="rating-block">
              <div className="rating-big">4.5</div>
              <div>
                <div style={{ color: "var(--flame-400)", fontSize: "1.2rem" }}>🔥🔥🔥🔥</div>
                <p style={{ color: "var(--smoke-500)", fontSize: "0.82rem" }}>645 Google Maps reviews</p>
              </div>
            </div>
            <div className="rating-divider" />
            <div className="rating-block">
              <div className="rating-big" style={{ fontSize: "2.4rem" }}>4.7</div>
              <div>
                <div style={{ color: "var(--flame-400)", fontSize: "0.95rem" }}>🔥🔥🔥🔥🔥</div>
                <p style={{ color: "var(--smoke-500)", fontSize: "0.82rem" }}>2,000+ Foodpanda ratings</p>
              </div>
            </div>
          </div>

          <div className="review-grid">
            <div className="review-card">
              <div className="review-top">
                <div className="avatar">SS</div>
                <div>
                  <div className="review-name">Sehar Sultana</div>
                  <div className="review-meta">Local Guide · 8 reviews · Google</div>
                </div>
              </div>
              <div className="review-flames">🔥🔥🔥🔥</div>
              <p className="review-body">
                Visited about a year back — the food and atmosphere stood out, though she did spot a
                few uninvited guests scurrying around the place. Told with a laugh, not a warning.
              </p>
              <div className="review-tag">GOOGLE REVIEW</div>
            </div>
            <div className="review-card">
              <div className="review-top">
                <div className="avatar">RK</div>
                <div>
                  <div className="review-name">Rakia Khan</div>
                  <div className="review-meta">3 reviews · Google</div>
                </div>
              </div>
              <div className="review-flames">🔥🔥🔥🔥🔥</div>
              <p className="review-body">
                Calls it the best restaurant in Soan Gardens — delicious food, great ambiance, and
                staff she describes as genuinely friendly.
              </p>
              <div className="review-tag">GOOGLE REVIEW</div>
            </div>
            <div className="review-card">
              <div className="review-top">
                <div className="avatar">S</div>
                <div>
                  <div className="review-name">Syed</div>
                  <div className="review-meta">Foodpanda · verified order</div>
                </div>
              </div>
              <div className="review-flames">🔥🔥🔥🔥🔥</div>
              <p className="review-body">
                A recent delivery review calling it value for money, with the beef burgers singled
                out as amazing.
              </p>
              <div className="review-tag">FOODPANDA REVIEW</div>
            </div>
          </div>
        </div>
      </section>

      <section id="location">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="section-num">03 — Find us</span>
              <h2 className="section-title">Soan Gardens, Block D</h2>
            </div>
          </div>
          <div className="location-layout">
            <div className="map-frame">
              <iframe
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Harry+%26+G+Grill+Cafe+Soan+Ave+Soan+Gardens+Block+D+Islamabad+Pakistan&output=embed"
              />
            </div>
            <div>
              <div className="info-item" style={{ padding: "0 0 20px", border: "none" }}>
                <div className="info-label">Address</div>
                <div className="info-value">Soan Ave, Soan Gardens Block D, Islamabad, Pakistan</div>
              </div>
              <div className="info-item" style={{ padding: "0 0 20px", border: "none" }}>
                <div className="info-label">Hours</div>
                <div className="info-value">4:00 PM – 3:00 AM, daily</div>
              </div>
              <div className="hours-note">
                Listed hours come from the Foodpanda listing — call ahead to confirm on holidays.
              </div>
              <div className="hero-actions" style={{ marginTop: 20 }}>
                <a
                  className="btn btn-primary"
                  href="https://www.google.com/maps/search/?api=1&query=Harry+%26+G+Grill+Cafe+Soan+Ave+Soan+Gardens+Block+D+Islamabad"
                  target="_blank"
                  rel="noopener"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Harry &amp; G</div>
              <p style={{ color: "var(--smoke-700)", fontSize: "0.85rem", marginTop: 8, maxWidth: 220 }}>
                Grill café · Soan Gardens Block D, Islamabad.
              </p>
            </div>
            <div className="footer-col">
              <div className="info-label" style={{ marginBottom: 14 }}>
                Visit
              </div>
              <a href="tel:+923349552891">+92 334 9552891</a>
              <a href="#menu">Order Online</a>
            </div>
            <div className="footer-col">
              <div className="info-label" style={{ marginBottom: 14 }}>
                Hours
              </div>
              <span>4:00 PM – 3:00 AM daily</span>
            </div>
          </div>
          <p className="footer-note">
            Online payment isn't live yet — Cash on Delivery and Card on Delivery are available now.
            See the admin README for how to add a real payment gateway.
          </p>
          <div className="footer-bottom">
            <span>© Harry &amp; G Grill Café — Soan Gardens, Islamabad</span>
          </div>
        </div>
      </footer>

      <FloatingCart />
      <CartDrawer />
    </CartProvider>
  );
}
