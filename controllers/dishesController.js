const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Récupérer tous les plats
exports.getdishes = async (req, res) => {
  try {
    const dishes = await prisma.dish.findMany();
    res.json(dishes);
  } catch (error) {
    console.error('Erreur lors de la récupération des plats :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des plats' });
  }
};

// Créer un nouveau plat
exports.postdishes = async (req, res) => {
  try {
    const { name, cardId } = req.body; // Vous pouvez ajouter d'autres champs requis pour la création du plat

    const newDish = await prisma.dish.create({
      data: {
        name,
        card: { connect: { id: cardId } } // Associez le plat à la carte spécifiée
      }
    });

    res.status(201).json(newDish);
  } catch (error) {
    console.error('Erreur lors de la création du plat :', error);
    res.status(500).json({ message: 'Erreur lors de la création du plat' });
  }
};

// Mettre à jour un plat existant
exports.putdishes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedDish = await prisma.dish.update({
      where: { id: parseInt(id) },
      data: { name }
    });

    res.json(updatedDish);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du plat :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du plat' });
  }
};

// Supprimer un plat
exports.deletedishes = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.dish.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du plat :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du plat' });
  }
};
