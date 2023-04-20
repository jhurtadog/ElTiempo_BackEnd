import mongoose from "mongoose";

const productosSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now(),
    },
    proveedor: {
      type: String,
      trim: true,
      required: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productosSchema);
export default Producto;