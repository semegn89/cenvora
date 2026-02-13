"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
  message: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ locale }: { locale: Locale }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const text = t[locale].contacts;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : text.errorMessage);
    }
  };

  if (success) {
    return <p className="mt-4 text-[var(--primary)] font-medium">{text.successMessage}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">{text.formName}</label>
        <input {...register("name")} className="input" />
        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{text.formEmail}</label>
        <input type="email" {...register("email")} className="input" />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{text.formMessage}</label>
        <textarea {...register("message")} className="input min-h-[120px]" />
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        {isSubmitting ? t[locale].common.loading : text.submit}
      </button>
    </form>
  );
}
