const React = require("react");
const ReactDOMServer = require("react-dom/server");
const puppeteer = require("puppeteer-core");
const InvoiceGenerator = require("../components/InvoiceGenerator");

async function generatePDF(data) {
  const browser = null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleDateString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}. ${year}`;
  };

  const element = React.createElement(InvoiceGenerator, {
    invoiceNumber: data.num_factura,
    date: formatDate(data.fecha_factura),
    clientNumber: data.id_cliente,
    clientName: data.cliente,
    clientAddress: data.direccion,
    clientCity: data.ciudad,
    clientState: data.provincia,
    clientCountry: data.pais,
    clientNIF: data.nif,
    orderNumber: data.id_pedido_cliente,
    albaran: data.num_albaran,
    dateAlbaran: formatDate(data.fecha_albaran),
    items: data.products,
    subtotal: data.total_iva_excl,
    tax: data.total_iva,
    total: data.total_iva_incl,
  });
  const html = ReactDOMServer.renderToString(InvoiceGenerator(element));

  const fullHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
    
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    </style>

      ${html}
    </body>
  </html>
`;

  browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  await page.setContent(fullHtml);

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdf.toString("base64");
}

module.exports = { generatePDF };
