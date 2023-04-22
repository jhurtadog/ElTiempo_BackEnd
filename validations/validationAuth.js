import errors from '../const/errors.js'

const autenticarValidation = async (req, res, next) => {
    const { email, password } = req.body;
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regCharacters = /[A-z]/;
    try {
        if (typeof email !== 'string') {
            return next(errors.emailString);
        }
        if (!regEmail.test(email)) {
            return next(errors.emailFormato);
        }
        if (password.length < 6) {
            return next(errors.passwordLength);
        }
        if (!regCharacters.test(password)) {
            return next(errors.passwordString);
        }
    } catch (error) {
        console.log('error', error)
    }
    next()
};

export {
    autenticarValidation,
};