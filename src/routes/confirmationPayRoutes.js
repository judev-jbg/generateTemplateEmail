const express = require("express");
const { generateTemplate } = require("../services/confirmationPayService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const [order] = req.body.data;
    const html = await generateTemplate(order);
    res.json({ success: true, html: html, error: null });
  } catch (error) {
    res.status(500).json({ success: false, html: null, error: error.message });
  }
});

module.exports = router;
