"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT_HONEYPOT_FIELD } from "@/lib/contact-honeypot";
import styles from "./contact-form.module.css";

type FormType = "contact" | "problem";
type FormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
  success: string;
  contact_check: string;
};

const emptyValues: FormValues = { name: "", email: "", company: "", message: "", success: "", contact_check: "" };

export function ContactForm({ type }: { type: FormType }) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const isProblem = type === "problem";

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We couldn't send your message. Please try again.");
      setStatus("success");
      setValues(emptyValues);
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "We couldn't send your message. Please try again.");
    }
  }

  if (status === "success") {
    return <p className={styles.success} role="status">{isProblem ? "Thanks for sharing your challenge. We're looking forward to learning more." : "Message received. Thanks for reaching out. We'll be in touch."}</p>;
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${type}-contact-check`}>Leave this field empty</label>
        <input
          id={`${type}-contact-check`}
          name={CONTACT_HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          value={values.contact_check}
          onChange={(event) => update(CONTACT_HONEYPOT_FIELD, event.target.value)}
        />
      </div>

      {isProblem ? (
        <>
          <Field id="challenge" label="What's the challenge?" required multiline rows={5} value={values.message} onChange={(value) => update("message", value)} placeholder="Tell us what's happening, what's frustrating, or what you're hoping to change." />
          <Field id="success" label="What would success look like?" multiline rows={4} value={values.success} onChange={(value) => update("success", value)} placeholder="If we could make one thing better, what would that be?" />
          <Field id="problem-name" label="Your name" required value={values.name} onChange={(value) => update("name", value)} autoComplete="name" />
          <Field id="problem-email" label="Your email" required type="email" value={values.email} onChange={(value) => update("email", value)} autoComplete="email" />
          <Field id="problem-company" label="Company or organization" value={values.company} onChange={(value) => update("company", value)} autoComplete="organization" />
        </>
      ) : (
        <>
          <Field id="contact-name" label="Name" required value={values.name} onChange={(value) => update("name", value)} autoComplete="name" />
          <Field id="contact-email" label="Email" required type="email" value={values.email} onChange={(value) => update("email", value)} autoComplete="email" />
          <Field id="contact-company" label="Company or organization" value={values.company} onChange={(value) => update("company", value)} autoComplete="organization" />
          <Field id="contact-message" label="Message" required multiline rows={6} value={values.message} onChange={(value) => update("message", value)} />
        </>
      )}

      {status === "error" && <p className={styles.error} role="alert">{error} <a href="mailto:consulting@shiftshift.co">Email us directly.</a></p>}
      <button className={styles.submit} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : isProblem ? "Let's figure it out" : "Send message"} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

function Field({
  id, label, value, onChange, required = false, type = "text", multiline = false, rows = 4, placeholder, autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  autoComplete?: string;
}) {
  const common = {
    id,
    name: id,
    required,
    value,
    placeholder,
    autoComplete,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  };
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {multiline ? <textarea {...common} rows={rows} /> : <input {...common} type={type} />}
    </div>
  );
}
