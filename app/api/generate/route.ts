import { NextResponse } from "next/server";
import { create } from "xmlbuilder2";

type Data = Record<string, string>;

function safe(v: unknown) {
  return String(v ?? "").trim();
}

function toNumber(v: string) {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function money2(n: number) {
  return (Math.round(n * 100) / 100).toFixed(2);
}

// For MVP we keep this minimal.
// Later we will replace these with exact Peppol BIS Billing 3.0 identifiers.
const DEFAULT_CUSTOMIZATION_ID = "urn:peppol:bis:billing:3.0";
const DEFAULT_PROFILE_ID = "urn:peppol:profile:billing:01:1.0";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Data;

    // Header
    const invoiceNo = safe(data.invoiceNo) || "INV-001";
    const issueDate = safe(data.issueDate) || new Date().toISOString().slice(0, 10);
    const dueDate = safe(data.dueDate);
    const currency = safe(data.currency) || "GBP";
    const poNumber = safe(data.poNumber);
    const invoiceTypeCode = safe(data.invoiceTypeCode) || "380";

    // Parties
    const sellerName = safe(data.sellerName) || "Seller";
    const sellerVat = safe(data.sellerVat);
    const sellerEmail = safe(data.sellerEmail);
    const sellerPhone = safe(data.sellerPhone);
    const sellerAddress1 = safe(data.sellerAddress1);
    const sellerAddress2 = safe(data.sellerAddress2);
    const sellerCity = safe(data.sellerCity);
    const sellerPostcode = safe(data.sellerPostcode);
    const sellerCountry = safe(data.sellerCountry) || "UK";

    const buyerName = safe(data.buyerName) || "Buyer";
    const buyerEmail = safe(data.buyerEmail);
    const buyerVat = safe(data.buyerVat);
    const buyerAddress1 = safe(data.buyerAddress1);
    const buyerAddress2 = safe(data.buyerAddress2);
    const buyerCity = safe(data.buyerCity);
    const buyerPostcode = safe(data.buyerPostcode);
    const buyerCountry = safe(data.buyerCountry) || "UK";

    // Endpoint (scheme + id)
    const buyerEndpointScheme = safe(data.buyerEInvoiceScheme);
    const buyerEndpointId = safe(data.buyerEInvoiceId);

    // Line (single-line MVP)
    const itemDescription = safe(data.itemDescription) || "Services";
    const quantity = safe(data.quantity) || "1";
    const unitCode = safe(data.unitCode) || "EA";

    const net = toNumber(safe(data.netAmount));
    const vatRegistered = safe(data.vatRegistered) === "yes";
    const vatCategoryCode =
      safe(data.vatCategoryCode) || (vatRegistered ? "S" : "O");

    // VAT rate only meaningful for certain categories; MVP: if VAT registered, use it.
    const vatRate = vatRegistered ? toNumber(safe(data.vatRate) || "20") : 0;

    const vatAmount = vatRegistered ? net * (vatRate / 100) : 0;
    const total = net + vatAmount;

    const net2 = money2(net);
    const vat2 = money2(vatAmount);
    const total2 = money2(total);

    // Payment (optional, kept simple)
    const paymentMethod = safe(data.paymentMethod);
    const bankName = safe(data.bankName);
    const accountName = safe(data.accountName);
    const sortCode = safe(data.sortCode);
    const accountNumber = safe(data.accountNumber);
    const iban = safe(data.iban);
    const swift = safe(data.swift);

    // Notes
    const notes = safe(data.notes);

    // Build UBL XML
    const doc = create({ version: "1.0", encoding: "UTF-8" })
      .ele("Invoice", {
        xmlns: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
        "xmlns:cac":
          "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
        "xmlns:cbc":
          "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
      })

      // Peppol identifiers (MVP placeholders)
      .ele("cbc:CustomizationID")
      .txt(DEFAULT_CUSTOMIZATION_ID)
      .up()
      .ele("cbc:ProfileID")
      .txt(DEFAULT_PROFILE_ID)
      .up()

      .ele("cbc:ID")
      .txt(invoiceNo)
      .up()
      .ele("cbc:IssueDate")
      .txt(issueDate)
      .up()
      .ele("cbc:InvoiceTypeCode")
      .txt(invoiceTypeCode)
      .up()
      .ele("cbc:DocumentCurrencyCode")
      .txt(currency)
      .up();

    if (dueDate) doc.ele("cbc:DueDate").txt(dueDate).up();

    if (poNumber) {
      doc.ele("cac:OrderReference").ele("cbc:ID").txt(poNumber).up().up();
    }

    if (notes) {
      doc.ele("cbc:Note").txt(notes).up();
    }

    // Supplier party
    const supParty = doc
      .ele("cac:AccountingSupplierParty")
      .ele("cac:Party");

    supParty.ele("cac:PartyName").ele("cbc:Name").txt(sellerName).up().up();

    // Supplier contact (optional)
    if (sellerEmail || sellerPhone) {
      const contact = supParty.ele("cac:Contact");
      if (sellerPhone) contact.ele("cbc:Telephone").txt(sellerPhone).up();
      if (sellerEmail) contact.ele("cbc:ElectronicMail").txt(sellerEmail).up();
      contact.up();
    }

    // Supplier address
    const supAddr = supParty.ele("cac:PostalAddress");
    if (sellerAddress1) supAddr.ele("cbc:StreetName").txt(sellerAddress1).up();
    if (sellerAddress2)
      supAddr.ele("cbc:AdditionalStreetName").txt(sellerAddress2).up();
    if (sellerCity) supAddr.ele("cbc:CityName").txt(sellerCity).up();
    if (sellerPostcode) supAddr.ele("cbc:PostalZone").txt(sellerPostcode).up();
    supAddr
      .ele("cac:Country")
      .ele("cbc:IdentificationCode")
      .txt(sellerCountry)
      .up()
      .up();
    supAddr.up();

    // Supplier VAT (only if VAT registered + provided)
    if (vatRegistered && sellerVat) {
      supParty
        .ele("cac:PartyTaxScheme")
        .ele("cbc:CompanyID")
        .txt(sellerVat)
        .up()
        .ele("cac:TaxScheme")
        .ele("cbc:ID")
        .txt("VAT")
        .up()
        .up()
        .up();
    }

    supParty.up().up(); // Party, AccountingSupplierParty

    // Customer party
    const cusParty = doc
      .ele("cac:AccountingCustomerParty")
      .ele("cac:Party");

    if (buyerEndpointId) {
      if (buyerEndpointScheme) {
        cusParty
          .ele("cbc:EndpointID", { schemeID: buyerEndpointScheme })
          .txt(buyerEndpointId)
          .up();
      } else {
        cusParty.ele("cbc:EndpointID").txt(buyerEndpointId).up();
      }
    }

    cusParty.ele("cac:PartyName").ele("cbc:Name").txt(buyerName).up().up();

    // Buyer contact (optional)
    if (buyerEmail) {
      cusParty
        .ele("cac:Contact")
        .ele("cbc:ElectronicMail")
        .txt(buyerEmail)
        .up()
        .up();
    }

    // Buyer VAT (optional)
    if (buyerVat) {
      cusParty
        .ele("cac:PartyTaxScheme")
        .ele("cbc:CompanyID")
        .txt(buyerVat)
        .up()
        .ele("cac:TaxScheme")
        .ele("cbc:ID")
        .txt("VAT")
        .up()
        .up()
        .up();
    }

    // Buyer address
    const cusAddr = cusParty.ele("cac:PostalAddress");
    if (buyerAddress1) cusAddr.ele("cbc:StreetName").txt(buyerAddress1).up();
    if (buyerAddress2)
      cusAddr.ele("cbc:AdditionalStreetName").txt(buyerAddress2).up();
    if (buyerCity) cusAddr.ele("cbc:CityName").txt(buyerCity).up();
    if (buyerPostcode) cusAddr.ele("cbc:PostalZone").txt(buyerPostcode).up();
    cusAddr
      .ele("cac:Country")
      .ele("cbc:IdentificationCode")
      .txt(buyerCountry)
      .up()
      .up();
    cusAddr.up();

    cusParty.up().up(); // Party, AccountingCustomerParty

    // Payment info (optional; MVP)
    // NOTE: For strict Peppol, PaymentMeansCode must be coded (UNCL4461),
    // and bank data should be structured precisely. We'll refine later.
    if (
      paymentMethod ||
      bankName ||
      accountName ||
      sortCode ||
      accountNumber ||
      iban ||
      swift
    ) {
      const pm = doc.ele("cac:PaymentMeans");

      // Very light mapping for now. We refine to UNCL4461 codes later.
      // "30" is commonly used for credit transfer.
      const pmCode =
        paymentMethod.toLowerCase().includes("bank") ? "30" : "ZZZ";
      pm.ele("cbc:PaymentMeansCode").txt(pmCode).up();

      if (iban || accountNumber) {
        const acct = pm.ele("cac:PayeeFinancialAccount");
        if (accountName) acct.ele("cbc:Name").txt(accountName).up();
        if (iban) acct.ele("cbc:ID").txt(iban).up();
        if (!iban && accountNumber) acct.ele("cbc:ID").txt(accountNumber).up();

        // Financial institution (SWIFT/BIC)
        if (swift || bankName) {
          const fi = acct.ele("cac:FinancialInstitutionBranch");
          if (swift) fi.ele("cbc:ID").txt(swift).up();
          if (bankName) fi.ele("cbc:Name").txt(bankName).up();
          fi.up();
        }

        acct.up();
      }

      // UK sort code is not a standard UBL field; we leave it out of structured fields for now.
      // You can still show it on the PDF.
      pm.up();
    }

    // Tax total + subtotal (helps systems)
    const taxTotal = doc.ele("cac:TaxTotal");
    taxTotal.ele("cbc:TaxAmount", { currencyID: currency }).txt(vat2).up();

    const taxSub = taxTotal.ele("cac:TaxSubtotal");
    taxSub.ele("cbc:TaxableAmount", { currencyID: currency }).txt(net2).up();
    taxSub.ele("cbc:TaxAmount", { currencyID: currency }).txt(vat2).up();

    const taxCat = taxSub.ele("cac:TaxCategory");
    taxCat.ele("cbc:ID").txt(vatCategoryCode).up();
    if (vatRegistered) taxCat.ele("cbc:Percent").txt(money2(vatRate)).up();
    taxCat.ele("cac:TaxScheme").ele("cbc:ID").txt("VAT").up().up();
    taxCat.up();

    taxSub.up();
    taxTotal.up();

    // Legal totals
    const totals = doc.ele("cac:LegalMonetaryTotal");
    totals.ele("cbc:LineExtensionAmount", { currencyID: currency }).txt(net2).up();
    totals.ele("cbc:TaxExclusiveAmount", { currencyID: currency }).txt(net2).up();
    totals.ele("cbc:TaxInclusiveAmount", { currencyID: currency }).txt(total2).up();
    totals.ele("cbc:PayableAmount", { currencyID: currency }).txt(total2).up();
    totals.up();

    // Invoice line
    const line = doc.ele("cac:InvoiceLine");
    line.ele("cbc:ID").txt("1").up();
    line
      .ele("cbc:InvoicedQuantity", { unitCode })
      .txt(String(toNumber(quantity) || 1))
      .up();
    line.ele("cbc:LineExtensionAmount", { currencyID: currency }).txt(net2).up();

    const item = line.ele("cac:Item");
    item.ele("cbc:Name").txt(itemDescription).up();

    const cls = item.ele("cac:ClassifiedTaxCategory");
    cls.ele("cbc:ID").txt(vatCategoryCode).up();
    if (vatRegistered) cls.ele("cbc:Percent").txt(money2(vatRate)).up();
    cls.ele("cac:TaxScheme").ele("cbc:ID").txt("VAT").up().up();
    cls.up();

    item.up();

    // Price (unit price for MVP = net / qty)
    const qtyNum = toNumber(quantity) || 1;
    const unitPrice = qtyNum ? net / qtyNum : net;
    const price = line.ele("cac:Price");
    price
      .ele("cbc:PriceAmount", { currencyID: currency })
      .txt(money2(unitPrice))
      .up();
    price.up();

    line.up();

    const xml = doc.end({ prettyPrint: true });

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