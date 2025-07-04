import React from "react";
import ReactDOMServer from "react-dom/server";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import InvoiceGenerator from "./InvoiceGenerator.js";

async function generatePDF(data) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString("es-ES", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}. ${year}`;
  };

  const capitalizeText = (text) => {
    if (text === null || text === undefined) {
      return "";
    }

    text = String(text);
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

  const isNull = (value) => {
    if (value === null || value === undefined) {
      return true;
    }
  };

  const element = React.createElement(InvoiceGenerator, {
    invoiceNumber: `${data.num_factura} - ${data.año_factura}`,
    date: formatDate(data.fecha_factura),
    clientNumber: data.id_cliente,
    clientName: isNull(data.cliente) ? "" : data.cliente.toUpperCase(),
    clientAddress: capitalizeText(data.direccion),
    clientCity: isNull(data.ciudad) ? "" : data.ciudad.toUpperCase(),
    clientPostalCode: data.cod_postal,
    clientState: isNull(data.provincia) ? "" : data.provincia.toUpperCase(),
    clientCountry: isNull(data.pais) ? "" : data.pais.toUpperCase(),
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

  // Lanzar navegador con Playwright
  const browser = await playwright.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
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

export { generatePDF };
