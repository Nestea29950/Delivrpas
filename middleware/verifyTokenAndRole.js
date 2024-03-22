// Middleware pour vérifier le token JWT et le rôle de l'utilisateur
const jwt = require('jsonwebtoken');

const verifyTokenAndRole = (req, res, next) => {
    const authHeader = req.headers.authorization;
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

        req.user = decoded;

        if (req.user.userType === 'customer' || req.user.userType === 'restaurant' || req.user.userType === 'deliveryman') {
            next();
        } else {
            return res.status(403).send({ message: 'Accès interdit' });
        }
    });
};

module.exports = verifyTokenAndRole;
