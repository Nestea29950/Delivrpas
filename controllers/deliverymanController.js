const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.getdeliveryman = async (req, res) => {
  try {
    const deliverymen = await prisma.deliveryMan.findMany();
    res.json(deliverymen);
  } catch (error) {
    console.error('Erreur lors de la récupération des livreurs :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des livreurs' });
  }
};

exports.postdeliveryman = async (req, res) => {
  try {
    // Extraire les données du corps de la requête
    const { name, password, email } = req.body;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error('Erreur lors du hachage du mot de passe :', err);
        throw new Error('Erreur lors du hachage du mot de passe');
      }
    // Créer un nouveau livreur avec les données fournies
    const newDeliveryman = await prisma.deliveryMan.create({
      data: { name, password:hash, email } // Ajouter le mot de passe et l'email
    });



    res.status(201).json(newDeliveryman);
  });
  } catch (error) {
    console.error('Erreur lors de la création du livreur :', error);
    res.status(500).json({ message: 'Erreur lors de la création du livreur' });
  }
};

exports.putdeliveryman = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedDeliveryman = await prisma.deliveryMan.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    res.json(updatedDeliveryman);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du livreur :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du livreur' });
  }
};

exports.deletedeliveryman = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.deliveryMan.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Livreur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du livreur :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du livreur' });
  }
};
