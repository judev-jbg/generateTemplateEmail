const fs = require("fs").promises;
const path = require("path");

async function generateTemplate(order, customer, address) {
  const template = await fs.readFile(
    path.join(__dirname, "../templates/confirmationInvoiceEmail.html"),
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

  // Generar filas de productos
  const productRows = order_normalize.associations.order_rows.order_row
    .map(
      (product) => `
    <tr style="vertical-align: top">
      <td><strong>${product.product_quantity}x</strong></td>
      <td class="x_product">
        <table border="0" cellspacing="0" cellpadding="0" width="100%" role="presentation">
          <tbody>
            <tr>
              <td>${product.product_name}</td>
            </tr>
          </tbody>
        </table>
      </td>
      <td style="white-space: nowrap" align="right">
        <table
          border="0"
          cellspacing="0"
          cellpadding="0"
          width="100%"
          role="presentation"
        >
          <tbody>
            <tr>
              <td
                style="white-space: nowrap !important"
                align="right"
              >
                ${Math.round(Number(product.unit_price_tax_incl)).toFixed(2)} €
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  `
    )
    .join("");
  // Generar sección detalles de envío
  const detailShippingSection =
    Number(order_normalize.total_shipping_tax_incl) !== 0
      ? Number(order_normalize.total_shipping_tax_incl) ===
        Number(order_normalize.total_shipping_tax_excl)
        ? `
            <tr>
            <td
              style="
                color: rgb(168, 168, 168) !important;
                font-size: 0.875em;
                padding-top: 5px;
              "
              data-ogsc="rgb(110, 110, 110)"
            >
              Base imponible ${(
                Number(order_normalize.total_shipping_tax_incl) / 1.21
              ).toFixed(2)} € más IVA (21%)
              ${(
                Number(order_normalize.total_shipping_tax_incl) -
                parseFloat(
                  (
                    Number(order_normalize.total_shipping_tax_incl) / 1.21
                  ).toFixed(2)
                )
              ).toFixed(2)} €
            </td>
            </tr>
          `
        : `
            <tr>
            <td
              style="
                color: rgb(168, 168, 168) !important;
                font-size: 0.875em;
                padding-top: 5px;
              "
              data-ogsc="rgb(110, 110, 110)"
            >
              Base imponible ${Number(
                order_normalize.total_shipping_tax_excl
              ).toFixed(2)} € más IVA (${order_normalize.carrier_tax_rate}%)
              ${(
                Number(order_normalize.total_shipping_tax_incl) -
                Number(order_normalize.total_shipping_tax_excl)
              ).toFixed(2)} €
            </td>
            </tr>
          `
      : "";
  // Generar sección total de envío
  const totalShippingSection =
    Number(order_normalize.total_shipping_tax_incl) === 0
      ? `
      <td>
        <span
          class="x_product__promotion"
          data-ogsc=""
          data-ogsb=""
          style="
            color: rgb(255, 255, 255) !important;
            background-color: rgb(99, 60, 0) !important;
            padding: 5px 10px;
            border-radius: 5px;
          "
        >Gratis</span>
      </td>
      `
      : `
      <td
        style="white-space: nowrap !important; vertical-align: top"
        align="right"
      >
        ${Number(order_normalize.total_shipping_tax_incl).toFixed(2)} €
      </td>
    `;
  // Hacer todos los reemplazos necesarios
  let htmlContent = template
    .replace("{{firstname}}", customer.firstname)
    .replace("{{reference}}", order_normalize.reference)
    .replace("{{products_table_content}}", productRows)
    .replace("{{detail_shipping_section}}", detailShippingSection)
    .replace("{{total_shipping_section}}", totalShippingSection)
    .replace(
      "{{total_products}}",
      Number(order_normalize.total_products_wt).toFixed(2)
    )
    .replace(
      "{{total}}",
      Number(order_normalize.total_paid_tax_incl).toFixed(2)
    );
  if (address.address2 && address.address2 !== "") {
    htmlContent = htmlContent
      .replace(
        "{{address}}",
        `${address.address1}, ${address.address2},<br>${address.postcode} ${address.city}`
      )
      .replace("{{customer}}", address.customer)
      .replace("{{number_invoice}}", address.num_invoice);
  } else {
    htmlContent = htmlContent
      .replace(
        "{{address}}",
        `${address.address},<br>${address.postcode} ${address.city}`
      )
      .replace("{{customer}}", address.customer)
      .replace("{{number_invoice}}", address.num_invoice);
  }
  return htmlContent;
}

module.exports = { generateTemplate };
