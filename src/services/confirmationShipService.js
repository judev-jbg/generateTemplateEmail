const fs = require("fs").promises;
const path = require("path");

async function generateTemplate(order, customer, address) {
  const template = await fs.readFile(
    path.join(__dirname, "../templates/confirmationShipEmail.html"),
    "utf8"
  );

  const normalizeOrderRows = (order_data) => {
    if (order_data.associations && order_data.associations.order_rows) {
      const orderRows = order_data.associations.order_rows;

      // Si order_row es un objeto, lo convertimos en un array
      if (orderRows.order_row && !Array.isArray(orderRows.order_row)) {
        orderRows.order_row = [orderRows.order_row];
      }
    }
    return order_data;
  };

  const order_normalize = normalizeOrderRows(order);

  // Hacer todos los reemplazos necesarios
  let htmlContent = template
    .replace("{{firstname}}", customer.firstname)
    .replace("{{reference}}", order_normalize.reference)
    .replace("{{carrier}}", "GLS")
    .replaceAll("{{tracking_number}}", order_normalize.shipping_number._)
    .replace("{{cp_destination}}", address.postcode);

  if (address.address2 && address.address2 !== "") {
    htmlContent = htmlContent.replace(
      "{{address}}",
      `${address.address1}, ${address.address2},<br>${address.postcode} ${address.city}`
    );
  } else {
    htmlContent = htmlContent.replace(
      "{{address}}",
      `${address.address1},<br>${address.postcode} ${address.city}`
    );
  }
  return htmlContent;
}

module.exports = { generateTemplate };
