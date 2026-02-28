"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type YesNo = "yes" | "no";

type FormState = {
  vatRegistered: YesNo;
  showUTR: YesNo;

  // Seller
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerVat: string;
  sellerUTR: string;
  sellerAddress1: string;
  sellerAddress2: string;
  sellerCity: string;
  sellerPostcode: string;
  sellerCountry: string;

  // Buyer
  buyerName: string;
  buyerEmail: string;
  buyerVat: string;
  buyerEInvoiceScheme: string; // schemeID
  buyerEInvoiceId: string; // endpoint id value
  buyerAddress1: string;
  buyerAddress2: string;
  buyerCity: string;
  buyerPostcode: string;
  buyerCountry: string;

  // Invoice
  invoiceNo: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  poNumber: string;
  invoiceTypeCode: string;

  // Line (MVP: single line)
  itemDescription: string;
  quantity: string;
  unitCode: string;
  netAmount: string;
  vatCategoryCode: string;
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ENDPOINT_SCHEMES: { value: string; label: string }[] = [
  { value: "", label: "Select scheme (recommended if you add an Endpoint ID)" },
  { value: "0088", label: "0088 — EAN Location Code (GLN)" },
  { value: "9906", label: "9906 — UK VAT number (sometimes used)" },
  { value: "9925", label: "9925 — UK Companies House number (sometimes used)" },
];

type Extracted = Partial<FormState> & {
  _summary?: string;
  _confidence?: "low" | "medium" | "high";
};

function isEmpty(v: unknown) {
  return !String(v ?? "").trim();
}

/**
 * MVP “extractor” stub.
 * Replace later with a real API call.
 */
function fakeExtractFromNotes(notes: string): Extracted {
  const t = notes.toLowerCase();

  const out: Extracted = {
    _confidence: "low",
    _summary: "Drafted a few fields from your notes (demo mode).",
  };

  const moneyMatch =
    notes.match(/£\s*([0-9]+(?:\.[0-9]{1,2})?)/) ||
    notes.match(/([0-9]+(?:\.[0-9]{1,2})?)\s*(?:gbp|pounds)?/i);
  if (moneyMatch?.[1]) out.netAmount = moneyMatch[1];

  const dueMatch = notes.match(/due\s+in\s+(\d{1,3})\s+days/i);
  if (dueMatch?.[1]) {
    const days = Number(dueMatch[1]);
    if (Number.isFinite(days)) {
      const d = new Date();
      d.setDate(d.getDate() + days);
      out.dueDate = d.toISOString().slice(0, 10);
    }
  }

  if (t.includes("window")) out.itemDescription = "Window cleaning services";
  else if (t.includes("roof")) out.itemDescription = "Roof repair services";
  else if (t.includes("plumb")) out.itemDescription = "Plumbing services";
  else if (t.includes("electric")) out.itemDescription = "Electrical services";

  const companyMatch = notes.match(/invoice\s+([A-Z][A-Za-z0-9&.\- ]{2,60})\s+(?:for|to)/);
  if (companyMatch?.[1]) out.buyerName = companyMatch[1].trim();

  if (t.includes("vat") && (t.includes("20") || t.includes("20%"))) {
    out.vatRegistered = "yes";
    out.vatCategoryCode = "S";
    out.vatRate = "20";
    out._confidence = "medium";
  }

  return out;
}

export default function CreatePage() {
  const [status, setStatus] = useState("");
  const [aiStatus, setAiStatus] = useState("");
  const [pasteText, setPasteText] = useState("");

  const manualTopRef = useRef<HTMLDivElement | null>(null);

  // Panels
  const [aiOpen, setAiOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  const [buyerOpen, setBuyerOpen] = useState(true);
  const [sellerOpen, setSellerOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(true);

  const [vatOpen, setVatOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  // Autofill confirm modal state
  const [pendingExtract, setPendingExtract] = useState<Extracted | null>(null);
  const [showApplyPrompt, setShowApplyPrompt] = useState(false);

  const [form, setForm] = useState<FormState>({
    vatRegistered: "yes",
    showUTR: "no",

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

    buyerName: "",
    buyerEmail: "",
    buyerVat: "",
    buyerEInvoiceScheme: "",
    buyerEInvoiceId: "",
    buyerAddress1: "",
    buyerAddress2: "",
    buyerCity: "",
    buyerPostcode: "",
    buyerCountry: "UK",

    invoiceNo: "INV-001",
    issueDate: "",
    dueDate: "",
    currency: "GBP",
    poNumber: "",
    invoiceTypeCode: "380",

    itemDescription: "Services",
    quantity: "1",
    unitCode: "EA",
    netAmount: "",
    vatCategoryCode: "S",
    vatRate: "20",
    vatAmount: "",
    totalAmount: "",

    paymentMethod: "Bank transfer",
    bankName: "",
    accountName: "",
    sortCode: "",
    accountNumber: "",
    iban: "",
    swift: "",

    notes: "",
    sendToEmail: "",
  });

  // Default issue date
  useEffect(() => {
    setForm((prev) => (prev.issueDate ? prev : { ...prev, issueDate: todayISO() }));
  }, []);

  // Keep VAT category sensible when VAT registered toggles
  useEffect(() => {
    setForm((p) => {
      if (p.vatRegistered === "yes") {
        return { ...p, vatCategoryCode: p.vatCategoryCode || "S", vatRate: p.vatRate || "20" };
      }
      return { ...p, vatCategoryCode: "O", vatRate: "", sellerVat: "" };
    });
  }, [form.vatRegistered]);

  // Recalculate totals (single-line MVP)
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
      setForm((p) => ({ ...p, vatAmount: money2(vat), totalAmount: money2(total) }));
    } else {
      setForm((p) => ({ ...p, vatAmount: "", totalAmount: money2(net) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.netAmount, form.vatRate, form.vatRegistered]);

  const setField = (key: keyof FormState, value: string) => {
    // special: ensure YesNo fields stay typed
    if (key === "vatRegistered" || key === "showUTR") {
      const v = value === "yes" ? "yes" : "no";
      setForm((prev) => ({ ...prev, [key]: v } as FormState));
      return;
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const count = e.target.files?.length || 0;
    if (!count) {
      setAiStatus("");
      return;
    }
    setAiStatus(`${count} file${count > 1 ? "s" : ""} selected. File extraction comes later — paste notes for now.`);
  }

  const coreWarnings = useMemo(() => {
    const warnings: string[] = [];
    if (!form.sellerName.trim()) warnings.push("Add your business name (seller).");
    if (!form.buyerName.trim()) warnings.push("Add a customer name (buyer).");
    if (!form.invoiceNo.trim()) warnings.push("Add an invoice number.");
    if (!form.issueDate.trim()) warnings.push("Add an invoice date.");
    if (!form.itemDescription.trim()) warnings.push("Add a description.");
    if (!form.netAmount.trim()) warnings.push("Add an amount (net).");

    if (form.vatRegistered === "yes" && !form.sellerVat.trim()) warnings.push("VAT registered: add your VAT number.");
    if (form.buyerEInvoiceId.trim() && !form.buyerEInvoiceScheme.trim())
      warnings.push("You added a buyer Endpoint ID — pick an Endpoint scheme (recommended).");

    return warnings;
  }, [form]);

  function scrollToManual() {
    setManualOpen(true);
    setBuyerOpen(true);
    setInvoiceOpen(true);
    requestAnimationFrame(() => {
      manualTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function _summaryLine(ex: Extracted) {
    const conf = ex._confidence ? `(${ex._confidence} confidence)` : "";
    const s = ex._summary || "Draft applied.";
    return `${s} ${conf}`.trim();
  }

  function anyManualWorkStarted() {
    const defaults: Partial<FormState> = {
      vatRegistered: "yes",
      showUTR: "no",
      sellerCountry: "UK",
      buyerCountry: "UK",
      invoiceNo: "INV-001",
      currency: "GBP",
      invoiceTypeCode: "380",
      itemDescription: "Services",
      quantity: "1",
      unitCode: "EA",
      vatCategoryCode: "S",
      vatRate: "20",
      paymentMethod: "Bank transfer",
    };

    const current: Record<string, string> = form as unknown as Record<string, string>;
    const meaningful = Object.keys(current).filter((k) => {
      const v = current[k];
      if (isEmpty(v)) return false;
      if (k in defaults && String(defaults[k as keyof FormState] ?? "") === String(v)) return false;
      if (k === "issueDate") return false;
      return true;
    });

    return meaningful.length >= 2;
  }

  // ✅ Typed conversion (fixes Vercel TS error)
  function toFormValue<K extends keyof FormState>(key: K, incoming: unknown): FormState[K] {
    if (key === "vatRegistered" || key === "showUTR") {
      const v = incoming === "yes" || incoming === "no" ? incoming : "no";
      return v as FormState[K];
    }
    return String(incoming ?? "") as FormState[K];
  }

  function mergeExtracted(mode: "blankOnly" | "overwrite") {
    if (!pendingExtract) return;
    const { _summary, _confidence, ...raw } = pendingExtract;

    setForm((prev) => {
      const next: FormState = { ...prev };

      (Object.keys(raw) as (keyof FormState)[]).forEach((k) => {
        const incoming = raw[k];
        if (incoming === undefined) return;

        if (mode === "overwrite") {
          (next as any)[k] = toFormValue(k as any, incoming);
          return;
        }

        if (isEmpty(prev[k])) {
          (next as any)[k] = toFormValue(k as any, incoming);
        }
      });

      return next;
    });

    setShowApplyPrompt(false);
    setPendingExtract(null);
    setAiStatus(_summaryLine(pendingExtract));
    scrollToManual();
  }

  function handleAutoFill() {
    setStatus("");
    setAiStatus("");

    if (!pasteText.trim() && !aiStatus) {
      setAiStatus("Paste some notes first (file extraction comes later).");
      return;
    }

    const extracted = fakeExtractFromNotes(pasteText.trim());
    setPendingExtract(extracted);

    const started = anyManualWorkStarted();
    if (started) {
      setShowApplyPrompt(true);
    } else {
      setAiStatus(_summaryLine(extracted));
      mergeExtracted("blankOnly");
    }
  }

  // ✅ Forgiving: always go to preview
  function handlePreview() {
    setStatus("");

    if (coreWarnings.length) {
      setStatus(
        `Draft preview (missing: ${coreWarnings.slice(0, 3).join(" • ")}${coreWarnings.length > 3 ? " • …" : ""})`
      );
    }

    const params = new URLSearchParams();
    (Object.keys(form) as (keyof FormState)[]).forEach((k) => {
      if (form[k]) params.set(k, String(form[k]));
    });

    if (pasteText.trim()) params.set("sourceNotes", pasteText.trim());

    window.location.href = `/preview?${params.toString()}`;
  }

  const labelCls = "ff-label mb-1";
  const inputCls = "ff-input";
  const panelCls = "ff-panel-warm p-4 sm:p-5";
  const fieldWrap = "flex flex-col";

  return (
    <main className="ff-shell">
      <div className="ff-container max-w-4xl">
        <header className="-mt-4 sm:-mt-6 pt-0">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/branding/faffless-lockup26.png"
              alt="FAFFLESS"
              width={1200}
              height={400}
              priority
              className="h-auto w-[300px] sm:w-[420px] md:w-[520px] lg:w-[600px] drop-shadow-[0_10px_22px_rgba(0,0,0,0.14)]"
            />

            {/* BETA badge */}
            <div className="mt-2 inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] text-black/60 shadow-[0_8px_22px_rgba(0,0,0,0.06)]">
              BETA
            </div>

            <div className="-mt-1 max-w-3xl">
              <h1 className="ff-heroText text-[14px] sm:text-[28px] md:text-[40px] font-black tracking-tight text-black/82 leading-[1.38]">
                Free E-invoice Creator (MVP)
              </h1>

              <p className="ff-heroText mt-5 text-[12px] sm:text-[15px] md:text-[17px] font-semibold text-black/66 leading-snug">
                Paste a few notes to auto-fill, then tweak the fields and export XML/PDF.
              </p>
            </div>
          </div>
        </header>

        {/* SINGLE COLUMN STACK */}
        <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
          {/* AI / EXTRACTOR */}
          <section className={panelCls}>
            <details className="ff-details" open={aiOpen} onToggle={(e) => setAiOpen((e.target as HTMLDetailsElement).open)}>
              <summary className="ff-summary">
                <span className="flex-1 text-center">
                  <span className="block font-extrabold">Auto-fill from notes (recommended)</span>
                  <span className="block text-[11px] font-semibold text-black/55 mt-0.5">
                    Paste a quote / email / job notes — we’ll draft the invoice fields (files later)
                  </span>
                </span>
                <Chevron open={aiOpen} />
              </summary>

              <div className="px-4 pb-4">
                <div className="mt-2 grid grid-cols-1 gap-4">
                  <label className="block">
                    <div className="ff-label mb-2">Upload files (beta later)</div>
                    <div className="rounded-2xl border border-dashed border-black/20 bg-white/65 p-4 sm:p-5">
                      <input
                        type="file"
                        multiple
                        onChange={handleFiles}
                        className="block w-full text-sm text-black/70 file:mr-4 file:rounded-xl file:border-0 file:bg-black file:px-4 file:py-2 file:font-bold file:text-white hover:file:opacity-95"
                      />
                      <div className="mt-3 text-xs text-black/55 leading-5">For now, use “Paste notes” below for best results.</div>
                    </div>
                  </label>

                  <label className="block">
                    <div className="ff-label mb-2">Paste anything helpful</div>
                    <textarea
                      value={pasteText}
                      onChange={(e) => setPasteText(e.target.value)}
                      rows={7}
                      placeholder="Example: Invoice Acme Ltd for window cleaning completed in Feb, £120 net, due in 14 days..."
                      className={inputCls}
                    />
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button onClick={handleAutoFill} className="ff-btn-primary">
                      Auto-fill fields
                    </button>

                    <button onClick={scrollToManual} className="ff-btn-secondary" type="button">
                      Skip and fill manually
                    </button>
                  </div>

                  <div className="text-center text-xs text-black/70">{aiStatus}</div>
                </div>
              </div>
            </details>
          </section>

          {/* MANUAL */}
          <section className={panelCls} ref={manualTopRef}>
            <details className="ff-details" open={manualOpen} onToggle={(e) => setManualOpen((e.target as HTMLDetailsElement).open)}>
              <summary className="ff-summary">
                <span className="flex-1 text-center">
                  <span className="block font-extrabold">Manual fields</span>
                  <span className="block text-[11px] font-semibold text-black/55 mt-0.5">Fill in only what you need</span>
                </span>
                <Chevron open={manualOpen} />
              </summary>

              <div className="px-4 pb-4">
                <div className="mt-2 grid grid-cols-1 gap-3">
                  {/* BUYER */}
                  <details className="ff-details" open={buyerOpen} onToggle={(e) => setBuyerOpen((e.target as HTMLDetailsElement).open)}>
                    <summary className="ff-summary">
                      <span>
                        Buyer details
                        <span className="block text-[11px] font-semibold text-black/55 mt-0.5">Who the invoice is for</span>
                      </span>
                      <Chevron open={buyerOpen} />
                    </summary>

                    <div className="px-4 pb-4">
                      <div className="mt-2 grid grid-cols-1 gap-3">
                        <label className={fieldWrap}>
                          <div className={labelCls}>Customer name</div>
                          <input
                            value={form.buyerName}
                            onChange={(e) => setField("buyerName", e.target.value)}
                            placeholder="Customer / company"
                            className={inputCls}
                          />
                        </label>

                        <div className="rounded-2xl border border-black/10 bg-white/60 p-3">
                          <div className="text-[12px] font-extrabold text-black/70">E-invoice delivery (optional)</div>
                          <div className="mt-1 text-[11px] font-semibold text-black/55 leading-5">
                            If the customer is on Peppol, they’ll give you an Endpoint ID and a scheme.
                          </div>

                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <label className={fieldWrap}>
                              <div className={labelCls}>Endpoint scheme</div>
                              <select
                                value={form.buyerEInvoiceScheme}
                                onChange={(e) => setField("buyerEInvoiceScheme", e.target.value)}
                                className={inputCls}
                              >
                                {ENDPOINT_SCHEMES.map((s) => (
                                  <option key={s.value} value={s.value}>
                                    {s.label}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <label className={fieldWrap}>
                              <div className={labelCls}>Endpoint ID</div>
                              <input
                                value={form.buyerEInvoiceId}
                                onChange={(e) => setField("buyerEInvoiceId", e.target.value)}
                                placeholder="Ask customer: Endpoint / Peppol ID"
                                className={inputCls}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className={fieldWrap}>
                            <div className={labelCls}>Customer email</div>
                            <input
                              value={form.buyerEmail}
                              onChange={(e) => setField("buyerEmail", e.target.value)}
                              placeholder="ap@customer.com"
                              className={inputCls}
                            />
                          </label>

                          <label className={fieldWrap}>
                            <div className={labelCls}>Customer VAT number</div>
                            <input
                              value={form.buyerVat}
                              onChange={(e) => setField("buyerVat", e.target.value)}
                              placeholder="Optional"
                              className={inputCls}
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className={fieldWrap}>
                            <div className={labelCls}>Address line 1</div>
                            <input
                              value={form.buyerAddress1}
                              onChange={(e) => setField("buyerAddress1", e.target.value)}
                              placeholder="Street address"
                              className={inputCls}
                            />
                          </label>
                          <label className={fieldWrap}>
                            <div className={labelCls}>Address line 2</div>
                            <input
                              value={form.buyerAddress2}
                              onChange={(e) => setField("buyerAddress2", e.target.value)}
                              placeholder="Optional"
                              className={inputCls}
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <label className={fieldWrap}>
                            <div className={labelCls}>Town/City</div>
                            <input
                              value={form.buyerCity}
                              onChange={(e) => setField("buyerCity", e.target.value)}
                              placeholder="Manchester"
                              className={inputCls}
                            />
                          </label>
                          <label className={fieldWrap}>
                            <div className={labelCls}>Postcode</div>
                            <input
                              value={form.buyerPostcode}
                              onChange={(e) => setField("buyerPostcode", e.target.value)}
                              placeholder="M1 1AA"
                              className={inputCls}
                            />
                          </label>
                          <label className={fieldWrap}>
                            <div className={labelCls}>Country</div>
                            <input
                              value={form.buyerCountry}
                              onChange={(e) => setField("buyerCountry", e.target.value)}
                              placeholder="UK"
                              className={inputCls}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </details>

                  {/* SELLER */}
                  <details className="ff-details" open={sellerOpen} onToggle={(e) => setSellerOpen((e.target as HTMLDetailsElement).open)}>
                    <summary className="ff-summary">
                      <span>
                        Seller details
                        <span className="block text-[11px] font-semibold text-black/55 mt-0.5">Your business details</span>
                      </span>
                      <Chevron open={sellerOpen} />
                    </summary>

                    <div className="px-4 pb-4">
                      <div className="mt-2 grid grid-cols-1 gap-3">
                        <label className={fieldWrap}>
                          <div className={labelCls}>Business name</div>
                          <input
                            value={form.sellerName}
                            onChange={(e) => setField("sellerName", e.target.value)}
                            placeholder="Your business"
                            className={inputCls}
                          />
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className={fieldWrap}>
                            <div className={labelCls}>Email</div>
                            <input
                              value={form.sellerEmail}
                              onChange={(e) => setField("sellerEmail", e.target.value)}
                              placeholder="accounts@yourbusiness.com"
                              className={inputCls}
                            />
                          </label>
                          <label className={fieldWrap}>
                            <div className={labelCls}>Phone</div>
                            <input
                              value={form.sellerPhone}
                              onChange={(e) => setField("sellerPhone", e.target.value)}
                              placeholder="+44 ..."
                              className={inputCls}
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className={fieldWrap}>
                            <div className={labelCls}>Address line 1</div>
                            <input
                              value={form.sellerAddress1}
                              onChange={(e) => setField("sellerAddress1", e.target.value)}
                              placeholder="Street address"
                              className={inputCls}
                            />
                          </label>
                          <label className={fieldWrap}>
                            <div className={labelCls}>Address line 2</div>
                            <input
                              value={form.sellerAddress2}
                              onChange={(e) => setField("sellerAddress2", e.target.value)}
                              placeholder="Optional"
                              className={inputCls}
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <label className={fieldWrap}>
                            <div className={labelCls}>Town/City</div>
                            <input
                              value={form.sellerCity}
                              onChange={(e) => setField("sellerCity", e.target.value)}
                              placeholder="London"
                              className={inputCls}
                            />
                          </label>
                          <label className={fieldWrap}>
                            <div className={labelCls}>Postcode</div>
                            <input
                              value={form.sellerPostcode}
                              onChange={(e) => setField("sellerPostcode", e.target.value)}
                              placeholder="SW1A 1AA"
                              className={inputCls}
                            />
                          </label>
                          <label className={fieldWrap}>
                            <div className={labelCls}>Country</div>
                            <input
                              value={form.sellerCountry}
                              onChange={(e) => setField("sellerCountry", e.target.value)}
                              placeholder="UK"
                              className={inputCls}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </details>

                  {/* INVOICE */}
                  <details className="ff-details" open={invoiceOpen} onToggle={(e) => setInvoiceOpen((e.target as HTMLDetailsElement).open)}>
                    <summary className="ff-summary">
                      <span>
                        Invoice details
                        <span className="block text-[11px] font-semibold text-black/55 mt-0.5">
                          Dates, amount, VAT, payment and notes
                        </span>
                      </span>
                      <Chevron open={invoiceOpen} />
                    </summary>

                    <div className="px-4 pb-4">
                      <div className="mt-2 grid grid-cols-1 gap-3">
                        <label className={fieldWrap}>
                          <div className={labelCls}>Invoice number</div>
                          <input value={form.invoiceNo} onChange={(e) => setField("invoiceNo", e.target.value)} className={inputCls} />
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className={fieldWrap}>
                            <div className={labelCls}>Invoice date</div>
                            <input type="date" value={form.issueDate} onChange={(e) => setField("issueDate", e.target.value)} className={inputCls} />
                          </label>
                          <label className={fieldWrap}>
                            <div className={labelCls}>Due date</div>
                            <input type="date" value={form.dueDate} onChange={(e) => setField("dueDate", e.target.value)} className={inputCls} />
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className={fieldWrap}>
                            <div className={labelCls}>Currency</div>
                            <select value={form.currency} onChange={(e) => setField("currency", e.target.value)} className={inputCls}>
                              <option value="GBP">GBP (£)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="USD">USD ($)</option>
                            </select>
                          </label>

                          <label className={fieldWrap}>
                            <div className={labelCls}>PO number</div>
                            <input value={form.poNumber} onChange={(e) => setField("poNumber", e.target.value)} placeholder="Optional" className={inputCls} />
                          </label>
                        </div>

                        <label className={fieldWrap}>
                          <div className={labelCls}>Invoice type (MVP)</div>
                          <select value={form.invoiceTypeCode} onChange={(e) => setField("invoiceTypeCode", e.target.value)} className={inputCls}>
                            <option value="380">380 — Commercial invoice</option>
                            <option value="381">381 — Credit note (later)</option>
                          </select>
                        </label>

                        <label className={fieldWrap}>
                          <div className={labelCls}>What is this for?</div>
                          <input
                            value={form.itemDescription}
                            onChange={(e) => setField("itemDescription", e.target.value)}
                            placeholder="e.g. Window cleaning services"
                            className={inputCls}
                          />
                        </label>

                        <label className={fieldWrap}>
                          <div className={labelCls}>Amount (net)</div>
                          <input
                            value={form.netAmount}
                            onChange={(e) => setField("netAmount", e.target.value)}
                            placeholder="e.g. 120"
                            inputMode="decimal"
                            className={inputCls}
                          />
                        </label>

                        {/* VAT */}
                        <details className="ff-details mt-2" open={vatOpen} onToggle={(e) => setVatOpen((e.target as HTMLDetailsElement).open)}>
                          <summary className="ff-summary">
                            <span>
                              VAT + tax IDs
                              <span className="block text-[11px] font-semibold text-black/55 mt-0.5">Keep closed unless needed</span>
                            </span>
                            <Chevron open={vatOpen} />
                          </summary>

                          <div className="px-4 pb-4">
                            <div className="grid grid-cols-1 gap-3">
                              <label className={fieldWrap}>
                                <div className={labelCls}>Are you VAT registered?</div>
                                <select
                                  value={form.vatRegistered}
                                  onChange={(e) => setField("vatRegistered", e.target.value)}
                                  className={inputCls}
                                >
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                </select>
                              </label>

                              {form.vatRegistered === "yes" ? (
                                <>
                                  <label className={fieldWrap}>
                                    <div className={labelCls}>Your VAT number</div>
                                    <input
                                      value={form.sellerVat}
                                      onChange={(e) => setField("sellerVat", e.target.value)}
                                      placeholder="GB123456789"
                                      className={inputCls}
                                    />
                                  </label>

                                  <label className={fieldWrap}>
                                    <div className={labelCls}>VAT category (MVP)</div>
                                    <select value={form.vatCategoryCode} onChange={(e) => setField("vatCategoryCode", e.target.value)} className={inputCls}>
                                      <option value="S">S — Standard rated</option>
                                      <option value="Z">Z — Zero rated</option>
                                      <option value="E">E — Exempt</option>
                                      <option value="O">O — Outside scope</option>
                                    </select>
                                  </label>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <label className={fieldWrap}>
                                      <div className={labelCls}>VAT rate %</div>
                                      <input
                                        value={form.vatRate}
                                        onChange={(e) => setField("vatRate", e.target.value)}
                                        inputMode="decimal"
                                        className={inputCls}
                                        placeholder="20"
                                      />
                                    </label>
                                    <label className={fieldWrap}>
                                      <div className={labelCls}>VAT amount</div>
                                      <input value={form.vatAmount} readOnly className={inputCls} />
                                    </label>
                                    <label className={fieldWrap}>
                                      <div className={labelCls}>Total</div>
                                      <input value={form.totalAmount} readOnly className={inputCls} />
                                    </label>
                                  </div>
                                </>
                              ) : (
                                <label className={fieldWrap}>
                                  <div className={labelCls}>Total</div>
                                  <input value={form.totalAmount} readOnly className={inputCls} />
                                </label>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <label className={fieldWrap}>
                                  <div className={labelCls}>UTR (optional)</div>
                                  <input value={form.sellerUTR} onChange={(e) => setField("sellerUTR", e.target.value)} placeholder="10-digit UTR" className={inputCls} />
                                </label>
                                <label className={fieldWrap}>
                                  <div className={labelCls}>Show UTR on invoice?</div>
                                  <select value={form.showUTR} onChange={(e) => setField("showUTR", e.target.value)} className={inputCls}>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                  </select>
                                </label>
                              </div>
                            </div>
                          </div>
                        </details>

                        {/* Payment */}
                        <details className="ff-details mt-2" open={paymentOpen} onToggle={(e) => setPaymentOpen((e.target as HTMLDetailsElement).open)}>
                          <summary className="ff-summary">
                            <span>
                              Bank / payment details
                              <span className="block text-[11px] font-semibold text-black/55 mt-0.5">Optional (shown on invoice/PDF)</span>
                            </span>
                            <Chevron open={paymentOpen} />
                          </summary>

                          <div className="px-4 pb-4">
                            <div className="mt-2 grid grid-cols-1 gap-3">
                              <label className={fieldWrap}>
                                <div className={labelCls}>Payment method</div>
                                <select value={form.paymentMethod} onChange={(e) => setField("paymentMethod", e.target.value)} className={inputCls}>
                                  <option>Bank transfer</option>
                                  <option>Card</option>
                                  <option>Cash</option>
                                  <option>Direct debit</option>
                                  <option>Other</option>
                                </select>
                              </label>

                              <label className={fieldWrap}>
                                <div className={labelCls}>Bank name</div>
                                <input value={form.bankName} onChange={(e) => setField("bankName", e.target.value)} placeholder="Optional" className={inputCls} />
                              </label>

                              <label className={fieldWrap}>
                                <div className={labelCls}>Account name</div>
                                <input value={form.accountName} onChange={(e) => setField("accountName", e.target.value)} placeholder="Optional" className={inputCls} />
                              </label>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className={fieldWrap}>
                                  <div className={labelCls}>Sort code</div>
                                  <input value={form.sortCode} onChange={(e) => setField("sortCode", e.target.value)} placeholder="12-34-56" className={inputCls} />
                                </label>
                                <label className={fieldWrap}>
                                  <div className={labelCls}>Account number</div>
                                  <input value={form.accountNumber} onChange={(e) => setField("accountNumber", e.target.value)} placeholder="12345678" className={inputCls} />
                                </label>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className={fieldWrap}>
                                  <div className={labelCls}>IBAN</div>
                                  <input value={form.iban} onChange={(e) => setField("iban", e.target.value)} placeholder="Optional" className={inputCls} />
                                </label>
                                <label className={fieldWrap}>
                                  <div className={labelCls}>SWIFT/BIC</div>
                                  <input value={form.swift} onChange={(e) => setField("swift", e.target.value)} placeholder="Optional" className={inputCls} />
                                </label>
                              </div>
                            </div>
                          </div>
                        </details>

                        {/* Notes */}
                        <details className="ff-details mt-2" open={notesOpen} onToggle={(e) => setNotesOpen((e.target as HTMLDetailsElement).open)}>
                          <summary className="ff-summary">
                            <span>
                              Notes + email
                              <span className="block text-[11px] font-semibold text-black/55 mt-0.5">Optional</span>
                            </span>
                            <Chevron open={notesOpen} />
                          </summary>

                          <div className="px-4 pb-4">
                            <div className="mt-2 grid grid-cols-1 gap-3">
                              <label className="block">
                                <div className={labelCls}>Notes</div>
                                <textarea
                                  value={form.notes}
                                  onChange={(e) => setField("notes", e.target.value)}
                                  placeholder="Payment terms, project reference, etc."
                                  rows={4}
                                  className={inputCls}
                                />
                              </label>

                              <label className="block">
                                <div className={labelCls}>Email address (optional)</div>
                                <input
                                  value={form.sendToEmail}
                                  onChange={(e) => setField("sendToEmail", e.target.value)}
                                  placeholder="Used on next page for the draft email"
                                  className={inputCls}
                                />
                              </label>
                            </div>
                          </div>
                        </details>

                        {coreWarnings.length ? (
                          <div className="rounded-2xl border border-black/10 bg-white/60 p-3 text-xs font-semibold text-black/60 leading-5">
                            <div className="font-extrabold text-black/70">Optional checks (still ok to preview):</div>
                            <ul className="mt-1 list-disc pl-5 space-y-1">
                              {coreWarnings.slice(0, 5).map((w) => (
                                <li key={w}>{w}</li>
                              ))}
                              {coreWarnings.length > 5 ? <li>…and more</li> : null}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </details>
          </section>

          {/* Bottom buttons: Home (1/4) + Preview (3/4) */}
          <div className="pt-1">
            <div className="grid grid-cols-4 gap-3">
              <a
                href="/"
                className="col-span-1 inline-flex items-center justify-center rounded-2xl bg-white/65 py-4 font-extrabold transition border border-black/20 hover:bg-white/85 active:bg-white/70"
              >
                Home
              </a>

              <button onClick={handlePreview} className="ff-btn-primary col-span-3">
                Preview draft
              </button>
            </div>

            <div className="mt-3 text-center text-xs text-black/70 break-words">{status}</div>
          </div>
        </div>
      </div>

      {/* Apply prompt modal */}
      {showApplyPrompt && pendingExtract ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-lg rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
            <div className="text-[16px] font-black text-black/85">Apply auto-fill to your form?</div>
            <div className="mt-2 text-sm font-semibold text-black/65 leading-6">
              You’ve already started typing. Choose how to apply the draft:
            </div>

            <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.02] p-3 text-xs font-semibold text-black/60 leading-5">
              <div className="font-extrabold text-black/70">Draft summary</div>
              <div className="mt-1">{_summaryLine(pendingExtract)}</div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3">
              <button className="ff-btn-primary" onClick={() => mergeExtracted("blankOnly")}>
                Fill blanks only (recommended)
              </button>

              <button className="ff-btn-secondary" onClick={() => mergeExtracted("overwrite")}>
                Overwrite my fields with the draft
              </button>

              <button
                className="w-full rounded-2xl bg-white/65 py-3 font-extrabold transition border border-black/20 hover:bg-white/85 active:bg-white/70"
                onClick={() => {
                  setShowApplyPrompt(false);
                  setPendingExtract(null);
                  setAiStatus("Auto-fill cancelled.");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        .ff-heroText {
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.92), 0 10px 28px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </main>
  );
}