import errors from '../const/errors.js'
import {isObjEmpty} from "../helpers/util.js"
const autenticarValidation = async (req, res, next) => {
    const isEmpty = isObjEmpty(req.body);
    const { email, password } = req.body;
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    try {
        if (isEmpty) return next(errors.objEmpty);
        if (email === undefined || password === undefined) return next(errors.objEmpty);
        if (!regEmail.test(email)) {
            return next(errors.emailFormato);
        }
        if (password.length < 6) {
            return next(errors.passwordLength);
        }
    } catch (error) {
        console.log('error', error)
    }
    next()
};

const registrarValidation = async (req, res, next) => {
    const isEmpty = isObjEmpty(req.body);
    const { email, password, nombre } = req.body;
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    try {
        if (isEmpty) return next(errors.objEmpty);
        if (email === undefined || password === undefined || nombre === undefined) return next(errors.objEmpty);
        if (nombre.length === 0) {
            return next(errors.nombreString);
        }
        if (!regEmail.test(email)) {
            return next(errors.emailFormato);
        }
        if (password.length < 6) {
            return next(errors.passwordLength);
        }
    } catch (error) {
        console.log('error', error)
    }
    next()
};

export {
    autenticarValidation,
    registrarValidation
};