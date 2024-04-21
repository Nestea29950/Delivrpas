const jwt = require('jsonwebtoken');

const verifyUserAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Token non fourni' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Token non fourni' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            
            return res.status(401).send({ message: 'Token invalide' });
        }
        console.log(req.user)
        req.user = decoded; // Ajoutez les informations de l'utilisateur décodées à l'objet req pour une utilisation ultérieure
        next();
    });
};

module.exports = verifyUserAuthentication;
