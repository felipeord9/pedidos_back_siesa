const mailService = require("../services/mailService");
const { config } = require("../config/config");

const sendMail = async (req, res, next) => {
  try {
    const { body } = req;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          * {
          font-size: 8px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          thead {
            background-color: #d6d6d6;
            color: #000;
          }
          tbody {
            display: block;
            min-height: 100vh;
          }
          tr {
            display: table;
            width: 100%;
            table-layout: fixed;

          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
        </style>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            padding: 1rem 2rem;
          "
        >
          <h1 style="text-align: center; font-size: 13px; font-weight: bold">PEDIDO DE VENTA</h1>
          <div style="position: relative; font-size: 8px; width: 100%; height: 100%;">
            <div style="margin: auto;">
              <h2 style="font-size: 8px; font-weight: bolder; margin: 0">
                EL GRAN LANGOSTINO S.A.S.
              </h2>
              <p style="margin: 0.3rem 0;"><strong>Nit: 835001216</strong></p>
              <p style="margin: 0.3rem 0;">Tel: 5584982 - 3155228124</p>
            </div>
            <div
              style="
                position: absolute;
                border: 1px solid black;
                width: 200px;
                top: 0;
                right: 0;
              "
            >
              <p style="border-bottom: 1px solid black; background-color: #d6d6d6; padding: 0.3rem 0.5rem; margin: 0;"><strong>No.${
                body.seller.co
              }-PDV-${body.id}</strong></p>
              <p style="padding: 0.2rem 0.5rem; margin: 0; white-space: nowrap;"><strong>Fecha: </strong>${new Date().toLocaleString('es-CO')}</p>
            </div>
          </div>
          <hr style="width: 100%; border: 1.5px solid black;"/>
          <div style="width: 100%; font-size: 13px; margin-top: 10px;">
            <div style="position: relative; margin-bottom: 1rem;">
              <div style="position: relative; border: 1px solid black; border-radius: 5px; width: 55%; padding: 1rem;">
                <h3 style="background: #fff; font-size: 8px; position: absolute; top: -8px; left: 25px; margin: 0; padding: 0px 10px;">Cliente</h3>
                <div>
                  <p style="margin: 0; width: 100%;"><strong style="margin-right: 0.5rem;">Nombre: </strong>${
                    body.client.description
                  }</p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%;"><strong style="margin-right: 0.5rem;">Sucursal: </strong>${
                    body.branch.description
                  }</p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%;"><strong style="margin-right: 0.5rem;">Nit: </strong>${
                    body.client.id
                  }</p>
                </div>
              </div>
              <div style="position: absolute; top: 0; right: 0; border: 1px solid black; border-radius: 5px; width: 35%; padding: 1rem;">
                <div>
                  <p style="margin: 0; width: 100%;"><strong style="margin-right: 0.5rem;">C.O: </strong>${
                    body.seller.co
                  }</p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%;"><strong style="margin-right: 0.5rem; white-space: nowrap;">Fecha Entrega:</strong>${
                    body.deliveryDate
                  }</p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%;"><strong style="margin-right: 0.5rem; white-space: nowrap;">Vendedor:</strong>${
                    body.seller.description
                  }</p>
                </div>
              </div>
            </div>
            <div style="width: 100%; border: 1px solid black;">
              <table style="width: 100%; height: 100%;">
                <thead>
                  <tr>
                    <th style="width: 30px;">Ref.</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>UM</th>
                    <th>Precio Un</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${body.products.agregados.map((elem) => {
                    return `
                        <tr>
                          <td style="width: 30px;">${elem.id}</td>
                          <td>${elem.description}</td>
                          <td>${elem.amount}</td>
                          <td>${elem.um}</td>
                          <td>$${elem.price}</td>
                          <td>$${elem.total}</td>
                        </tr>
                        `;
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="fw-bold">TOTAL</td>
                    <td colspan="4"></td>
                    <td className="fw-bold text-end">$${
                      body.products.total
                    }</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div style="position: relative; border: 1px solid black; margin-top: 1rem;">
              <h3 style="background: #fff; font-size: 8px; position: absolute; top: -8px; left: 25px; margin: 0; padding: 0px 10px;">Observaciones</h3>
              <p style="margin: 0; padding: 1rem;">
              ${body.observations}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
    const transporter = await mailService.sendEmails();
    mailService.generatePDF(html, (error, pdfBuffer) => {
      if (error) {
        return res.status(400).json({
          status: "ERROR",
          error,
        });
      }
      
      transporter.sendMail(
        {
          from: config.smtpEmail,
          //to: 'practicantesistemas@granlangostino.net',
          to: body.seller.mailAgency,
          cc: body.seller.mailCommercial,
          subject: "NUEVO PEDIDO DE VENTA",
          attachments: [
            {
              filename: `No-${body.seller.co}-PDV-${body.id}.pdf`,
              content: pdfBuffer,
              contentType: "application/pdf",
            },
          ],
          text: `
            Nuevo Pedido de Venta
            Se adjunta archivo en formato PDF
          `,
        },
        (error, info) => {
          if (error) {
            res.json({
              error,
            });
          } else {
            res.json({
              info,
            });
          }
        }
      );
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMail,
};
