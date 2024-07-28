const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const tokendata = req.header('Authorization');
    console.log('tokendata ',tokendata);
    const token = tokendata.split(" ")[1];
    console.log('token ',token);
    
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'projectJwt');
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
