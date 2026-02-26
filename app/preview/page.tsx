"use client";

import Image from "next/image";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Data = Record<string, string>;

function safe(v: string | null) {
  return (v ?? "").trim();
}

function LandingLogoMini() {
  return (
    <Image
      src="/brand/faffless-lockup10n.png"
      alt="FAFFLESS"
      width={1200}
      height={400}
      priority
      className="h-auto w-[150px] sm:w-[185px] md:w-[210px] drop-shadow-[0_6px_16px_rgba(0,0,0,0.10)]"
    />
  );
}

function textOrMissing(value: string, fallback = "Not added yet") {
  return value || fallback;
}

function moneyLine(currency: string, value: string, fallback = "Not added yet") {
  if (!value) return fallback;
  return `${currency || ""} ${value}`.trim();
}

function joinParts(parts: string[]) {
  return parts.filter(Boolean).join(", ");
}

function FieldLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const isMissing = !value;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/8 py-2">
      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-black/45">
        {label}
      </div>
      <div
        className={`text-right text-[14px] ${
          isMissing ? "text-black/35 italic" : "text-black/78"
        }`}
      >
        {textOrMissing(value)}
      </div>
    </div>
  );
}

function InvoiceBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="text-[12px] font-black uppercase tracking-[0.12em] text-black/45">
        {title}
      </div>
      <div className="mt-3 space-y-1 text-[14px] leading-6 text-black/78">{children}</div>
    </section>
  );
}

