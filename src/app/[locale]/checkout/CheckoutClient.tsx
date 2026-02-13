"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/contexts/CartContext";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const schema = z.object({
  companyName: z.string().min(1, "Required"),
  contactName: z.string().min(1, "Required"),
  email: z.string().email(),
  phone: z.string().min(1, "Required"),
  vatOrCui: z.string().optional(),
  deliveryAddress: z.string().min(1, "Required"),
  comment: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, "Consent required"),
});

type FormData = z.infer<typeof schema>;

export function CheckoutClient({ locale }: { locale: Locale }) {
  const { items, updateQty, remove, clear, subtotal } = useCart();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const text = t[locale].checkout;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: data.companyName,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          vatOrCui: data.vatOrCui || undefined,
          deliveryAddress: data.deliveryAddress,
          comment: data.comment || undefined,
          consentAccepted: data.consent,
          items: items.map((i) => ({ productId: i.productId, qty: i.qty, priceAtOrder: i.price })),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Order failed");
      setOrderNumber(json.orderNumber);
      clear();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  };

  if (orderNumber) {
    return (
      <div className="mt-10 card max-w-lg">
        <h2 className="text-xl font-semibold text-[var(--primary)]">{text.successTitle}</h2>
        <p className="mt-4">{text.successMessage}</p>
        <p className="mt-2 font-mono font-bold">{orderNumber}</p>
        <Link href={`/${locale}/catalog`} className="btn btn-primary mt-6 inline-block">
          {text.backToCatalog}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 card max-w-lg">
        <p className="text-[var(--muted)]">{text.cartEmpty}</p>
        <Link href={`/${locale}/catalog`} className="btn btn-primary mt-4 inline-block">
          {text.backToCatalog}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold">{text.cart}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2">{text.product}</th>
                <th className="text-left py-2">{text.qty}</th>
                <th className="text-right py-2">{text.price}</th>
                <th className="text-right py-2">{text.subtotal}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.productId} className="border-b border-[var(--border)]">
                  <td className="py-2">{i.name}</td>
                  <td className="py-2">
                    <input
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={(e) => updateQty(i.productId, parseInt(e.target.value, 10) || 1)}
                      className="input w-20 py-1"
                    />
                  </td>
                  <td className="py-2 text-right">{i.price} EUR</td>
                  <td className="py-2 text-right">{i.price * i.qty} EUR</td>
                  <td className="py-2">
                    <button type="button" onClick={() => remove(i.productId)} className="text-red-600 text-xs">
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-semibold">
          {text.total}: {subtotal.toFixed(2)} EUR
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="block text-sm font-medium mb-1">{text.formCompany}</label>
            <input {...register("companyName")} className="input" />
            {errors.companyName && <p className="text-xs text-red-600">{errors.companyName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{text.formName}</label>
            <input {...register("contactName")} className="input" />
            {errors.contactName && <p className="text-xs text-red-600">{errors.contactName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{text.formEmail}</label>
            <input type="email" {...register("email")} className="input" />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{text.formPhone}</label>
            <input {...register("phone")} className="input" />
            {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{text.formVat}</label>
            <input {...register("vatOrCui")} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{text.formAddress}</label>
            <textarea {...register("deliveryAddress")} className="input min-h-[80px]" />
            {errors.deliveryAddress && <p className="text-xs text-red-600">{errors.deliveryAddress.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{text.formComment}</label>
            <textarea {...register("comment")} className="input min-h-[60px]" />
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" {...register("consent")} className="mt-1 rounded" />
            <label className="text-sm">
              {text.consentLabel}{" "}
              <Link href={`/${locale}/legal`} className="underline hover:text-[var(--primary)]">
                {t[locale].legal.privacy}
              </Link>
              {" / "}
              <Link href={`/${locale}/legal`} className="underline hover:text-[var(--primary)]">
                {t[locale].legal.cookies}
              </Link>
            </label>
          </div>
          {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
            {isSubmitting ? t[locale].common.loading : text.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
