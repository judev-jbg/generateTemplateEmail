import { logger } from "../lib/logger.js";

export default async function handler(req, res) {
  logger.info("=== HEALTH CHECK ===", {
    method: req.method,
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV,
    region: process.env.VERCEL_REGION,
    nodeVersion: process.version,
  });

  try {
    // Test básico de funcionalidad
    const testData = {
      status: "OK",
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV || "unknown",
      region: process.env.VERCEL_REGION || "unknown",
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      endpoints: [
        "/api/health",
        "/api/confirmationInvoice",
        "/api/confirmationPay",
        "/api/confirmationShip",
        "/api/generatePDF",
      ],
    };

    // Test de módulos críticos
    try {
      await import("../lib/confirmationInvoiceService.js");
      testData.confirmationInvoiceService = "OK";
    } catch (e) {
      testData.confirmationInvoiceService = `ERROR: ${e.message}`;
    }

    try {
      await import("../lib/generatePDFService.js");
      testData.generatePDFService = "OK";
    } catch (e) {
      testData.generatePDFService = `ERROR: ${e.message}`;
    }

    logger.info("Health check completado", testData);

    res.status(200).json(testData);
  } catch (error) {
    logger.error("Error en health check", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      status: "ERROR",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
