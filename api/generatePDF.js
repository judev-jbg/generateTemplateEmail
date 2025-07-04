import { generatePDF } from "../lib/generatePDFService.js";
import { logger } from "../lib/logger.js";

export default async function handler(req, res) {
  logger.info("=== INICIO generatePDF endpoint ===", {
    method: req.method,
    url: req.url,
    environment: process.env.VERCEL_ENV,
    vercelRegion: process.env.VERCEL_REGION,
  });

  try {
    // Headers CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      logger.info("Petición OPTIONS - respondiendo con 200");
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      logger.warn("Método no permitido", { method: req.method });
      return res.status(405).json({
        success: false,
        pdf: null,
        error: "Method not allowed. Use POST.",
      });
    }

    const content = req.body;
    logger.info("Contenido recibido", {
      hasContent: !!content,
      hasData: !!(content && content.data),
      invoiceNumber: content?.data?.num_factura,
    });

    if (!content || !content.data) {
      logger.error("Campo data faltante");
      return res.status(400).json({
        success: false,
        pdf: null,
        error: "Missing required field: data",
      });
    }

    logger.info("Iniciando generación de PDF", {
      invoiceNumber: content.data.num_factura,
      productsCount: content.data.products?.length || 0,
    });

    const pdf = await generatePDF(content.data);

    logger.info("PDF generado exitosamente", {
      pdfSize: pdf.length,
      invoiceNumber: content.data.num_factura,
    });

    res.status(200).json({
      success: true,
      pdf,
      error: null,
    });

    logger.info("=== FIN generatePDF endpoint - SUCCESS ===");
  } catch (error) {
    logger.error("Error generando PDF", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    });

    res.status(500).json({
      success: false,
      pdf: null,
      error: error.message,
    });
  }
}
