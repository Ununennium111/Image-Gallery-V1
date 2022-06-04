module.exports = errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || 500,
        msg: err.message || 'Something went wrong, please try again later'
    }

    if (err && err.name === 'ValidationError') {
        let errors = {};

        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });

        customError.msg = errors[Object.keys(errors)[0]];;
        customError.statusCode = 400;
    }

    if (err && err.code === 11000) {
        const duplicatedValue = Object.keys(err.keyValue);

        customError.msg = `this ${duplicatedValue} is already registered, please choose another value`;
        customError.statusCode = 400;
    }

    if (err && err.name === 'TypeError') {
        customError.msg = 'All fields are required';
        customError.statusCode = 400;
    }

    return res
        .status(customError.statusCode)
        .json(
            {
                msg: customError.msg
            }
        );
}