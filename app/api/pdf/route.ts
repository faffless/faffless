import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Data = Record<string, string>;
const safe = (v: unknown) => String(v ?? "").trim();

function toNumber(v: string) {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
function money2(n: number) {
  return (Math.round(n * 100) / 100).toFixed(2);
}

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (!raw) return new NextResponse("Empty request body", { status: 400 });

    let data: Data;
    try {
      data = JSON.parse(raw) as Data;
    } catch {
      return new NextResponse("Invalid JSON body", { status: 400 });
    }

    const currency = safe(data.currency) || "GBP";
    const net = toNumber(safe(data.netAmount));
    const vatRegistered = safe(data.vatRegistered) === "yes";
    const vatRate = vatRegistered ? toNumber(safe(data.vatRate) || "20") : 0;
    const vatAmount = vatRegistered ? net * (vatRate / 100) : 0;
    const total = net + vatAmount;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica); // built-in (no afm files)
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = 800;
    const left = 50;

    const draw = (text: string, size = 11, isBold = false) => {
      page.drawText(text, { x: left, y, size, font: isBold ? bold : font });
      y -= size + 6;
    };

    // Header
    draw("Invoice", 22, true);
    y -= 6;
    draw(`Invoice number: ${safe(data.invoiceNo) || "INV-001"}`);
    if (safe(data.issueDate)) draw(`Invoice date: ${safe(data.issueDate)}`);
    if (safe(data.dueDate)) draw(`Due date: ${safe(data.dueDate)}`);
    y -= 10;

    // From
    draw("From", 12, true);
    draw(safe(data.sellerName) || "Seller");
    const sellerAddr = [data.sellerAddress1, data.sellerAddress2, data.sellerCity, data.sellerPostcode, data.sellerCountry]
      .map(safe).filter(Boolean).join(", ");
    if (sellerAddr) draw(sellerAddr);
    if (safe(data.sellerEmail)) draw(safe(data.sellerEmail));
    if (safe(data.sellerPhone)) draw(safe(data.sellerPhone));
    if (vatRegistered && safe(data.sellerVat)) draw(`VAT: ${safe(data.sellerVat)}`);
    y -= 10;

    // Bill to
    draw("Bill to", 12, true);
    draw(safe(data.buyerName) || "Buyer");
    const buyerAddr = [data.buyerAddress1, data.buyerAddress2, data.buyerCity, data.buyerPostcode, data.buyerCountry]
      .map(safe).filter(Boolean).join(", ");
    if (buyerAddr) draw(buyerAddr);
    if (safe(data.buyerEmail)) draw(safe(data.buyerEmail));
    if (safe(data.buyerVat)) draw(`VAT: ${safe(data.buyerVat)}`);
    y -= 10;

    // Line
    draw("Description", 12, true);
    draw(safe(data.itemDescription) || "Services");
    y -= 10;

    // Totals
    draw("Totals", 12, true);
    draw(`Net: ${currency} ${money2(net)}`);
    if (vatRegistered) draw(`VAT (${money2(vatRate)}%): ${currency} ${money2(vatAmount)}`);
    draw(`Total: ${currency} ${money2(total)}`, 12, true);

    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="invoice.pdf"',
      },
    });
  } catch (err: any) {
    console.error("API /api/pdf error:", err);
    return new NextResponse(
      JSON.stringify({ error: err?.message || String(err) }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}