function PreviewPageContent() {
  const sp = useSearchParams();
  const [status, setStatus] = useState("");

  const data: Data = useMemo(() => {
    const keys = [
      "vatRegistered",
      "showUTR",

      "sellerName",
      "sellerEmail",
      "sellerPhone",
      "sellerVat",
      "sellerUTR",
      "sellerAddress1",
      "sellerAddress2",
      "sellerCity",
      "sellerPostcode",
      "sellerCountry",

      "buyerName",
      "buyerEmail",
      "buyerVat",
      "buyerEInvoiceId",
      "buyerAddress1",
      "buyerAddress2",
      "buyerCity",
      "buyerPostcode",
      "buyerCountry",

      "invoiceNo",
      "issueDate",
      "dueDate",
      "currency",
      "poNumber",

      "itemDescription",
      "netAmount",
      "vatRate",
      "vatAmount",
      "totalAmount",

      "paymentMethod",
      "bankName",
      "accountName",
      "sortCode",
      "accountNumber",
      "iban",
      "swift",

      "notes",
      "sendToEmail",
      "sourceNotes",
    ] as const;

    const out: Data = {};
    keys.forEach((k) => (out[k] = safe(sp.get(k))));
    return out;
  }, [sp]);

  const buyerDisplay = data.buyerName || "your customer";
  const hasEndpoint = Boolean(data.buyerEInvoiceId);

  const sellerAddress = joinParts([
    data.sellerAddress1,
    data.sellerAddress2,
    data.sellerCity,
    data.sellerPostcode,
    data.sellerCountry,
  ]);

  const buyerAddress = joinParts([
    data.buyerAddress1,
    data.buyerAddress2,
    data.buyerCity,
    data.buyerPostcode,
    data.buyerCountry,
  ]);

  const displayNet = moneyLine(data.currency, data.netAmount, "No amount added yet");
  const displayVat =
    data.vatRegistered === "yes"
      ? moneyLine(data.currency, data.vatAmount, "No VAT amount yet")
      : "Not VAT registered";
  const displayTotal = moneyLine(
    data.currency,
    data.totalAmount || data.netAmount,
    "No total yet"
  );

  const btnPrimary = "ff-btn-primary";
  const btnSecondary = "ff-btn-secondary";
  const btnGhost =
    "w-full rounded-2xl bg-white/65 py-3 font-extrabold transition border border-black/20 hover:bg-white/85 active:bg-white/70";

  async function downloadFrom(endpoint: string, filename: string) {
    try {
      setStatus("Creating…");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setStatus(`Error: ${res.status} ${res.statusText}`);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      setStatus(`Downloaded ${filename}`);
    } catch {
      setStatus("Error downloading file.");
    }
  }

  function openEmailDraft() {
    const to = (data.sendToEmail || data.buyerEmail || "").trim();
    const subject = encodeURIComponent(
      `Invoice ${data.invoiceNo || "draft"} from ${data.sellerName || "your business"}`
    );

    const lines: string[] = [];
    lines.push("Hi,");
    lines.push("");
    lines.push("Please find the invoice details below:");
    lines.push(`- Invoice: ${data.invoiceNo || "Draft"}`);
    if (data.issueDate) lines.push(`- Date: ${data.issueDate}`);
    if (data.dueDate) lines.push(`- Due date: ${data.dueDate}`);
    if (data.poNumber) lines.push(`- PO number: ${data.poNumber}`);
    if (data.itemDescription) lines.push(`- Description: ${data.itemDescription}`);
    if (displayTotal !== "No total yet") lines.push(`- Total: ${displayTotal}`);
    lines.push("");

    if (data.buyerEInvoiceId) {
      lines.push(`E-invoice delivery ID: ${data.buyerEInvoiceId}`);
      lines.push("");
    }

    lines.push("You can attach either:");
    lines.push("1) an e-invoice XML for accounting systems, or");
    lines.push("2) a PDF for human-readable sharing.");
    lines.push("");

    if (data.notes) {
      lines.push("Notes:");
      lines.push(data.notes);
      lines.push("");
    }

    lines.push("From,");
    lines.push(data.sellerName || "");

    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${encodeURIComponent(
      to
    )}?subject=${subject}&body=${body}`;
  }

  function sendEInvoice() {
    if (!hasEndpoint) {
      setStatus(
        "To transmit direct to the customer’s system, you still need their e-invoice delivery ID (sometimes called Endpoint ID or Peppol ID)."
      );
      return;
    }

    if (
      !data.sellerName ||
      !data.buyerName ||
      !data.invoiceNo ||
      !data.issueDate ||
      !data.itemDescription ||
      !data.netAmount
    ) {
      setStatus(
        "Before transmitting, add the core invoice details: seller name, buyer name, invoice number, invoice date, description and amount."
      );
      return;
    }

    setStatus(
      "Direct transmission is the next build step. For now, download the e-invoice XML below and send or upload it using the customer’s required route."
    );
  }

  return (
    <main className="ff-shell">
      <div className="w-full max-w-5xl">
        <div className="ff-card px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-2xl bg-white/70 px-4 py-2 font-extrabold transition border border-black/20 hover:bg-white/90 active:bg-white/75"
            >
              Back to edit
            </button>

            <div className="text-center flex-1 flex justify-center">
              <LandingLogoMini />
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-2xl bg-white/70 px-4 py-2 font-extrabold transition border border-black/20 hover:bg-white/90 active:bg-white/75"
            >
              Start again
            </button>
          </div>
        </div>

        <div className="mt-6 ff-panel-warm p-4 sm:p-6">
          <div className="text-center font-extrabold text-black/85">
            Check the draft before you continue
          </div>

          <p className="mt-2 text-center text-sm leading-6 text-black/65">
            This page shows a human-readable preview of the invoice data. When you send a real
            e-invoice, the accounting system reads structured data fields rather than this page
            design, so the layout here is only for review.
          </p>
        </div>

        <div className="mt-6 rounded-[28px] border border-black/10 bg-white/70 p-3 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="mx-auto w-full max-w-[900px] rounded-[10px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="px-6 py-7 sm:px-10 sm:py-10">
              <div className="flex flex-col gap-8 border-b border-black/10 pb-8 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-[26px] font-black tracking-tight text-black/88">
                    Invoice draft
                  </div>
                  <div className="mt-2 text-sm text-black/55">
                    Visual preview for checking the invoice details
                  </div>
                </div>

                <div className="w-full max-w-[320px]">
                  <FieldLine label="Invoice number" value={data.invoiceNo} />
                  <FieldLine label="Invoice date" value={data.issueDate} />
                  <FieldLine label="Due date" value={data.dueDate} />
                  <FieldLine label="Currency" value={data.currency} />
                  <FieldLine label="PO number" value={data.poNumber} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 border-b border-black/10 py-8 sm:grid-cols-2">
                <InvoiceBlock title="From">
                  <div className="font-bold text-black/88">
                    {data.sellerName || (
                      <span className="text-black/35 italic">No seller name added yet</span>
                    )}
                  </div>

                  {data.sellerEmail ? <div>{data.sellerEmail}</div> : null}
                  {data.sellerPhone ? <div>{data.sellerPhone}</div> : null}
                  {sellerAddress ? <div>{sellerAddress}</div> : null}
                  {data.vatRegistered === "yes" && data.sellerVat ? (
                    <div>VAT: {data.sellerVat}</div>
                  ) : null}
                  {data.showUTR === "yes" && data.sellerUTR ? (
                    <div>UTR: {data.sellerUTR}</div>
                  ) : null}
                </InvoiceBlock>

                <InvoiceBlock title="Bill to">
                  <div className="font-bold text-black/88">
                    {data.buyerName || (
                      <span className="text-black/35 italic">No buyer name added yet</span>
                    )}
                  </div>

                  {data.buyerEmail ? <div>{data.buyerEmail}</div> : null}
                  {buyerAddress ? <div>{buyerAddress}</div> : null}
                  {data.buyerVat ? <div>VAT: {data.buyerVat}</div> : null}
                  {data.buyerEInvoiceId ? <div>Delivery ID: {data.buyerEInvoiceId}</div> : null}
                </InvoiceBlock>
              </div>

              <div className="py-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-0">
                    <thead>
                      <tr>
                        <th className="border-b border-black/12 pb-3 text-left text-[12px] font-black uppercase tracking-[0.1em] text-black/45">
                          Description
                        </th>
                        <th className="border-b border-black/12 pb-3 text-right text-[12px] font-black uppercase tracking-[0.1em] text-black/45">
                          Net
                        </th>
                        <th className="border-b border-black/12 pb-3 text-right text-[12px] font-black uppercase tracking-[0.1em] text-black/45">
                          VAT
                        </th>
                        <th className="border-b border-black/12 pb-3 text-right text-[12px] font-black uppercase tracking-[0.1em] text-black/45">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b border-black/8 py-4 pr-4 align-top text-[14px] text-black/80">
                          {data.itemDescription || (
                            <span className="text-black/35 italic">
                              No invoice description added yet
                            </span>
                          )}
                        </td>
                        <td className="border-b border-black/8 py-4 text-right align-top text-[14px] text-black/80">
                          {data.netAmount ? displayNet : <span className="text-black/35 italic">No amount added yet</span>}
                        </td>
                        <td className="border-b border-black/8 py-4 text-right align-top text-[14px] text-black/80">
                          {data.vatRegistered === "yes" ? (
                            <>
                              {displayVat}
                              {data.vatRate ? ` (${data.vatRate}%)` : ""}
                            </>
                          ) : (
                            "Not VAT registered"
                          )}
                        </td>
                        <td className="border-b border-black/8 py-4 text-right align-top text-[14px] font-semibold text-black/88">
                          {data.netAmount || data.totalAmount ? displayTotal : <span className="text-black/35 italic">No total yet</span>}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 border-b border-black/10 pb-8 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <InvoiceBlock title="Payment details">
                    {data.paymentMethod ? <div>Method: {data.paymentMethod}</div> : null}
                    {data.bankName ? <div>Bank: {data.bankName}</div> : null}
                    {data.accountName ? <div>Account name: {data.accountName}</div> : null}
                    {data.sortCode ? <div>Sort code: {data.sortCode}</div> : null}
                    {data.accountNumber ? <div>Account number: {data.accountNumber}</div> : null}
                    {data.iban ? <div>IBAN: {data.iban}</div> : null}
                    {data.swift ? <div>SWIFT/BIC: {data.swift}</div> : null}
                  </InvoiceBlock>

                  <InvoiceBlock title="Notes">
                    {data.notes ? (
                      <div className="whitespace-pre-wrap">{data.notes}</div>
                    ) : (
                      <div className="text-black/35 italic">No notes added yet</div>
                    )}
                  </InvoiceBlock>
                </div>

                <div className="sm:pl-8">
                  <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                    <div className="flex items-center justify-between border-b border-black/8 py-2 text-sm text-black/75">
                      <span>Net amount</span>
                      <span className="font-semibold text-black/88">
                        {data.netAmount ? displayNet : <span className="text-black/35 italic">No amount added yet</span>}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-black/8 py-2 text-sm text-black/75">
                      <span>VAT</span>
                      <span className="font-semibold text-black/88">{displayVat}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 text-[16px] font-black text-black/88">
                      <span>Total</span>
                      <span>
                        {data.netAmount || data.totalAmount ? displayTotal : <span className="text-black/35 italic">No total yet</span>}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 text-[12px] leading-6 text-black/48">
                This is a visual preview only. The real e-invoice is a structured data file used by
                accounting systems, so the presentation of this page is only for checking the
                invoice information before sending.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 ff-panel-warm p-4 sm:p-6">
          <div className="text-center font-extrabold text-black/85">Choose what to do next</div>
          <p className="mt-2 text-center text-sm leading-6 text-black/65">
            Transmit the e-invoice if the customer has a delivery ID, or download the version you
            need.
          </p>

          <div className="mt-4">
            <button onClick={sendEInvoice} className={btnPrimary}>
              Transmit e-invoice to {buyerDisplay}
              <div className="text-xs font-semibold text-white/70 mt-1">
                {hasEndpoint ? "Delivery ID provided" : "Needs delivery ID / endpoint"}
              </div>
            </button>
          </div>

          <div className="mt-4 text-center text-xs text-black/60">Other options</div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => downloadFrom("/api/generate", "invoice.xml")}
              className={btnSecondary}
            >
              Download e-invoice XML
              <div className="text-[11px] font-semibold text-black/55 mt-1">
                Structured file for systems
              </div>
            </button>

            <button
              onClick={() => downloadFrom("/api/pdf", "invoice.pdf")}
              className={btnGhost}
            >
              Download PDF
              <div className="text-[11px] font-semibold text-black/50 mt-1">
                Human-readable invoice
              </div>
            </button>

            <button onClick={openEmailDraft} className={btnGhost}>
              Open email draft
              <div className="text-[11px] font-semibold text-black/50 mt-1">
                Attach XML or PDF
              </div>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button onClick={() => (window.location.href = "/")} className="ff-btn-secondary">
              Back to edit
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-2xl bg-white/65 py-3 font-extrabold transition border border-black/20 hover:bg-white/85 active:bg-white/70"
            >
              Start again
            </button>
          </div>

          <div className="mt-3 text-center text-xs text-black/70">{status}</div>
        </div>
      </div>
    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<main className="ff-shell"><div className="w-full max-w-5xl text-center py-20 text-black/60">Loading preview…</div></main>}>
      <PreviewPageContent />
    </Suspense>
  );
}