const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getmenus = async (req, res) => {
  try {
    const { menuId } = req.body;
     // Supposons que vous avez un paramètre d'URL pour l'identifiant du menu
    // Effectuez la requête Prisma pour récupérer les plats associés au menu
    const menuWithDishes = await prisma.menu.findUnique({
      where: { id: parseInt(menuId) }, // Convertir l'ID en entier si nécessaire
      include: {
        dishes: {
          include: {
            dish: true // Inclure les informations sur le plat
          }
        }
      }
    });

    if (!menuWithDishes) {
      return res.status(404).json({ message: 'Menu non trouvé' });
    }

    // Envoyez les plats associés dans la réponse
    res.status(200).json(menuWithDishes.dishes.map(dishOnMenu => dishOnMenu.dish));
  } catch (error) {
    console.error('Erreur lors de la récupération des plats du menu :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des plats du menu' });
  }
};


exports.postmenus = async (req, res) => {
  try {
    console.log(req.restaurantId);

    // Rechercher la carte en fonction de req.restaurantId
    const card = await prisma.card.findFirst({
      where: { restaurantId: req.restaurantId }
    });

    if (!card) {
      return res.status(404).json({ message: 'La carte pour ce restaurant n\'existe pas' });
    }

    // Extraire les données du corps de la requête
    const { nom } = req.body;

    // Créer le menu avec les données fournies et la cardId récupérée
    const newMenu = await prisma.menu.create({
      data: {
        nom: nom,
        card: { connect: { id: card.id } }
      }
    });

    // Renvoyer une réponse avec le menu nouvellement créé
    res.status(201).json(newMenu);
  } catch (error) {
    console.error('Erreur lors de la création du menu :', error);
    res.status(500).json({ message: 'Erreur lors de la création du menu' });
  }
};





exports.putmenus = async (req, res) => {
  try {
    const { id } = req.params; // Identifiant du menu à mettre à jour
    const { nom } = req.body; // Nouveau nom du menu à partir du corps de la requête

    // Vérifier si le menu existe dans la base de données
    const existingMenu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
      include: { card: true } // Inclure la carte associée au menu
    });

    if (!existingMenu) {
      return res.status(404).json({ message: 'Menu non trouvé' });
    }

    // Rechercher la carte associée au restaurant actuel
    const card = await prisma.card.findFirst({
      where: { restaurantId: req.restaurantId }
    });

    // Vérifier si le menu correspond à la carte du restaurant actuel
    if (existingMenu.card.restaurantId !== req.restaurantId || existingMenu.card.id !== card.id) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce menu' });
    }

    // Mettre à jour le nom du menu
    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: {
        nom: nom // Nouveau nom du menu
      }
    });

    // Renvoyer le menu mis à jour dans la réponse
    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du menu :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du menu' });
  }
};







exports.deletemenus = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    // Vérifier si le menu existe dans la base de données
    const existingMenu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
      include: { card: true } // Inclure la carte associée au menu
    });

    if (!existingMenu) {
      return res.status(404).json({ message: 'Menu non trouvé' });
    }

    // Rechercher la carte associée au restaurant actuel
    const card = await prisma.card.findFirst({
      where: { restaurantId: req.restaurantId }
    });

    // Vérifier si le menu correspond à la carte du restaurant actuel
    if (existingMenu.card.restaurantId !== req.restaurantId || existingMenu.card.id !== card.id) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce menu' });
    }

    // Supprimer le menu
    await prisma.menu.delete({
      where: { id }
    });

    res.json({ message: 'Menu supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du menu :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du menu' });
  }
};