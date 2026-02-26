import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { seller = "", buyer = "", invoiceNo = "", date = "" } = await req.json();

    // Build a very simple XML (edit to your required schema)
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<invoice>
  <seller>${escapeXml(seller)}</seller>
  <buyer>${escapeXml(buyer)}</buyer>
  <invoiceNo>${escapeXml(invoiceNo)}</invoiceNo>
  <date>${escapeXml(date)}</date>
</invoice>
`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Content-Disposition": 'attachment; filename="invoice.xml"',
      },
    });
  } catch (err: any) {
    return new NextResponse(err?.message || "Bad Request", { status: 400 });
  }
}

function escapeXml(v: string) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}