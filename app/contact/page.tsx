"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const countryCodes: Record<string, string> = {
  Afghanistan: "+93",
  Albania: "+355",
  Algeria: "+213",
  Andorra: "+376",
  Angola: "+244",
  Antigua_and_Barbuda: "+1",
  Argentina: "+54",
  Armenia: "+374",
  Australia: "+61",
  Austria: "+43",
  Azerbaijan: "+994",

  Bahamas: "+1",
  Bahrain: "+973",
  Bangladesh: "+880",
  Barbados: "+1",
  Belarus: "+375",
  Belgium: "+32",
  Belize: "+501",
  Benin: "+229",
  Bhutan: "+975",
  Bolivia: "+591",
  Bosnia_and_Herzegovina: "+387",
  Botswana: "+267",
  Brazil: "+55",
  Brunei: "+673",
  Bulgaria: "+359",
  Burkina_Faso: "+226",
  Burundi: "+257",

  Cabo_Verde: "+238",
  Cambodia: "+855",
  Cameroon: "+237",
  Canada: "+1",
  Central_African_Republic: "+236",
  Chad: "+235",
  Chile: "+56",
  China: "+86",
  Colombia: "+57",
  Comoros: "+269",
  Congo: "+242",
  Costa_Rica: "+506",
  Croatia: "+385",
  Cuba: "+53",
  Cyprus: "+357",
  Czechia: "+420",

  Denmark: "+45",
  Djibouti: "+253",
  Dominica: "+1",
  Dominican_Republic: "+1",

  Ecuador: "+593",
  Egypt: "+20",
  El_Salvador: "+503",
  Equatorial_Guinea: "+240",
  Eritrea: "+291",
  Estonia: "+372",
  Eswatini: "+268",
  Ethiopia: "+251",

  Fiji: "+679",
  Finland: "+358",
  France: "+33",

  Gabon: "+241",
  Gambia: "+220",
  Georgia: "+995",
  Germany: "+49",
  Ghana: "+233",
  Greece: "+30",
  Grenada: "+1",
  Guatemala: "+502",
  Guinea: "+224",
  Guinea_Bissau: "+245",
  Guyana: "+592",

  Haiti: "+509",
  Honduras: "+504",
  Hungary: "+36",

  Iceland: "+354",
  India: "+91",
  Indonesia: "+62",
  Iran: "+98",
  Iraq: "+964",
  Ireland: "+353",
  Israel: "+972",
  Italy: "+39",

  Jamaica: "+1",
  Japan: "+81",
  Jordan: "+962",

  Kazakhstan: "+7",
  Kenya: "+254",
  Kiribati: "+686",
  Kuwait: "+965",
  Kyrgyzstan: "+996",

  Laos: "+856",
  Latvia: "+371",
  Lebanon: "+961",
  Lesotho: "+266",
  Liberia: "+231",
  Libya: "+218",
  Liechtenstein: "+423",
  Lithuania: "+370",
  Luxembourg: "+352",

  Madagascar: "+261",
  Malawi: "+265",
  Malaysia: "+60",
  Maldives: "+960",
  Mali: "+223",
  Malta: "+356",
  Marshall_Islands: "+692",
  Mauritania: "+222",
  Mauritius: "+230",
  Mexico: "+52",
  Micronesia: "+691",
  Moldova: "+373",
  Monaco: "+377",
  Mongolia: "+976",
  Montenegro: "+382",
  Morocco: "+212",
  Mozambique: "+258",
  Myanmar: "+95",

  Namibia: "+264",
  Nauru: "+674",
  Nepal: "+977",
  Netherlands: "+31",
  New_Zealand: "+64",
  Nicaragua: "+505",
  Niger: "+227",
  Nigeria: "+234",
  North_Korea: "+850",
  North_Macedonia: "+389",
  Norway: "+47",

  Oman: "+968",

  Pakistan: "+92",
  Palau: "+680",
  Panama: "+507",
  Papua_New_Guinea: "+675",
  Paraguay: "+595",
  Peru: "+51",
  Philippines: "+63",
  Poland: "+48",
  Portugal: "+351",

  Qatar: "+974",

  Romania: "+40",
  Russia: "+7",
  Rwanda: "+250",

  Saint_Kitts_and_Nevis: "+1",
  Saint_Lucia: "+1",
  Saint_Vincent_and_the_Grenadines: "+1",
  Samoa: "+685",
  San_Marino: "+378",
  Sao_Tome_and_Principe: "+239",
  Saudi_Arabia: "+966",
  Senegal: "+221",
  Serbia: "+381",
  Seychelles: "+248",
  Sierra_Leone: "+232",
  Singapore: "+65",
  Slovakia: "+421",
  Slovenia: "+386",
  Solomon_Islands: "+677",
  Somalia: "+252",
  South_Africa: "+27",
  South_Korea: "+82",
  South_Sudan: "+211",
  Spain: "+34",
  Sri_Lanka: "+94",
  Sudan: "+249",
  Suriname: "+597",
  Sweden: "+46",
  Switzerland: "+41",
  Syria: "+963",

  Taiwan: "+886",
  Tajikistan: "+992",
  Tanzania: "+255",
  Thailand: "+66",
  Timor_Leste: "+670",
  Togo: "+228",
  Tonga: "+676",
  Trinidad_and_Tobago: "+1",
  Tunisia: "+216",
  Turkey: "+90",
  Turkmenistan: "+993",
  Tuvalu: "+688",

  Uganda: "+256",
  Ukraine: "+380",
  United_Arab_Emirates: "+971",
  United_Kingdom: "+44",
  United_States: "+1",
  Uruguay: "+598",
  Uzbekistan: "+998",

  Vanuatu: "+678",
  Vatican_City: "+379",
  Venezuela: "+58",
  Vietnam: "+84",

  Yemen: "+967",
  Zambia: "+260",
  Zimbabwe: "+263",
};
export default function ContactPageFinal() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    country: "India",
    phone: "",
    email: "",
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [searchBuffer, setSearchBuffer] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const countryList = Object.keys(countryCodes).sort((a, b) =>
    a.localeCompare(b),
  );

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
        setHighlightedIndex(0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation & type-to-search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < countryList.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : countryList.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = countryList[highlightedIndex];
      setForm((prev) => ({ ...prev, country: selected }));
      setShowDropdown(false);
      setHighlightedIndex(0);
    } else if (e.key.length === 1 && /^[a-zA-Z ]$/.test(e.key)) {
      const newBuffer = searchBuffer + e.key.toLowerCase();
      setSearchBuffer(newBuffer);

      const matchIndex = countryList.findIndex((c) =>
        c.toLowerCase().startsWith(newBuffer),
      );
      if (matchIndex !== -1) setHighlightedIndex(matchIndex);

      setTimeout(() => setSearchBuffer(""), 500);
    }
  };

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
    if (loading) return;
    setLoading(true);

    const dialCode = countryCodes[form.country] || "";

    const normalizePhone = (phone: string) => phone.replace(/^0+/, ""); // remove leading zeros
    const fullPhone = `${dialCode} ${normalizePhone(form.phone)}`;

    try {
      const { error } = await supabase
        .from("contacts")
        .insert([{ ...form, phone: fullPhone }]);

      if (error) {
        // Unique constraint violation
        if (error.code === "23505") {
          setPopup("You have already submitted. Our team will reach out soon!");
        } else {
          throw error;
        }
      } else {
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
      }

      // Auto-dismiss and redirect
      setTimeout(() => {
        setPopup("");
        router.push("/");
      }, 4000);
    } catch (err) {
      console.error(err);
      setPopup("Failed to send message. Please try again.");
      setTimeout(() => setPopup(""), 4000);
    } finally {
      setLoading(false);
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

          {/* Country + Phone */}
          <div className="flex gap-3">
            {/* Country Dropdown */}
            <div
              ref={dropdownRef}
              className="w-[40%] relative outline-none"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <label className={labelClasses}>Country</label>
              <div
                className={`${inputClasses} cursor-pointer relative`}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {form.country}
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

              {showDropdown && (
                <ul className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto bg-neutral-900 border border-white/10 rounded-xl shadow-lg no-scrollbar">
                  {countryList.map((country, idx) => {
                    const isHighlighted = idx === highlightedIndex;
                    return (
                      <li
                        key={country}
                        onClick={() => {
                          setForm((prev) => ({ ...prev, country }));
                          setShowDropdown(false);
                          setHighlightedIndex(0);
                        }}
                        ref={(el) => {
                          if (isHighlighted && el) {
                            el.scrollIntoView({ block: "nearest" });
                          }
                        }}
                        className={`px-4 py-3 cursor-pointer text-white text-sm truncate ${
                          isHighlighted ? "bg-white/20" : ""
                        }`}
                      >
                        {country}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Phone Input */}
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

          {/* Centered Success/Failure Card */}
          {popup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Semi-transparent overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

              {/* The Card */}
              <div className="relative z-10 flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-sm w-[90%] shadow-2xl animate-scale-in">
                {/* Icon */}
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full ${
                    popup.includes("Failed") ? "bg-red-500" : "bg-emerald-500"
                  } text-white text-2xl`}
                >
                  {popup.includes("Failed") ? (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {/* Text */}
                <div className="text-white text-center font-semibold">
                  {popup}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
