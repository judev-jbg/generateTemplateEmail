const express = require("express");
const cors = require("cors");
const { config } = require("./src/config/config");
const confirmationPayRoute = require("./src/routes/confirmationPayRoutes");
const confirmationshipRoute = require("./src/routes/confirmationShipRoutes");
const confirmationInvoiceRoute = require("./src/routes/confirmationInvoiceRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/emails/confirmationPay/", confirmationPayRoute);
app.use("/api/emails/confirmationShip/", confirmationshipRoute);
app.use("/api/emails/confirmationInvoice/", confirmationInvoiceRoute);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
