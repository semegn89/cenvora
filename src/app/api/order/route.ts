import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/email";

const orderSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  vatOrCui: z.string().optional(),
  deliveryAddress: z.string().min(1),
  comment: z.string().optional(),
  consentAccepted: z.literal(true),
  items: z.array(
    z.object({
      productId: z.string(),
      qty: z.number().int().positive(),
      priceAtOrder: z.number().positive(),
    })
  ).min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const count = await prisma.order.count({
      where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    });
    const orderNumber = `ORD-${today}-${String(count + 1).padStart(4, "0")}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: "NEW",
        companyName: data.companyName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        vatOrCui: data.vatOrCui,
        deliveryAddress: data.deliveryAddress,
        comment: data.comment,
        consentAccepted: data.consentAccepted,
        items: {
          create: data.items.map((i) => ({
            productId: i.productId,
            qty: i.qty,
            priceAtOrder: i.priceAtOrder,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    const orderEmail = process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
    if (orderEmail) {
      const text = [
        `New order: ${orderNumber}`,
        `Company: ${order.companyName}`,
        `Contact: ${order.contactName}, ${order.email}, ${order.phone}`,
        order.vatOrCui ? `CUI/VAT: ${order.vatOrCui}` : "",
        `Delivery: ${order.deliveryAddress}`,
        order.comment ? `Comment: ${order.comment}` : "",
        "",
        "Items:",
        ...order.items.map(
          (i) => `- ${i.product.name} x ${i.qty} @ ${i.priceAtOrder} = ${i.qty * i.priceAtOrder} EUR`
        ),
        "",
        `Total: ${order.items.reduce((s, i) => s + i.qty * i.priceAtOrder, 0).toFixed(2)} EUR`,
      ].filter(Boolean).join("\n");
      const sent = await sendMail({
        to: orderEmail,
        subject: `[CENVORA] Order ${orderNumber}`,
        text,
      });
      if (!sent) console.warn("Order saved but email not sent (SMTP not configured or failed).");
    }

    return NextResponse.json({ orderNumber });
  } catch (e) {
    console.error("Order API error:", e);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
