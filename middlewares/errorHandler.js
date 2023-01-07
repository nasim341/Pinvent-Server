const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode);

    res.json({
        massage: err.massage,
        stack: process.env.NODE_ENV === "development" ? err.satck : null
    })
};
module.exports = errorHandler;