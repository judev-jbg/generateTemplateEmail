const React = require("react");
const path = require("path");

const InvoiceGenerator = ({
  invoiceNumber = "N-003572",
  date = "20 nov. 2024",
  clientNumber = "430019126",
  clientName = "RODAMIENTOS DUERO SL",
  clientAddress = "AVDA. MONTECILLO Nº10 NAVE 6",
  clientCity = "09400 ARANDA DE DUERO",
  clientState = "09400 ARANDA DE DUERO",
  clientCountry = "09400 ARANDA DE DUERO",
  clientNIF = "B09040460",
  shippingName = "RODAMIENTOS DUERO SL",
  shippingAddress = "AVDA. MONTECILLO Nº10 NAVE 6",
  shippingCity = "09400 ARANDA DE DUERO",
  orderNumber = "402-4623212-0053135",
  deliveryNote = "N-3.639",
  items = [
    {
      code: "4933448390",
      description: "ASPIRADOR DE MANO M12 - M12HV-0",
      quantity: 1,
      price: 95.04,
      discount: 0.0,
      total: 95.04,
    },
  ],
  subtotal = 95.04,
  tax = 19.96,
  total = 115.0,
}) => {
  const logoPath = path.join(__dirname, "../assets/img/logo.png");
  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "2rem 3rem",
        backgroundColor: "white",
        fontFamily: "Helvetica, Arial, sans-serif, sans-serif",
        fontSize: "12px",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <img
            src={logoPath}
            alt="TOOL STOCK"
            style={{
              width: "200px",
              height: "75px",
            }}
          />
          <h1
            style={{
              fontSize: "70px",
              fontWeight: "bold",
              margin: 0,
              color: "#666666",
            }}
          >
            <b>Factura</b>
          </h1>
        </div>

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>
            TOOL STOCK, S.L.
          </p>
          <p style={{ margin: "0 0 5px 0" }}>
            Calle Santa Cruz de Ardoi, número 31, 8º-A
          </p>
          <p style={{ margin: "0 0 5px 0" }}>31180 Zizur Mayor</p>
          <p style={{ margin: "0 0 5px 0" }}>NAVARRA</p>
          <p style={{ margin: "0 0 5px 0" }}>N.I.F.: B71315238</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid #000",
              padding: "10px",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              DATOS DEL CLIENTE:
            </h2>
            <p style={{ margin: "0 0 5px 0" }}>{clientName}</p>
            <p style={{ margin: "0 0 5px 0" }}>{clientAddress}</p>
            <p style={{ margin: "0 0 5px 0" }}>{clientCity}</p>
            <p style={{ margin: "0 0 5px 0" }}>
              {clientState} {clientCountry}
            </p>
            <p style={{ margin: "0" }}>N.I.F. {clientNIF}</p>
          </div>
          <div
            style={{
              border: "1px solid #000",
              padding: "10px",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              DIRECCIÓN DE ENVÍO FACTURA:
            </h2>
            <p style={{ margin: "0 0 5px 0" }}>{shippingName}</p>
            <p style={{ margin: "0 0 5px 0" }}>{shippingAddress}</p>
            <p style={{ margin: "0" }}>{shippingCity}</p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div style={{ border: "1px solid #000" }}>
            <p
              style={{
                margin: "0",
                borderBottom: "1px solid #000",
                padding: "10px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              NÚM. FACTURA
            </p>
            <p style={{ margin: "0", padding: "10px", textAlign: "center" }}>
              {invoiceNumber}
            </p>
          </div>
          <div style={{ border: "1px solid #000" }}>
            <p
              style={{
                margin: "0",
                borderBottom: "1px solid #000",
                padding: "10px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              FECHA FACTURA
            </p>
            <p style={{ margin: "0", padding: "10px", textAlign: "center" }}>
              {date}
            </p>
          </div>
          <div style={{ border: "1px solid #000" }}>
            <p
              style={{
                margin: "0",
                borderBottom: "1px solid #000",
                padding: "10px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              NÚM. CLIENTE
            </p>
            <p style={{ margin: "0", padding: "10px", textAlign: "center" }}>
              {clientNumber}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ margin: "0 0 5px 0" }}>
            <b>Albarán:</b> {deliveryNote}. <b>De:</b> {date}
          </p>
          <p style={{ margin: "0" }}>
            <b>Su Pedido Nº:</b> {orderNumber}
          </p>
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid #000",
          height: "100vh",
          marginBottom: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #000" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>ARTÍCULO</th>
              <th style={{ textAlign: "left", padding: "10px" }}>
                DESCRIPCIÓN
              </th>
              <th style={{ textAlign: "right", padding: "10px" }}>UNIDADES</th>
              <th style={{ textAlign: "right", padding: "10px" }}>PRECIO</th>
              <th style={{ textAlign: "right", padding: "10px" }}>%DTO</th>
              <th style={{ textAlign: "right", padding: "10px" }}>IMPORTE</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", height: "25px", width: "90px" }}>
                  {item.code}
                </td>
                <td style={{ padding: "10px", height: "25px" }}>
                  {item.description}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    padding: "10px",
                    height: "25px",
                    width: "70px",
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    padding: "10px",
                    height: "25px",
                    width: "70px",
                  }}
                >
                  {item.price.toFixed(2)}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    padding: "10px",
                    height: "25px",
                    width: "40px",
                  }}
                >
                  {item.discount}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    padding: "10px",
                    height: "25px",
                    width: "70px",
                  }}
                >
                  {item.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                BASE
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                %IVA
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                CUOTA
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                %REC.
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                CUOTA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                {subtotal.toFixed(2)}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                21,00
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                {tax.toFixed(2)}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                0,00
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                0,00
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "15px",
                  textAlign: "right",
                  borderRight: "none",
                }}
              >
                <b>TOTAL</b>
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "15px",
                  textAlign: "center",
                  borderLeft: "none",
                }}
              >
                {total.toFixed(2)} €
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            marginBottom: "10px",
            border: "1px solid #000",
            padding: "5px",
          }}
        >
          <small
            style={{
              fontWeight: "bold",
              margin: "0 0 5px 0",
              display: "block",
            }}
          >
            VENCIMIENTOS
          </small>
          <small style={{ margin: "0" }}>
            {date} {total.toFixed(2)} Tarjeta
          </small>
        </div>

        <div
          style={{
            fontSize: "10px",
            color: "#666",
          }}
        >
          <p style={{ margin: "0", textAlign: "end" }}>
            <i>
              Información para clientes intracomunitarios: Operación exenta en
              virtud de Directiva 2006/112/CE y art 25 Ley 19/1992
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

module.exports = InvoiceGenerator;
