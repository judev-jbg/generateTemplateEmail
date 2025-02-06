const fs = require("fs").promises;
const path = require("path");

async function generateTemplate({
  reference,
  associations,
  addressAddition,
  customerAddition,
  total_shipping_tax_incl,
  total_shipping_tax_excl,
  carrier_tax_rate,
  total_products_wt,
  total_paid_tax_incl,
}) {
  const [reference_] = reference;
  const [total_shipping_tax_incl_] = total_shipping_tax_incl;
  const [total_shipping_tax_excl_] = total_shipping_tax_excl;
  const [carrier_tax_rate_] = carrier_tax_rate;
  const [total_products_wt_] = total_products_wt;
  const [total_paid_tax_incl_] = total_paid_tax_incl;
  const [addressAddition_] = addressAddition;
  const [customerAddition_] = customerAddition;

  const [
    {
      order_rows: [{ order_row }],
    },
  ] = associations;

  const template = await fs.readFile(
    path.join(__dirname, "../templates/confirmationPayEmail.html"),
    "utf8"
  );

  // Generar filas de productos
  const productRows = order_row
    .map(
      (product) => `
    <tr style="vertical-align: top">
      <td><strong>${product.product_quantity[0]}x</strong></td>
      <td class="x_product">
        <table border="0" cellspacing="0" cellpadding="0" width="100%" role="presentation">
          <tbody>
            <tr>
              <td>${product.product_name[0]}</td>
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
                style="white-space: nowrap"
                align="right"
              >
                ${Number(product.unit_price_tax_incl[0]).toFixed(2)} €
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
    Number(total_shipping_tax_incl_) === 0
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
        Base imponible ${Number(total_shipping_tax_excl_).toFixed(2)}
        € más IVA (${carrier_tax_rate_}%)
        ${(
          Number(total_shipping_tax_incl_) - Number(total_shipping_tax_excl_)
        ).toFixed(2)} €
      </td>
      </tr>
    `
      : "";

  // Generar sección total de envío
  const totalShippingSection =
    Number(total_shipping_tax_incl_) === 0
      ? `
      <td>
        <span 
          class="x_product__promotion"
          data-ogsc=""
          data-ogsb=""
          style="
            color: rgb(255, 255, 255) !important;
            background-color: rgb(99, 60, 0) !important;
          "
        >Gratis</span>
      </td>
      `
      : `
      <td
        style="white-space: nowrap; vertical-align: top"
        align="right"
      >
        ${Number(total_shipping_tax_incl_).toFixed(2)} €
      </td>
    `;
  // Hacer todos los reemplazos necesarios
  let htmlContent = template
    .replace("{{firstname}}", customerAddition_.firstname[0])
    .replace("{{reference}}", reference_)
    .replace("{{products_table_content}}", productRows)
    .replace("{{detail_shipping_section}}", detailShippingSection)
    .replace("{{total_shipping_section}}", totalShippingSection)
    .replace("{{total_products}}", Number(total_products_wt_).toFixed(2))
    .replace("{{total}}", Number(total_paid_tax_incl_).toFixed(2));

  if (
    addressAddition_.address2 &&
    Array.isArray(addressAddition_.address2) &&
    addressAddition_.address2[0] !== ""
  ) {
    htmlContent = htmlContent.replace(
      "{{address}}",
      `${addressAddition_.address1[0]}, ${addressAddition_.address2[0]},<br>${addressAddition_.postcode[0]}, ${addressAddition_.city[0]}`
    );
  } else {
    console.log("ad 2 vacio");
    htmlContent = htmlContent.replace(
      "{{address}}",
      `${addressAddition_.address1[0]},<br>${addressAddition_.postcode[0]}, ${addressAddition_.city[0]}`
    );
  }

  return htmlContent;
}

module.exports = { generateTemplate };
