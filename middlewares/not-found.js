module.exports = notFoundMiddleware = (req, res) => {
    return res.status(404).send('<h1>Page Not Found 404</h1>');
}