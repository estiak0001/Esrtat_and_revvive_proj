import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { LuLoaderCircle, LuCircleCheck, LuCircleAlert } from "react-icons/lu";
import { submitInquiry } from "../../lib/api";

const inquiryTypes = [
  { value: "general", label: "General Enquiry" },
  { value: "destination", label: "Destination Package" },
  { value: "corporate", label: "Corporate Travel" },
  { value: "visa", label: "Visa Assistance" },
  { value: "honeymoon", label: "Honeymoon Package" },
  { value: "group", label: "Group Tour" },
  { value: "umrah", label: "Umrah & Religious Tour" },
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Enter a valid phone number"),
  inquiryType: z.string().min(1, "Please select an enquiry type"),
  destination: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)"),
  company: z.string().max(0).optional(), // honeypot — must stay empty
});

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const prefilledDestination = searchParams.get("destination") || "";
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: prefilledDestination ? "destination" : "general",
      destination: prefilledDestination,
      message: prefilledDestination
        ? `Hi, I'd like more information about a trip to ${prefilledDestination}.`
        : "",
      company: "",
    },
  });

  const onSubmit = async (values) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const { company: _honeypot, ...payload } = values;
      await submitInquiry(payload);
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-teal-200 bg-teal-50 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white">
          <LuCircleCheck size={28} />
        </span>
        <h3 className="font-display text-xl font-bold text-navy-900">Message Sent</h3>
        <p className="max-w-sm text-sm text-navy-600">
          Thank you for reaching out. A Revive Holidays travel consultant will get back to you
          shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-display text-sm font-semibold text-teal-700 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name?.message}>
          <input
            type="text"
            placeholder="John Doe"
            className={inputClass(errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label="Email Address" error={errors.email?.message}>
          <input
            type="email"
            placeholder="you@example.com"
            className={inputClass(errors.email)}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            type="tel"
            placeholder="+880 1XXXXXXXXX"
            className={inputClass(errors.phone)}
            {...register("phone")}
          />
        </Field>

        <Field label="Enquiry Type" error={errors.inquiryType?.message}>
          <select className={inputClass(errors.inquiryType)} {...register("inquiryType")}>
            {inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Destination (optional)" error={errors.destination?.message}>
        <input
          type="text"
          placeholder="e.g. Maldives"
          className={inputClass(errors.destination)}
          {...register("destination")}
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder="Tell us about the trip you're planning..."
          className={inputClass(errors.message)}
          {...register("message")}
        />
      </Field>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <LuCircleAlert className="mt-0.5 shrink-0" size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 font-display text-sm font-semibold text-navy-950 shadow-soft transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" && <LuLoaderCircle className="animate-spin" size={18} />}
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-display text-sm font-medium text-navy-800">{label}</span>
      {children}
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(error) {
  return `rounded-xl border bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 ${
    error ? "border-red-300" : "border-navy-200"
  }`;
}
