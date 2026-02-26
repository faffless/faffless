"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type FormState = {
  vatRegistered: "yes" | "no";
  showUTR: "yes" | "no";
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
  buyerName: string;
  buyerEmail: string;
  buyerVat: string;
  buyerEInvoiceId: string;
  buyerAddress1: string;
  buyerAddress2: string;
  buyerCity: string;
  buyerPostcode: string;
  buyerCountry: string;
  invoiceNo: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  poNumber: string;
  itemDescription: string;
  netAmount: string;
  vatRate: string;
  vatAmount: string;
  totalAmount: string;
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

export default function ManualBuilderPage() {
  const [status, setStatus] = useState("");

  const [vatOpen, setVatOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(true);
  const [buyerOptionalOpen, setBuyerOptionalOpen] = useState(false);
  const [sellerOptionalOpen, setSellerOptionalOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const [form, setForm] = useState<FormState>({
    vatRegistered: "no",
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
    itemDescription: "Services",
    netAmount: "",
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

  useEffect(() => {
    setForm((prev) => (prev.issueDate ? prev : { ...prev, issueDate: todayISO() }));
  }, []);

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

  const requiredMissing =
    !form.invoiceNo ||
    !form.issueDate ||
    !form.itemDescription ||
    !form.netAmount ||
    !form.buyerName ||
    !form.sellerName;

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

  const labelCls = "ff-label mb-1";
  const inputCls = "ff-input";
  const panelCls = "ff-panel-warm p-4 sm:p-5";
  const titleCls = "ff-title mb-3";
  const fieldWrap = "flex flex-col";

  return (
    <main className="ff-shell">
      <div className="ff-container">
        <header className="-mt-4 sm:-mt-6 pt-0">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/brand/faffless-lockup5.png"
              alt="FAFFLESS"
              width={1200}
              height={400}
              priority
              className="h-auto w-[300px] sm:w-[420px] md:w-[520px] lg:w-[600px] drop-shadow-[0_10px_22px_rgba(0,0,0,0.14)]"
            />
            <div className="-mt-1">
              <p className="ff-heroText text-[18px] sm:text-[20px] font-extrabold tracking-tight text-black/75 leading-tight">
                Easy invoice builder
              </p>
              <p className="ff-heroText mt-0.5 text-[13px] sm:text-[15px] font-semibold text-black/60 leading-tight">
                Fill in what you need, then check everything on the final preview page.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-2xl bg-white/75 px-5 py-3 font-extrabold transition border border-black/20 hover:bg-white/90 active:bg-white/75"
          >
            Back
          </button>
        </div>

        <div className="mt-4 sm:mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <section className={panelCls}>
              <div className={titleCls}>Invoice details</div>

              <div className="grid grid-cols-1 gap-3">
                <label className={fieldWrap}>
                  <div className={labelCls}>Invoice number *</div>
                  <input
                    value={form.invoiceNo}
                    onChange={(e) => setField("invoiceNo", e.target.value)}
                    className={inputCls}
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={fieldWrap}>
                    <div className={labelCls}>Invoice date *</div>
                    <input
                      type="date"
                      value={form.issueDate}
                      onChange={(e) => setField("issueDate", e.target.value)}
                      className={inputCls}
                    />
                  </label>
                  <label className={fieldWrap}>
                    <div className={labelCls}>Due date</div>
                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setField("dueDate", e.target.value)}
                      className={inputCls}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={fieldWrap}>
                    <div className={labelCls}>Currency</div>
                    <select
                      value={form.currency}
                      onChange={(e) => setField("currency", e.target.value)}
                      className={inputCls}
                    >
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </label>
                  <label className={fieldWrap}>
                    <div className={labelCls}>PO number</div>
                    <input
                      value={form.poNumber}
                      onChange={(e) => setField("poNumber", e.target.value)}
                      placeholder="Optional"
                      className={inputCls}
                    />
                  </label>
                </div>

                <label className={fieldWrap}>
                  <div className={labelCls}>What is this for? *</div>
                  <input
                    value={form.itemDescription}
                    onChange={(e) => setField("itemDescription", e.target.value)}
                    placeholder="e.g. Web design services"
                    className={inputCls}
                  />
                </label>

                <label className={fieldWrap}>
                  <div className={labelCls}>Amount (net) *</div>
                  <input
                    value={form.netAmount}
                    onChange={(e) => setField("netAmount", e.target.value)}
                    placeholder="e.g. 1000"
                    inputMode="decimal"
                    className={inputCls}
                  />
                </label>

                <details
                  className="ff-details mt-2"
                  open={vatOpen}
                  onToggle={(e) => setVatOpen((e.target as HTMLDetailsElement).open)}
                >
                  <summary className="ff-summary">
                    <span>
                      VAT + tax IDs (optional)
                      <span className="block text-[11px] font-semibold text-black/55 mt-0.5">
                        Leave collapsed unless you need VAT on the invoice
                      </span>
                    </span>
                    <Chevron open={vatOpen} />
                  </summary>

                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-1 gap-3">
                      <label className={fieldWrap}>
                        <div className={labelCls}>Are you VAT registered?</div>
                        <select
                          value={form.vatRegistered}
                          onChange={(e) =>
                            setField("vatRegistered", e.target.value as "yes" | "no")
                          }
                          className={inputCls}
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
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

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <label className={fieldWrap}>
                              <div className={labelCls}>VAT rate %</div>
                              <input
                                value={form.vatRate}
                                onChange={(e) => setField("vatRate", e.target.value)}
                                inputMode="decimal"
                                className={inputCls}
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
                          <input
                            value={form.sellerUTR}
                            onChange={(e) => setField("sellerUTR", e.target.value)}
                            placeholder="10-digit UTR"
                            className={inputCls}
                          />
                        </label>
                        <label className={fieldWrap}>
                          <div className={labelCls}>Show UTR on invoice?</div>
                          <select
                            value={form.showUTR}
                            onChange={(e) => setField("showUTR", e.target.value as "yes" | "no")}
                            className={inputCls}
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </section>

            <section className={panelCls}>
              <details
                className="ff-details"
                open={paymentOpen}
                onToggle={(e) => setPaymentOpen((e.target as HTMLDetailsElement).open)}
              >
                <summary className="ff-summary">
                  <span>
                    Bank / payment details
                    <span className="block text-[11px] font-semibold text-black/55 mt-0.5">
                      Include these if you want them shown on the invoice
                    </span>
                  </span>
                  <Chevron open={paymentOpen} />
                </summary>

                <div className="px-4 pb-4">
                  <div className="mt-2 grid grid-cols-1 gap-3">
                    <label className={fieldWrap}>
                      <div className={labelCls}>Payment method</div>
                      <select
                        value={form.paymentMethod}
                        onChange={(e) => setField("paymentMethod", e.target.value)}
                        className={inputCls}
                      >
                        <option>Bank transfer</option>
                        <option>Card</option>
                        <option>Cash</option>
                        <option>Direct debit</option>
                        <option>Other</option>
                      </select>
                    </label>

                    <label className={fieldWrap}>
                      <div className={labelCls}>Bank name</div>
                      <input
                        value={form.bankName}
                        onChange={(e) => setField("bankName", e.target.value)}
                        placeholder="Optional"
                        className={inputCls}
                      />
                    </label>

                    <label className={fieldWrap}>
                      <div className={labelCls}>Account name</div>
                      <input
                        value={form.accountName}
                        onChange={(e) => setField("accountName", e.target.value)}
                        placeholder="Optional"
                        className={inputCls}
                      />
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className={fieldWrap}>
                        <div className={labelCls}>Sort code</div>
                        <input
                          value={form.sortCode}
                          onChange={(e) => setField("sortCode", e.target.value)}
                          placeholder="12-34-56"
                          className={inputCls}
                        />
                      </label>
                      <label className={fieldWrap}>
                        <div className={labelCls}>Account number</div>
                        <input
                          value={form.accountNumber}
                          onChange={(e) => setField("accountNumber", e.target.value)}
                          placeholder="12345678"
                          className={inputCls}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className={fieldWrap}>
                        <div className={labelCls}>IBAN</div>
                        <input
                          value={form.iban}
                          onChange={(e) => setField("iban", e.target.value)}
                          placeholder="Optional"
                          className={inputCls}
                        />
                      </label>
                      <label className={fieldWrap}>
                        <div className={labelCls}>SWIFT/BIC</div>
                        <input
                          value={form.swift}
                          onChange={(e) => setField("swift", e.target.value)}
                          placeholder="Optional"
                          className={inputCls}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </details>
            </section>
          </div>

          <div className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <section className={panelCls}>
              <div className={titleCls}>Seller</div>

              <div className="grid grid-cols-1 gap-3">
                <label className={fieldWrap}>
                  <div className={labelCls}>Business name *</div>
                  <input
                    value={form.sellerName}
                    onChange={(e) => setField("sellerName", e.target.value)}
                    placeholder="Your business"
                    className={inputCls}
                  />
                </label>

                <details
                  className="ff-details mt-2"
                  open={sellerOptionalOpen}
                  onToggle={(e) => setSellerOptionalOpen((e.target as HTMLDetailsElement).open)}
                >
                  <summary className="ff-summary">
                    <span>
                      Optional seller details
                      <span className="block text-[11px] font-semibold text-black/55 mt-0.5">
                        Contact + address (only if you want them on the invoice)
                      </span>
                    </span>
                    <Chevron open={sellerOptionalOpen} />
                  </summary>

                  <div className="px-4 pb-4">
                    <div className="mt-2 grid grid-cols-1 gap-3">
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
              </div>
            </section>

            <section className={panelCls}>
              <div className={titleCls}>Buyer</div>

              <div className="grid grid-cols-1 gap-3">
                <label className={fieldWrap}>
                  <div className={labelCls}>Customer name *</div>
                  <input
                    value={form.buyerName}
                    onChange={(e) => setField("buyerName", e.target.value)}
                    placeholder="Customer / company"
                    className={inputCls}
                  />
                </label>

                <label className={fieldWrap}>
                  <div className={labelCls}>Buyer e-invoice delivery ID (optional)</div>
                  <input
                    value={form.buyerEInvoiceId}
                    onChange={(e) => setField("buyerEInvoiceId", e.target.value)}
                    placeholder="Ask customer: Peppol ID / Endpoint ID"
                    className={inputCls}
                  />
                </label>

                <details
                  className="ff-details mt-2"
                  open={buyerOptionalOpen}
                  onToggle={(e) => setBuyerOptionalOpen((e.target as HTMLDetailsElement).open)}
                >
                  <summary className="ff-summary">
                    <span>
                      Optional buyer details
                      <span className="block text-[11px] font-semibold text-black/55 mt-0.5">
                        Email, VAT number + address (only if needed)
                      </span>
                    </span>
                    <Chevron open={buyerOptionalOpen} />
                  </summary>

                  <div className="px-4 pb-4">
                    <div className="mt-2 grid grid-cols-1 gap-3">
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
              </div>
            </section>
          </div>

          <div className="mt-5 sm:mt-6">
            <section className={panelCls}>
              <details
                className="ff-details"
                open={notesOpen}
                onToggle={(e) => setNotesOpen((e.target as HTMLDetailsElement).open)}
              >
                <summary className="ff-summary">
                  <span>
                    Notes + email (optional)
                    <span className="block text-[11px] font-semibold text-black/55 mt-0.5">
                      Leave this closed unless you actually need it
                    </span>
                  </span>
                  <Chevron open={notesOpen} />
                </summary>

                <div className="px-4 pb-4">
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="block md:col-span-2">
                      <div className={labelCls}>Notes</div>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setField("notes", e.target.value)}
                        placeholder="Payment terms, project reference, etc."
                        rows={4}
                        className={inputCls}
                      />
                    </label>

                    <label className="block md:col-span-2">
                      <div className={labelCls}>Email address (optional)</div>
                      <input
                        value={form.sendToEmail}
                        onChange={(e) => setField("sendToEmail", e.target.value)}
                        placeholder="Used on next page (email sending comes later)"
                        className={inputCls}
                      />
                    </label>
                  </div>
                </div>
              </details>
            </section>
          </div>

          <div className="mt-6">
            <button onClick={handlePreview} className="ff-btn-primary">
              Preview &amp; finish
            </button>
            <div className="mt-3 text-center text-xs text-black/70 break-words">{status}</div>
            <div className="mt-2 text-center text-xs text-black/55">
              * Required: invoice number/date, description, amount, buyer name, seller name.
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ff-heroText {
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.92),
            0 10px 28px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </main>
  );
}