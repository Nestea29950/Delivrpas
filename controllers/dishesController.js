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
    const { nom } = req.body; // Nom du plat à partir du corps de la requête

    // Rechercher la carte en fonction de req.restaurantId
    const card = await prisma.card.findFirst({
      where: { restaurantId: req.restaurantId }
    });

    if (!card) {
      return res.status(404).json({ message: 'La carte pour ce restaurant n\'existe pas' });
    }

    // Créer le plat avec les données fournies et la cardId récupérée
    const newDish = await prisma.dish.create({
      data: {
        nom,
        card: { connect: { id: card.id } } // Associer le plat à la carte spécifiée
      }
    });

    // Renvoyer une réponse avec le plat nouvellement créé
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
    const { nom } = req.body;

    // Rechercher le plat à mettre à jour et inclure la carte associée
    const existingDish = await prisma.dish.findUnique({
      where: { id: parseInt(id) },
      include: { card: true }
    });

    if (!existingDish) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }

    // Vérifier si la carte associée au plat appartient au restaurant actuel
    if (existingDish.card.restaurantId !== req.restaurantId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce plat' });
    }

    // Mettre à jour le plat
    const updatedDish = await prisma.dish.update({
      where: { id: parseInt(id) },
      data: { nom }
    });

    res.json(updatedDish);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du plat :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du plat' });
  }
};

exports.deletedishes = async (req, res) => {
  try {
    const { id } = req.params;

    // Rechercher le plat à supprimer et inclure la carte associée
    const existingDish = await prisma.dish.findUnique({
      where: { id: parseInt(id) },
      include: { card: true }
    });

    if (!existingDish) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }

    // Vérifier si la carte associée au plat appartient au restaurant actuel
    if (existingDish.card.restaurantId !== req.restaurantId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce plat' });
    }

    // Supprimer le plat
    await prisma.dish.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du plat :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du plat' });
  }
};
