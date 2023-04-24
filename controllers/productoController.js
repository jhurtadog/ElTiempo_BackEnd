import Producto from "../models/Producto.js";

const obtenerProductos = async (req, res, next) => {
    const productos = await Producto.find()
        .where("creador")
        .equals(req.usuario._id);
    res.status(200).json(productos);
};

const nuevoProducto = async (req, res, next) => {
    const producto = new Producto(req.body);
    producto.creador = req.usuario._id;

    try {
        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (error) {
        return next({ code: 400, message: error.message });
    }
};

const obtenerProducto = async (req, res, next) => {
    const { id } = req.params;

    const producto = await Producto.findById(id)

    if (!producto) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }

    if (
        producto.creador.toString() !== req.usuario._id.toString()
    ) {
        const error = new Error("Accion no valida");
        return res.status(401).json({ msg: error.message });
    }

    res.json(producto);
};

const editarProducto = async (req, res, next) => {
    const { id } = req.params;

    const producto = await Producto.findById(id);

    if (!producto) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }

    if (producto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(401).json({ msg: error.message });
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.fecha = req.body.fecha || producto.fecha;
    producto.proveedor = req.body.proveedor || producto.proveedor;

    try {
        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (error) {
        return next({ code: 400, message: error.message });
    }
};

const eliminarProducto = async (req, res, next) => {
    const { id } = req.params;

    const producto = await Producto.findById(id);

    if (!producto) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }

    if (producto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(401).json({ msg: error.message });
    }

    try {
        await producto.deleteOne();
        res.json({ msg: "Producto eliminado" });
    } catch (error) {
        return next({ code: 400, message: error.message });
    }
};


export {
    obtenerProductos,
    nuevoProducto,
    obtenerProducto,
    editarProducto,
    eliminarProducto,
};
