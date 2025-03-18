const express = require("express");
const { generatePDF } = require("../services/generatePDFService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const x = req.body;
    const pdf = await generatePDF(x);
    res.json({ success: true, pdf, error: null });
  } catch (error) {
    console.error("Error generando PDF:", error);
    res.status(500).json({ success: false, pdf: null, error: error.message });
  }
});

module.exports = router;
