import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

/**
 * Public order tracking lookup. Requires BOTH the order number and the
 * phone number used at checkout, so a customer can only look up their
 * own order rather than browsing everyone's — this is why it goes
 * through a server route with the service_role key instead of a public
 * RLS policy on the orders table.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("orderNumber")?.trim();
  const phone = searchParams.get("phone")?.trim();

  if (!orderNumber || !phone) {
    return NextResponse.json({ error: "Order number and phone are required." }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      order_number,
      status,
      order_type,
      payment_method,
      subtotal,
      created_at,
      customers!inner(phone),
      order_items ( product_name, unit_price, quantity, line_total )
    `
    )
    .eq("order_number", orderNumber)
    .eq("customers.phone", phone)
    .maybeSingle();

  if (error) {
    console.error("Order tracking lookup failed:", error);
    return NextResponse.json({ error: "Something went wrong looking up the order." }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json({ error: "No order found with that order number and phone." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
