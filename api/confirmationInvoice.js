import { generateTemplate } from "../lib/confirmationInvoiceService.js";

export default async function handler(req, res) {
  // Headers CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      html: null,
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const { order, customer, address } = req.body;

    if (!order || !customer || !address) {
      return res.status(400).json({
        success: false,
        html: null,
        error: "Missing required fields: order, customer, address",
      });
    }

    const html = await generateTemplate(order, customer, address);

    res.status(200).json({
      success: true,
      html,
      error: null,
    });
  } catch (error) {
    console.error("Error in confirmationInvoice:", error);
    res.status(500).json({
      success: false,
      html: null,
      error: error.message,
    });
  }
}
