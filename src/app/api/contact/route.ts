import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    const contactEmail = process.env.CONTACT_TO_EMAIL || process.env.ORDER_TO_EMAIL;
    if (contactEmail) {
      const text = [
        `Contact form submission`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        ``,
        data.message,
      ].join("\n");
      const sent = await sendMail({
        to: contactEmail,
        subject: `[CENVORA] Contact: ${data.name}`,
        text,
      });
      if (!sent) console.warn("Contact saved but email not sent.");
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
