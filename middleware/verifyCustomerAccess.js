const jwt = require('jsonwebtoken');

const verifycustomerAccess = (req, res, next) => {
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

        // Vérifier si le customer connecté correspond à celui spécifié dans la route
        if (decoded.userType === 'customer') {
            req.customerId = decoded.userId; // Ajoutez l'ID du customer à l'objet req pour une utilisation ultérieure
            next();
        } else {
            return res.status(403).send({ message: 'Accès interdit' });
        }
    });
};

module.exports = verifycustomerAccess;
