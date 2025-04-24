module.exports = async ({ res, message, data, code }) => {
    return res
        .status(code)
        .json({
            code,
            status: code < 300 ? 'success' : 'error',
            message,
            data,
        })
        .end();

}

// return response({ res, data: user, code: 200, message: "success" })