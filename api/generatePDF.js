import { generatePDF } from "../lib/generatePDFService.js";

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
      pdf: null,
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const content = req.body;

    if (!content || !content.data) {
      return res.status(400).json({
        success: false,
        pdf: null,
        error: "Missing required field: data",
      });
    }

    console.log("Generating PDF for invoice:", content.data.num_factura);

    const pdf = await generatePDF(content.data);

    res.status(200).json({
      success: true,
      pdf,
      error: null,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({
      success: false,
      pdf: null,
      error: error.message,
    });
  }
}
