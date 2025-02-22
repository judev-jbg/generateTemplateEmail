const React = require("react");
const ReactDOMServer = require("react-dom/server");
const puppeteer = require("puppeteer");
const InvoiceGenerator = require("../components/InvoiceGenerator");

async function generatePDF(data) {
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
  const order_normalize = normalizeOrderRows(data);

  const element = React.createElement(InvoiceGenerator, order_normalize);
  const html = ReactDOMServer.renderToString(InvoiceGenerator(element));

  const fullHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      ${html}
    </body>
  </html>
`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(fullHtml);

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdf.toString("base64");
}

module.exports = { generatePDF };
