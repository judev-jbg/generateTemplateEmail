import React from "react";
import ReactDOMServer from "react-dom/server";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import InvoiceGenerator from "./InvoiceGenerator.js";

async function generatePDF(data) {
  logger.info("=== INICIO generatePDF Service ===", {
    invoiceNumber: data.num_factura,
    hasProducts: !!data.products,
    productsCount: data.products?.length || 0,
  });

  try {
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

    logger.info("Creando elemento React...");
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

    logger.info("Renderizando componente a HTML...");
    const html = ReactDOMServer.renderToString(element);
    logger.info("HTML renderizado", { htmlLength: html.length });

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

    logger.info("Iniciando navegador Chromium...");
    const browser = await playwright.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    logger.info("Navegador iniciado, creando página...");
    const page = await browser.newPage();

    logger.info("Configurando contenido HTML...");
    await page.setContent(fullHtml);

    logger.info("Generando PDF...");
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    logger.info("Cerrando navegador...");
    await browser.close();

    logger.info("PDF generado exitosamente", {
      pdfSize: pdf.length,
      invoiceNumber: data.num_factura,
    });

    return pdf.toString("base64");
  } catch (error) {
    logger.error("Error en generatePDF Service", {
      message: error.message,
      stack: error.stack,
      invoiceNumber: data.num_factura,
    });
    throw error;
  }
}

export { generatePDF };
