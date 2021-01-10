const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if(!token) res.status(401).send('access denied!');
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    }catch(err) {
        res.status(400).send('invalid token');
    }
}

module.exports = auth;