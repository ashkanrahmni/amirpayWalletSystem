const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        req.flash('error', 'لطفا مجددا وارد شوید');
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, '1234567890');
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/auth/login');
    }
}

module.exports = authMiddleware;