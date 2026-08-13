import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type IncomingItem = {
  name: string;
  price: number;
  qty: number;
};

type OrderPayload = {
  items: IncomingItem[];
  name: string;
  phone: string;
  address: string;
  orderType: "Delivery" | "Takeout" | "Dine-in";
  paymentMethod: "Cash on Delivery" | "Card on Delivery" | "Online Payment";
  notes?: string;
};

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 900 + 100); // 3-digit
  return `HG-${stamp}-${rand}`;
}

export async function POST(req: Request) {
  let body: OrderPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { items, name, phone, address, orderType, paymentMethod, notes } = body ?? {};

  // ---- Validation ----
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }
  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }
  if (orderType === "Delivery" && !address?.trim()) {
    return NextResponse.json({ error: "Address is required for delivery orders." }, { status: 400 });
  }
  const validPaymentMethods = ["Cash on Delivery", "Card on Delivery", "Online Payment"];
  if (!validPaymentMethods.includes(paymentMethod)) {
    return NextResponse.json({ error: "Invalid payment method." }, { status: 400 });
  }
  if (paymentMethod === "Online Payment") {
    // Gateway isn't wired up yet — see lib/payments.ts. Fail clearly rather than
    // silently accepting an order the café has no way to actually charge.
    return NextResponse.json(
      { error: "Online payment isn't available yet. Please choose Cash on Delivery or Card on Delivery." },
      { status: 400 }
    );
  }
  for (const item of items) {
    if (!item.name || typeof item.price !== "number" || typeof item.qty !== "number" || item.qty <= 0) {
      return NextResponse.json({ error: "Invalid item in cart." }, { status: 400 });
    }
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const orderNumber = generateOrderNumber();

  const supabase = getSupabaseServerClient();

  try {
    // 1. Upsert customer by phone
    const { data: customer, error: customerErr } = await supabase
      .from("customers")
      .upsert(
        { name: name.trim(), phone: phone.trim(), address: address?.trim() || null },
        { onConflict: "phone" }
      )
      .select()
      .single();

    if (customerErr || !customer) {
      console.error("Customer upsert failed:", customerErr);
      return NextResponse.json({ error: "Could not save customer details." }, { status: 500 });
    }

    // 2. Insert order
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customer.id,
        order_type: orderType,
        payment_method: paymentMethod,
        status: "New",
        subtotal,
        notes: notes?.trim() || null
      })
      .select()
      .single();

    if (orderErr || !order) {
      console.error("Order insert failed:", orderErr);
      return NextResponse.json({ error: "Could not create order." }, { status: 500 });
    }

    // 3. Insert order items
    const itemRows = items.map((i) => ({
      order_id: order.id,
      product_name: i.name,
      unit_price: i.price,
      quantity: i.qty,
      line_total: i.price * i.qty
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(itemRows);
    if (itemsErr) {
      console.error("Order items insert failed:", itemsErr);
      // Order row exists but items failed — clean up so we don't leave an empty order.
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json({ error: "Could not save order items." }, { status: 500 });
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      status: order.status,
      subtotal
    });
  } catch (err) {
    console.error("Unexpected error placing order:", err);
    return NextResponse.json({ error: "Something went wrong placing the order." }, { status: 500 });
  }
}
