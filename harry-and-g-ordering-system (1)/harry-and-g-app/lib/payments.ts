/**
 * Payment gateway integration point.
 *
 * Nothing here is wired to a real processor yet — no credentials exist,
 * fake or otherwise. When you're ready to accept real online payments
 * (JazzCash, Easypaisa, or a card processor like Stripe), this is where
 * that call belongs:
 *
 *   1. Sign up for a merchant account with the gateway of your choice.
 *   2. Add their SDK/API credentials as server-only env vars (never
 *      NEXT_PUBLIC_*, since they must not reach the browser).
 *   3. Implement createPaymentIntent() below to call their API and
 *      return a redirect URL or client secret.
 *   4. In app/api/orders/route.ts, when payment_method === "Online Payment",
 *      call createPaymentIntent() after the order row is inserted, store
 *      the returned reference on the order, and return the redirect URL
 *      to the frontend instead of immediately confirming the order.
 *   5. Add a webhook route (e.g. app/api/payments/webhook/route.ts) that
 *      the gateway calls on success/failure, and update order.status
 *      (and a new payment_status column) from there — never trust the
 *      client redirect alone to mark an order as paid.
 *
 * Until that's built, "Online Payment" stays disabled in the checkout UI
 * (see components/CheckoutForm.tsx) and only Cash on Delivery / Card on
 * Delivery are offered.
 */

export type PaymentIntentResult = {
  redirectUrl: string;
  reference: string;
};

export async function createPaymentIntent(_orderId: string, _amount: number): Promise<PaymentIntentResult> {
  throw new Error(
    "Online payment gateway is not configured yet. Wire up a real processor here before enabling this option."
  );
}
