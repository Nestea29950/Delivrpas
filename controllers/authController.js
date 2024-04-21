const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = null;
        const customer = await prisma.customer.findFirst({ where: { email } });
        const deliveryMan = await prisma.deliveryMan.findFirst({ where: { email } });
        const restaurant = await prisma.restaurant.findFirst({ where: { email } });

        if (customer) {
            user = customer;
            console.log("Utilisateur trouvé dans la table Customer:", customer);
        } else if (deliveryMan) {
            user = deliveryMan;
            console.log("Utilisateur trouvé dans la table DeliveryMan:", deliveryMan);
        } else if (restaurant) {
            user = restaurant;
            console.log("Utilisateur trouvé dans la table Restaurant:", restaurant);
        } else {
            console.log("Aucun utilisateur trouvé avec cet email.");
            return res.status(401).send({ message: "Authentification échouée" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const payload = {
                userId: user.id,
                userType: customer ? 'customer' : deliveryMan ? 'deliveryMan' : restaurant ? 'restaurant' : null,
                userData: user // Ajoutez les données de l'utilisateur dans le payload
            };
        
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Utiliser la clé secrète stockée dans une variable d'environnement
        
            res.status(200).send({ token, user }); // Renvoyer le token et les données de l'utilisateur
        } else {
            console.error("Mot de passe incorrect pour l'utilisateur :", user);
            res.status(401).send({ message: "Mot de passe incorrect" });
        }
        
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        res.status(500).send({ message: "Erreur interne du serveur" });
    }
};
