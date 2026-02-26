"use client";

import { useEffect, useMemo, useState } from "react";

type FormState = {
  // Flags
  vatRegistered: "yes" | "no";
  showUTR: "yes" | "no";

  // Seller
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerVat: string; // optional if not VAT registered
  sellerUTR: string; // optional
  sellerAddress1: string;
  sellerAddress2: string;
  sellerCity: string;
  sellerPostcode: string;
  sellerCountry: string;

  // Buyer
  buyerName: string;
  buyerEmail: string;
  buyerVat: string;
  buyerEInvoiceId: string; // optional: endpoint/peppol/delivery id
  buyerAddress1: string;
  buyerAddress2: string;
  buyerCity: string;
  buyerPostcode: string;
  buyerCountry: string;

  // Invoice meta
  invoiceNo: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  poNumber: string;

  // Amounts (simple one-line invoice)
  itemDescription: string;
  netAmount: string;
  vatRate: string;
  vatAmount: string;
  totalAmount: string;

  // Payment
  paymentMethod: string;
  bankName: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  iban: string;
  swift: string;

  // Notes + later email field
  notes: string;
  sendToEmail: string;
};

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function toNumber(v: string) {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function money2(n: number) {
  return (Math.round(n * 100) / 100).toFixed(2);
}

export default function Home() {
  const [status, setStatus] = useState("");

  const [form, setForm] = useState<FormState>({
    vatRegistered: "no",
    showUTR: "no",

    // Seller
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
    sellerVat: "",
    sellerUTR: "",
    sellerAddress1: "",
    sellerAddress2: "",
    sellerCity: "",
    sellerPostcode: "",
    sellerCountry: "UK",

    // Buyer
    buyerName: "",
    buyerEmail: "",
    buyerVat: "",
    buyerEInvoiceId: "",
    buyerAddress1: "",
    buyerAddress2: "",
    buyerCity: "",
    buyerPostcode: "",
    buyerCountry: "UK",

    // Invoice meta
    invoiceNo: "INV-001",
    issueDate: "",
    dueDate: "",
    currency: "GBP",
    poNumber: "",

    // Amounts
    itemDescription: "Services",
    netAmount: "",
    vatRate: "20",
    vatAmount: "",
    totalAmount: "",

    // Payment
    paymentMethod: "Bank transfer",
    bankName: "",
    accountName: "",
    sortCode: "",
    accountNumber: "",
    iban: "",
    swift: "",

    // Notes + later email
    notes: "",
    sendToEmail: "",
  });

  // Default invoice date to today
  useEffect(() => {
    setForm((prev) => (prev.issueDate ? prev : { ...prev, issueDate: todayISO() }));
  }, []);

  // Auto-calc VAT + totals
  useEffect(() => {
    const net = toNumber(form.netAmount);
    const rate = toNumber(form.vatRate);

    if (!form.netAmount) {
      setForm((p) => ({ ...p, vatAmount: "", totalAmount: "" }));
      return;
    }

    if (form.vatRegistered === "yes") {
      const vat = net * (rate / 100);
      const total = net + vat;
      setForm((p) => ({
        ...p,
        vatAmount: money2(vat),
        totalAmount: money2(total),
      }));
    } else {
      setForm((p) => ({
        ...p,
        vatAmount: "",
        totalAmount: money2(net),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.netAmount, form.vatRate, form.vatRegistered]);

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // bold black outlines, centered, no shadows
  const inputBase =
    "w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-center outline-none focus:ring-0 focus:border-black";
  const labelBase = "text-xs font-semibold text-black text-center";
  const sectionTitle = "text-sm font-black tracking-wide text-black text-center";

  // ✅ very light yellow, not sickly
  const sectionBox = "rounded-2xl border-2 border-black bg-[#FFF6D6] p-4 md:p-5";

  const fields = useMemo(
    () => [
      {
        title: "Seller",
        items: [
          { k: "sellerName", label: "Business name *", placeholder: "Your business" },
          { k: "sellerEmail", label: "Email", placeholder: "accounts@yourbusiness.com" },
          { k: "sellerPhone", label: "Phone", placeholder: "+44 ..." },
          { k: "sellerAddress1", label: "Address line 1", placeholder: "Street address" },
          { k: "sellerAddress2", label: "Address line 2", placeholder: "Optional" },
          { k: "sellerCity", label: "Town/City", placeholder: "London" },
          { k: "sellerPostcode", label: "Postcode", placeholder: "SW1A 1AA" },
          { k: "sellerCountry", label: "Country", placeholder: "UK" },
        ] as const,
      },
      {
        title: "Buyer",
        items: [
          { k: "buyerName", label: "Customer name *", placeholder: "Customer / company" },
          { k: "buyerEmail", label: "Customer email", placeholder: "ap@customer.com" },
          {
            k: "buyerEInvoiceId",
            label: "Buyer e-invoice delivery ID (optional)",
            placeholder: "Ask customer: Peppol ID / Endpoint ID",
          },
          { k: "buyerAddress1", label: "Address line 1", placeholder: "Street address" },
          { k: "buyerAddress2", label: "Address line 2", placeholder: "Optional" },
          { k: "buyerCity", label: "Town/City", placeholder: "Manchester" },
          { k: "buyerPostcode", label: "Postcode", placeholder: "M1 1AA" },
          { k: "buyerCountry", label: "Country", placeholder: "UK" },
        ] as const,
      },
    ],
    []
  );

  const requiredMissing =
    !form.sellerName ||
    !form.buyerName ||
    !form.invoiceNo ||
    !form.issueDate ||
    !form.itemDescription ||
    !form.netAmount;

  const handlePreview = () => {
    setStatus("");

    if (requiredMissing) {
      setStatus("Please fill in the required fields marked *.");
      return;
    }

    const params = new URLSearchParams();
    (Object.keys(form) as (keyof FormState)[]).forEach((k) => {
      if (form[k]) params.set(k, form[k]);
    });

    window.location.href = `/preview?${params.toString()}`;
  };

  return (
    <main className="min-h-screen px-6 py-10 flex items-start justify-center">
      <div className="w-full max-w-6xl">
        <header className="text-center">
          <h1 className="nofaff-logo">NO FAFF</h1>
          <p className="mt-1 text-sm md:text-base font-semibold text-black/70">Free E-Invoicing</p>
          <p className="mt-2 text-xs md:text-sm text-black/60">PDF optional • Built for future compliance</p>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seller + Buyer first, side-by-side on desktop */}
          {fields.map((section) => (
            <section key={section.title} className={sectionBox}>
              <div className={sectionTitle}>{section.title}</div>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {section.items.map((f) => (
                  <label key={String(f.k)} className="block">
                    <div className={labelBase}>{f.label}</div>
                    <input
                      value={form[f.k]}
                      onChange={(e) => setField(f.k, e.target.value)}
                      placeholder={f.placeholder}
                      className={inputBase}
                    />
                  </label>
                ))}
              </div>
            </section>
          ))}

          {/* Invoice */}
          <section className={sectionBox}>
            <div className={sectionTitle}>Invoice</div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <label className="block">
                <div className={labelBase}>Invoice number *</div>
                <input
                  value={form.invoiceNo}
                  onChange={(e) => setField("invoiceNo", e.target.value)}
                  className={inputBase}
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className={labelBase}>Invoice date *</div>
                  <input
                    type="date"
                    value={form.issueDate}
                    onChange={(e) => setField("issueDate", e.target.value)}
                    className={inputBase}
                  />
                </label>

                <label className="block">
                  <div className={labelBase}>Due date</div>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setField("dueDate", e.target.value)}
                    className={inputBase}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className={labelBase}>Currency</div>
                  <select
                    value={form.currency}
                    onChange={(e) => setField("currency", e.target.value)}
                    className={inputBase}
                  >
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </label>

                <label className="block">
                  <div className={labelBase}>PO number</div>
                  <input
                    value={form.poNumber}
                    onChange={(e) => setField("poNumber", e.target.value)}
                    placeholder="Optional"
                    className={inputBase}
                  />
                </label>
              </div>

              <label className="block">
                <div className={labelBase}>What is this for? *</div>
                <input
                  value={form.itemDescription}
                  onChange={(e) => setField("itemDescription", e.target.value)}
                  placeholder="e.g. Web design services"
                  className={inputBase}
                />
              </label>

              <label className="block">
                <div className={labelBase}>Amount (net) *</div>
                <input
                  value={form.netAmount}
                  onChange={(e) => setField("netAmount", e.target.value)}
                  placeholder="e.g. 1000"
                  inputMode="decimal"
                  className={inputBase}
                />
              </label>

              {/* VAT section comes later: it's here, after the “easy” fields */}
              <div className="mt-2 border-t-2 border-black/20 pt-3">
                <div className="text-xs font-black text-black text-center mb-2">VAT (optional)</div>

                <label className="block">
                  <div className={labelBase}>Are you VAT registered?</div>
                  <select
                    value={form.vatRegistered}
                    onChange={(e) => setField("vatRegistered", e.target.value as "yes" | "no")}
                    className={inputBase}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>

                {form.vatRegistered === "yes" ? (
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <label className="block">
                      <div className={labelBase}>Your VAT number</div>
                      <input
                        value={form.sellerVat}
                        onChange={(e) => setField("sellerVat", e.target.value)}
                        placeholder="GB123456789"
                        className={inputBase}
                      />
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label className="block">
                        <div className={labelBase}>VAT rate %</div>
                        <input
                          value={form.vatRate}
                          onChange={(e) => setField("vatRate", e.target.value)}
                          inputMode="decimal"
                          className={inputBase}
                        />
                      </label>

                      <label className="block">
                        <div className={labelBase}>VAT amount</div>
                        <input value={form.vatAmount} readOnly className={inputBase} />
                      </label>

                      <label className="block">
                        <div className={labelBase}>Total</div>
                        <input value={form.totalAmount} readOnly className={inputBase} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <label className="block">
                      <div className={labelBase}>Total</div>
                      <input value={form.totalAmount} readOnly className={inputBase} />
                    </label>
                  </div>
                )}

                <div className="mt-3 grid grid-cols-1 gap-3">
                  <label className="block">
                    <div className={labelBase}>UTR (optional)</div>
                    <input
                      value={form.sellerUTR}
                      onChange={(e) => setField("sellerUTR", e.target.value)}
                      placeholder="10-digit UTR"
                      className={inputBase}
                    />
                  </label>

                  <label className="block">
                    <div className={labelBase}>Show UTR on invoice?</div>
                    <select
                      value={form.showUTR}
                      onChange={(e) => setField("showUTR", e.target.value as "yes" | "no")}
                      className={inputBase}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className={sectionBox}>
            <div className={sectionTitle}>Payment details</div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <label className="block">
                <div className={labelBase}>Payment method</div>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setField("paymentMethod", e.target.value)}
                  className={inputBase}
                >
                  <option>Bank transfer</option>
                  <option>Card</option>
                  <option>Cash</option>
                  <option>Direct debit</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="block">
                <div className={labelBase}>Bank name</div>
                <input
                  value={form.bankName}
                  onChange={(e) => setField("bankName", e.target.value)}
                  placeholder="Optional"
                  className={inputBase}
                />
              </label>

              <label className="block">
                <div className={labelBase}>Account name</div>
                <input
                  value={form.accountName}
                  onChange={(e) => setField("accountName", e.target.value)}
                  placeholder="Optional"
                  className={inputBase}
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className={labelBase}>Sort code</div>
                  <input
                    value={form.sortCode}
                    onChange={(e) => setField("sortCode", e.target.value)}
                    placeholder="12-34-56"
                    className={inputBase}
                  />
                </label>

                <label className="block">
                  <div className={labelBase}>Account number</div>
                  <input
                    value={form.accountNumber}
                    onChange={(e) => setField("accountNumber", e.target.value)}
                    placeholder="12345678"
                    className={inputBase}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className={labelBase}>IBAN</div>
                  <input
                    value={form.iban}
                    onChange={(e) => setField("iban", e.target.value)}
                    placeholder="Optional"
                    className={inputBase}
                  />
                </label>

                <label className="block">
                  <div className={labelBase}>SWIFT/BIC</div>
                  <input
                    value={form.swift}
                    onChange={(e) => setField("swift", e.target.value)}
                    placeholder="Optional"
                    className={inputBase}
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Notes + email */}
          <section className={`${sectionBox} md:col-span-2`}>
            <div className={sectionTitle}>Notes + email</div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block md:col-span-2">
                <div className={labelBase}>Notes (optional)</div>
                <textarea
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  placeholder="Payment terms, project reference, etc."
                  rows={4}
                  className="w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-left outline-none focus:ring-0 focus:border-black"
                />
              </label>

              <label className="block md:col-span-2">
                <div className={labelBase}>Email address (optional)</div>
                <input
                  value={form.sendToEmail}
                  onChange={(e) => setField("sendToEmail", e.target.value)}
                  placeholder="Used on next page (email sending comes later)"
                  className={inputBase}
                />
              </label>
            </div>
          </section>
        </div>

        <div className="mt-6">
          <button
            onClick={handlePreview}
            className="w-full rounded-xl bg-black text-white py-4 font-black tracking-wide hover:opacity-95 active:opacity-90 transition"
          >
            Preview & finish
          </button>

          <div className="mt-3 text-center text-xs text-black/70 break-words">{status}</div>
          <div className="mt-2 text-center text-xs text-black/60">
            * Required: seller name, buyer name, invoice number/date, description, amount.
          </div>
        </div>
      </div>
    </main>
  );
}