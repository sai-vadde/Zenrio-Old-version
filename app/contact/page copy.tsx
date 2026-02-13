"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const countryCodes: Record<string, string> = {
  India: "+91",
  USA: "+1",
  UK: "+44",
  Japan: "+81",
  Germany: "+49",
  Canada: "+1",
  Australia: "+61",
  France: "+33",
  China: "+86",
  UAE: "+971",
  Brazil: "+55",
  Russia: "+7",
  "South Korea": "+82",
  Italy: "+39",
  Spain: "+34",
  Netherlands: "+31",
  Singapore: "+65",
};

export default function ContactPageFinal() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    country: "India",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((prev) => ({ ...prev, phone: value.replace(/\D/g, "") }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading) return;

    setLoading(true);
    const dialCode = countryCodes[form.country] || "";
    const fullPhone = `${dialCode} ${form.phone}`;

    try {
      // Check if the same contact already exists
      const { data: existing } = await supabase
        .from("contacts")
        .select("id")
        .or(`email.eq.${form.email},phone.eq.${fullPhone}`)
        .limit(1);

      if (existing && existing.length > 0) {
        setPopup("You have already submitted. Our team will reach out soon!");
        return;
      }

      // Insert new contact
      const { error } = await supabase
        .from("contacts")
        .insert([{ ...form, phone: fullPhone }]);

      if (error) throw error;

      setPopup(
        "Message sent successfully! Our team will reach out to you in next 12 hours.",
      );
      setForm({
        first_name: "",
        last_name: "",
        country: "India",
        phone: "",
        email: "",
      });
    } catch (err: any) {
      // Handle duplicate key conflict (if Supabase still throws 409)
      if (err?.code === "23505") {
        setPopup("You have already submitted. Our team will reach out soon!");
      } else {
        console.error(err);
        setPopup("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setPopup(""), 4000);
    }
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 text-white px-4 py-4 rounded-xl focus:bg-white/10 focus:ring-1 focus:ring-white/50 focus:border-white/50 outline-none transition-all placeholder-neutral-500 hover:border-white/20";
  const labelClasses =
    "block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-widest ml-1";

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-neutral-800 to-transparent opacity-40 pointer-events-none"></div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 w-full max-w-xl bg-neutral-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/50">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Contact Us
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-neutral-700"></div>
            <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">
              We will reach you within 24hr
            </p>
            <div className="h-[1px] w-8 bg-neutral-700"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className={labelClasses}>First Name</label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Ex. John"
                required
              />
            </div>
            <div className="w-full">
              <label className={labelClasses}>Last Name</label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Ex. Doe"
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-[40%]">
              <label className={labelClasses}>Country</label>
              <div className="relative">
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer truncate pr-8`}
                >
                  {Object.entries(countryCodes)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([country]) => (
                      <option
                        key={country}
                        value={country}
                        className="bg-neutral-900 text-white"
                      >
                        {country}
                      </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 pointer-events-none opacity-50">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-[60%]">
              <label className={labelClasses}>Phone</label>
              <div className="relative flex">
                <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-neutral-400 text-sm border-r border-white/10 pointer-events-none">
                  {countryCodes[form.country]}
                </div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`${inputClasses} pl-16`}
                  placeholder="98765 43210"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="john@example.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-neutral-200 transition-all hover:scale-[1.01] active:scale-[0.99] mt-4 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] disabled:opacity-60"
          >
            {loading ? "Processing..." : "Send Message"}
          </button>

          {popup && (
            <div
              className={`text-center font-medium animate-pulse mt-4 ${popup.includes("Failed") || popup.includes("already") ? "text-red-400" : "text-emerald-400"}`}
            >
              {popup}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
