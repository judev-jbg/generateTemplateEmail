const express = require("express");
const cors = require("cors");
const { config } = require("./src/config/config");
const emailRoutes = require("./src/routes/confirmationPayRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/emails/confirmationPay/", emailRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
