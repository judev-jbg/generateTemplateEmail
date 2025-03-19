const React = require("react");
const ReactDOMServer = require("react-dom/server");
const puppeteer = require("puppeteer-core");
const InvoiceGenerator = require("../components/InvoiceGenerator");

async function generatePDF(data) {
  let browser = null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleDateString("es-ES", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}. ${year}`;
  };

  const capitalizeText = (text) => {
    const palabras = text.split(" ");

    const palabrasCapitalizadas = palabras.map((palabra) => {
      // Manejar palabras vacías
      if (palabra.length === 0) return palabra;

      // Convertir la primera letra a mayúscula y el resto a minúscula
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });

    // Unir las palabras nuevamente
    return palabrasCapitalizadas.join(" ");
  };

  const element = React.createElement(InvoiceGenerator, {
    invoiceNumber: `${data.num_factura} - ${data.año_factura}`,
    date: formatDate(data.fecha_factura),
    clientNumber: data.id_cliente,
    clientName: data.cliente.toUpperCase(),
    clientAddress: capitalizeText(data.direccion),
    clientCity: data.ciudad.toUpperCase(),
    clientPostalCode: data.cod_postal,
    clientState: data.provincia.toUpperCase(),
    clientCountry: data.pais.toUpperCase(),
    clientNIF: data.nif,
    orderNumber: data.id_pedido_cliente,
    albaran: data.num_albaran,
    dateAlbaran: formatDate(data.fecha_albaran),
    items: data.products.map((item) => ({
      id_articulo: item.product.id_articulo,
      descripcion: item.product.descripcion,
      cantidad: item.product.cantidad,
      precio: item.product.precio,
      descuento: item.product.descuento || 0,
      total: item.product.total,
    })),
    subtotal: data.total_iva_excl,
    tax: data.total_iva,
    total: data.total_iva_incl,
  });

  const html = ReactDOMServer.renderToString(element);

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
