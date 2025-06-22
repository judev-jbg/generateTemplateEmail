import React from "react";

const InvoiceGenerator = ({
  invoiceNumber = "",
  date = "",
  clientNumber = "",
  clientName = "",
  clientAddress = "",
  clientCity = "",
  clientPostalCode = "",
  clientState = "",
  clientCountry = "",
  clientNIF = "",
  orderNumber = "",
  albaran = "",
  dateAlbaran = "",
  items = [
    {
      id_articulo: "",
      descripcion: "",
      cantidad: 0,
      precio: 0.0,
      descuento: 0.0,
      total: 0.0,
    },
  ],
  subtotal = 0.0,
  tax = 0.0,
  total = 0.0,
}) => {
  return React.createElement(
    "div",
    {
      style: {
        width: "210mm",
        height: "297mm",
        maxHeight: "297mm",
        padding: "2rem",
        backgroundColor: "white",
        fontFamily: "Helvetica, Arial, sans-serif, sans-serif",
        fontSize: "12px",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },
    [
      // Header section
      React.createElement("div", { key: "header" }, [
        React.createElement(
          "div",
          {
            key: "header-content",
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            },
          },
          [
            React.createElement("img", {
              key: "logo",
              src: "https://www.toolstock.info/img/logo.png",
              alt: "TOOL STOCK",
              style: {
                width: "150px",
                height: "60px",
              },
            }),
            React.createElement(
              "h1",
              {
                key: "title",
                style: {
                  fontSize: "55px",
                  fontWeight: "bold",
                  margin: 0,
                  color: "#666666",
                },
              },
              React.createElement("b", null, "Factura")
            ),
          ]
        ),

        // Company info
        React.createElement(
          "div",
          {
            key: "company-info",
            style: { marginBottom: "20px" },
          },
          [
            React.createElement(
              "p",
              {
                key: "company-name",
                style: { fontWeight: "bold", margin: "0 0 5px 0" },
              },
              "TOOL STOCK, S.L."
            ),
            React.createElement(
              "p",
              {
                key: "address1",
                style: { margin: "0 0 5px 0" },
              },
              "Calle Santa Cruz de Ardoi, número 31, 8º-A"
            ),
            React.createElement(
              "p",
              {
                key: "address2",
                style: { margin: "0 0 5px 0" },
              },
              "31180 Zizur Mayor"
            ),
            React.createElement(
              "p",
              {
                key: "province",
                style: { margin: "0 0 5px 0" },
              },
              "NAVARRA"
            ),
            React.createElement(
              "p",
              {
                key: "nif",
                style: { margin: "0 0 5px 0" },
              },
              "N.I.F.: B71315238"
            ),
          ]
        ),

        // Client data
        React.createElement(
          "div",
          {
            key: "client-data",
            style: {
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "20px",
              marginBottom: "10px",
            },
          },
          [
            React.createElement(
              "div",
              {
                key: "client-box",
                style: {
                  border: "1px solid #000",
                  padding: "10px",
                },
              },
              [
                React.createElement(
                  "h2",
                  {
                    key: "client-title",
                    style: {
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    },
                  },
                  "DATOS DEL CLIENTE:"
                ),
                clientName &&
                  React.createElement(
                    "p",
                    {
                      key: "client-name",
                      style: { margin: "0 0 5px 0" },
                    },
                    clientName
                  ),
                clientAddress &&
                  React.createElement(
                    "p",
                    {
                      key: "client-address",
                      style: { margin: "0 0 5px 0" },
                    },
                    clientAddress
                  ),
                (clientPostalCode || clientCity) &&
                  React.createElement(
                    "p",
                    {
                      key: "client-city",
                      style: { margin: "0 0 5px 0" },
                    },
                    `${clientPostalCode && `${clientPostalCode} `}${
                      clientCity && clientCity
                    }`
                  ),
                (clientState || clientCountry) &&
                  React.createElement(
                    "p",
                    {
                      key: "client-state",
                      style: { margin: "0 0 5px 0" },
                    },
                    `${clientState && `${clientState}`}${
                      clientState && clientCountry && ", "
                    }${clientCountry && clientCountry}`
                  ),
                clientNIF &&
                  React.createElement(
                    "p",
                    {
                      key: "client-nif",
                      style: { margin: "0" },
                    },
                    `N.I.F. ${clientNIF}`
                  ),
              ].filter(Boolean)
            ),
          ]
        ),

        // Invoice details grid
        React.createElement(
          "div",
          {
            key: "invoice-grid",
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
              marginBottom: "20px",
            },
          },
          [
            React.createElement(
              "div",
              {
                key: "invoice-number",
                style: { border: "1px solid #000" },
              },
              [
                React.createElement(
                  "p",
                  {
                    style: {
                      margin: "0",
                      borderBottom: "1px solid #000",
                      padding: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                    },
                  },
                  "NÚM. FACTURA"
                ),
                React.createElement(
                  "p",
                  {
                    style: {
                      margin: "0",
                      padding: "10px",
                      textAlign: "center",
                    },
                  },
                  invoiceNumber
                ),
              ]
            ),
            React.createElement(
              "div",
              {
                key: "invoice-date",
                style: { border: "1px solid #000" },
              },
              [
                React.createElement(
                  "p",
                  {
                    style: {
                      margin: "0",
                      borderBottom: "1px solid #000",
                      padding: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                    },
                  },
                  "FECHA FACTURA"
                ),
                React.createElement(
                  "p",
                  {
                    style: {
                      margin: "0",
                      padding: "10px",
                      textAlign: "center",
                    },
                  },
                  date
                ),
              ]
            ),
            React.createElement(
              "div",
              {
                key: "client-number",
                style: { border: "1px solid #000" },
              },
              [
                React.createElement(
                  "p",
                  {
                    style: {
                      margin: "0",
                      borderBottom: "1px solid #000",
                      padding: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                    },
                  },
                  "NÚM. CLIENTE"
                ),
                React.createElement(
                  "p",
                  {
                    style: {
                      margin: "0",
                      padding: "10px",
                      textAlign: "center",
                    },
                  },
                  clientNumber
                ),
              ]
            ),
          ]
        ),

        // Order details
        React.createElement(
          "div",
          {
            key: "order-details",
            style: { marginBottom: "20px" },
          },
          [
            React.createElement(
              "p",
              {
                key: "albaran",
                style: { margin: "0 0 5px 0" },
              },
              [
                React.createElement("b", null, "Albarán:"),
                ` ${albaran}. `,
                React.createElement("b", null, "De:"),
                ` ${dateAlbaran}`,
              ]
            ),
            React.createElement(
              "p",
              {
                key: "order",
                style: { margin: "0" },
              },
              [React.createElement("b", null, "Pedido:"), ` ${orderNumber}`]
            ),
          ]
        ),
      ]),

      // Products table
      React.createElement(
        "div",
        {
          key: "products-section",
          style: {
            border: "1px solid #000",
            height: "100vh",
            marginBottom: "10px",
          },
        },
        [
          React.createElement(
            "table",
            {
              key: "products-table",
              style: {
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              },
            },
            [
              React.createElement("thead", { key: "table-head" }, [
                React.createElement(
                  "tr",
                  {
                    key: "header-row",
                    style: { borderBottom: "1px solid #000" },
                  },
                  [
                    React.createElement(
                      "th",
                      {
                        key: "th-articulo",
                        style: { textAlign: "left", padding: "10px" },
                      },
                      "ARTÍCULO"
                    ),
                    React.createElement(
                      "th",
                      {
                        key: "th-descripcion",
                        style: { textAlign: "left", padding: "10px" },
                      },
                      "DESCRIPCIÓN"
                    ),
                    React.createElement(
                      "th",
                      {
                        key: "th-unidades",
                        style: { textAlign: "right", padding: "10px" },
                      },
                      "UNIDADES"
                    ),
                    React.createElement(
                      "th",
                      {
                        key: "th-precio",
                        style: { textAlign: "right", padding: "10px" },
                      },
                      "PRECIO"
                    ),
                    React.createElement(
                      "th",
                      {
                        key: "th-dto",
                        style: { textAlign: "right", padding: "10px" },
                      },
                      "%DTO"
                    ),
                    React.createElement(
                      "th",
                      {
                        key: "th-importe",
                        style: { textAlign: "right", padding: "10px" },
                      },
                      "IMPORTE"
                    ),
                  ]
                ),
              ]),
              React.createElement(
                "tbody",
                { key: "table-body" },
                items.map((item, index) =>
                  React.createElement("tr", { key: index }, [
                    React.createElement(
                      "td",
                      {
                        key: "articulo",
                        style: {
                          padding: "10px",
                          height: "25px",
                          width: "90px",
                        },
                      },
                      item.id_articulo
                    ),
                    React.createElement(
                      "td",
                      {
                        key: "descripcion",
                        style: { padding: "10px", height: "25px" },
                      },
                      item.descripcion
                    ),
                    React.createElement(
                      "td",
                      {
                        key: "cantidad",
                        style: {
                          textAlign: "right",
                          padding: "10px",
                          height: "25px",
                          width: "70px",
                        },
                      },
                      item.cantidad
                    ),
                    React.createElement(
                      "td",
                      {
                        key: "precio",
                        style: {
                          textAlign: "right",
                          padding: "10px",
                          height: "25px",
                          width: "70px",
                        },
                      },
                      item.precio.toFixed(2)
                    ),
                    React.createElement(
                      "td",
                      {
                        key: "descuento",
                        style: {
                          textAlign: "right",
                          padding: "10px",
                          height: "25px",
                          width: "40px",
                        },
                      },
                      item.descuento
                    ),
                    React.createElement(
                      "td",
                      {
                        key: "total",
                        style: {
                          textAlign: "right",
                          padding: "10px",
                          height: "25px",
                          width: "70px",
                        },
                      },
                      item.total.toFixed(2)
                    ),
                  ])
                )
              ),
            ]
          ),
        ]
      ),

      // Totals section
      React.createElement("div", { key: "totals" }, [
        React.createElement(
          "table",
          {
            key: "totals-table",
            style: {
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "10px",
            },
          },
          [
            React.createElement("thead", { key: "totals-head" }, [
              React.createElement("tr", { key: "totals-header" }, [
                React.createElement(
                  "th",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  "BASE"
                ),
                React.createElement(
                  "th",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  "%IVA"
                ),
                React.createElement(
                  "th",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  "CUOTA"
                ),
                React.createElement(
                  "th",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  "%REC."
                ),
                React.createElement(
                  "th",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  "CUOTA"
                ),
              ]),
            ]),
            React.createElement("tbody", { key: "totals-body" }, [
              React.createElement("tr", { key: "totals-values" }, [
                React.createElement(
                  "td",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  subtotal.toFixed(2)
                ),
                React.createElement(
                  "td",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  tax > 0
                    ? (
                        parseFloat(
                          (
                            parseFloat(tax.toFixed(2)) /
                            parseFloat(subtotal.toFixed(2))
                          ).toFixed(2)
                        ) * 100
                      ).toFixed(2)
                    : "0.00"
                ),
                React.createElement(
                  "td",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  tax.toFixed(2)
                ),
                React.createElement(
                  "td",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  "0.00"
                ),
                React.createElement(
                  "td",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "5px",
                      textAlign: "center",
                    },
                  },
                  "0.00"
                ),
              ]),
              React.createElement("tr", { key: "total-row" }, [
                React.createElement(
                  "td",
                  {
                    colSpan: 4,
                    style: {
                      border: "1px solid #000",
                      padding: "15px",
                      textAlign: "right",
                      borderRight: "none",
                    },
                  },
                  React.createElement("b", null, "TOTAL")
                ),
                React.createElement(
                  "td",
                  {
                    style: {
                      border: "1px solid #000",
                      padding: "15px",
                      textAlign: "center",
                      borderLeft: "none",
                    },
                  },
                  `${total.toFixed(2)} €`
                ),
              ]),
            ]),
          ]
        ),

        React.createElement(
          "div",
          {
            key: "payment-terms",
            style: {
              marginBottom: "10px",
              border: "1px solid #000",
              padding: "5px",
            },
          },
          [
            React.createElement(
              "small",
              {
                key: "payment-title",
                style: {
                  fontWeight: "bold",
                  margin: "0 0 5px 0",
                  display: "block",
                },
              },
              "VENCIMIENTOS"
            ),
            React.createElement(
              "small",
              {
                key: "payment-details",
                style: { margin: "0" },
              },
              `${date} - ${total.toFixed(2)}`
            ),
          ]
        ),

        React.createElement(
          "div",
          {
            key: "footer-note",
            style: {
              fontSize: "10px",
              color: "#666",
            },
          },
          [
            React.createElement(
              "p",
              {
                style: { margin: "0", textAlign: "end" },
              },
              React.createElement(
                "i",
                null,
                "Información para clientes intracomunitarios: Operación exenta en virtud de Directiva 2006/112/CE y art 25 Ley 19/1992"
              )
            ),
          ]
        ),
      ]),
    ]
  );
};

export default InvoiceGenerator;
