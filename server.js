import dotenv from "dotenv";
import app from "./app.js"
import conectarDB from "./config/db.js";
dotenv.config();

conectarDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
