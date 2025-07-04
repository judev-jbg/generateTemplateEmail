import { generateTemplate } from "../lib/confirmationInvoiceService.js";
import { logger } from "../lib/logger.js";

export default async function handler(req, res) {
  logger.info("=== INICIO confirmationInvoice endpoint ===", {
    method: req.method,
    url: req.url,
    headers: Object.keys(req.headers),
    environment: process.env.VERCEL_ENV,
  });

  try {
    // Headers CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    logger.info("Headers CORS configurados");

    if (req.method === "OPTIONS") {
      logger.info("Petición OPTIONS - respondiendo con 200");
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      logger.warn("Método no permitido", { method: req.method });
      return res.status(405).json({
        success: false,
        html: null,
        error: "Method not allowed. Use POST.",
      });
    }

    logger.info("Procesando petición POST", {
      bodyKeys: req.body ? Object.keys(req.body) : "no body",
      bodySize: req.body ? JSON.stringify(req.body).length : 0,
    });

    const { order, customer, address } = req.body;

    if (!order || !customer || !address) {
      logger.error("Campos requeridos faltantes", {
        hasOrder: !!order,
        hasCustomer: !!customer,
        hasAddress: !!address,
      });
      return res.status(400).json({
        success: false,
        html: null,
        error: "Missing required fields: order, customer, address",
      });
    }

    logger.info("Llamando a generateTemplate...");
    const html = await generateTemplate(order, customer, address);
    logger.info("Template generado exitosamente", { htmlLength: html.length });

    res.status(200).json({
      success: true,
      html,
      error: null,
    });

    logger.info("=== FIN confirmationInvoice endpoint - SUCCESS ===");
  } catch (error) {
    logger.error("Error en confirmationInvoice", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    res.status(500).json({
      success: false,
      html: null,
      error: error.message,
    });
  }
}
