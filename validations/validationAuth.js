import errors from '../const/errors.js'
import {isObjEmpty} from "../helpers/util.js"
const autenticarValidation = async (req, res, next) => {
    
    const isEmpty = isObjEmpty(req.body);
    const { email, password } = req.body;
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regCharacters = /[A-z]/;
    try {
        if (isEmpty) return next(errors.objEmpty);
        if (email === undefined || password === undefined) return next(errors.objEmpty);
        if (typeof email !== 'string') {
            return next(errors.emailString);
        }
        if (password.length < 6) {
            return next(errors.passwordLength);
        }
        /*if (!regEmail.test(email)) {
            return next(errors.emailFormato);
        }
        if (!regCharacters.test(password)) {
            return next(errors.passwordString);
        }*/
    } catch (error) {
        console.log('error', error)
    }
    next()
};

export {
    autenticarValidation,
};