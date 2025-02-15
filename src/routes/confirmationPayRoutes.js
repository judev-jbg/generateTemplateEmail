const express = require("express");
const { generateTemplate } = require("../services/confirmationPayService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const [order, customer, address] = req.body;
    const html = await generateTemplate(order, customer, address);
    res.json({ success: true, html, error: null });
  } catch (error) {
    res.status(500).json({ success: false, html: null, error: error.message });
  }
});

module.exports = router;
