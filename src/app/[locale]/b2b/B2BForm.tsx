"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const schema = z.object({
  company: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  vat: z.string().optional(),
  message: z.string().min(1),
  consent: z.literal(true, { error: "Required" }),
});

type FormData = z.infer<typeof schema>;

export function B2BForm({ locale }: { locale: Locale }) {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const text = t[locale].b2b;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const body = {
        name: data.name,
        email: data.email,
        message: `[B2B] Companie: ${data.company}${data.vat ? ` (${data.vat})` : ""} | Tel: ${data.phone}\n\n${data.message}`,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setSuccess(true);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : text.formError);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <svg className="w-7 h-7 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-lg">{text.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {serverError}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/86">{text.formCompany} *</label>
          <input {...register("company")} className="input" placeholder="Acme SRL" />
          {errors.company && <p className="mt-1 text-xs text-red-300">{errors.company.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/86">{text.formContact} *</label>
          <input {...register("name")} className="input" placeholder="Ion Popescu" />
          {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/86">{text.formEmail} *</label>
          <input type="email" {...register("email")} className="input" placeholder="contact@acme.ro" />
          {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/86">{text.formPhone} *</label>
          <input type="tel" {...register("phone")} className="input" placeholder="+40 xxx xxx xxx" />
          {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/86">{text.formVat}</label>
        <input {...register("vat")} className="input" placeholder="RO12345678" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/86">{text.formMessage} *</label>
        <textarea
          {...register("message")}
          className="textarea min-h-[120px]"
          placeholder={locale === "ro" ? "Ex: 100 buc ambalaje carton, livrare Iași..." : "E.g.: 100 pcs cardboard packaging, delivery Iași..."}
        />
        {errors.message && <p className="mt-1 text-xs text-red-300">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="b2b-consent"
          {...register("consent")}
          className="mt-0.5 h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
        />
        <label htmlFor="b2b-consent" className="text-sm text-white/60">
          {text.formConsent}
        </label>
      </div>
      {errors.consent && <p className="-mt-3 text-xs text-red-300">{errors.consent.message}</p>}

      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg w-full sm:w-auto">
        {isSubmitting ? (locale === "ro" ? "Se trimite..." : "Sending...") : text.formSubmit}
      </button>
    </form>
  );
}
