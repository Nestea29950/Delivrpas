const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.getcustomers = async (req, res) => {
  try {
    // Récupérer tous les clients depuis la base de données
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.json(customers);
  } catch (error) {
    console.error('Erreur lors de la récupération des clients :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des clients' });
  }
};

exports.postcustomers = async (req, res) => {
  try {
    // Extraire les données du corps de la requête
    const { name, password, email } = req.body;

    // Hasher le mot de passe
    const hash = await bcrypt.hash(password, 10); // Utiliser une valeur de sel (salt) de 10 par défaut

    // Créer un nouveau client avec les données fournies, en utilisant le mot de passe hashé
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        password: hash, // Stocker le mot de passe hashé
      },
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Erreur lors de la création du client :', error);
    res.status(500).json({ message: 'Erreur lors de la création du client' });
  }
};

exports.putcustomers = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Mettre à jour le client avec les données fournies
    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(req.customerId) },
      data: {
        name,
      },
    });
    res.json(updatedCustomer);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du client :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du client' });
  }
};

exports.deletecustomers = async (req, res) => {
  try {
    let { id } = req.customerId;
    id = parseInt(id);
    // Supprimer le client avec l'ID fourni
    await prisma.customer.delete({
      where: { id }
    });
    res.json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du client :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du client' });
  }
};
