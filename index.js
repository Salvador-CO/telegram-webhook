import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/pedido", async (req, res) => {
  const { nombre = "Cliente", contacto = "No especificado", total = 0 } = req.query;

  const mensaje = `
   <b>🎉 ¡NUEVO PEDIDO REGISTRADO! 📦</b> 
    ---------------------------------------------
👤 Cliente: ${nombre}
📞 Contacto: ${contacto}
💰 Total: $${total}
---------------------------------------------
    <i>Revisa el panel de administración ahora.</i>
  `;

  const token = "8332480036:AAFhc36gojNnIK8qgFLy3DSTqIClqKFmr5U";
  const chat_id = "-1003174390779";

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const params = {
    chat_id,
    text: mensaje,
    parse_mode: "Markdown"
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    });
    res.send("✅ Mensaje enviado a Telegram");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error al enviar mensaje");
  }
});

app.get("/", (req, res) => res.send("Webhook activo ✅"));

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
