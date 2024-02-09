const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des restaurants' });
  }
};

exports.postRestaurants = async (req, res) => {
  try {
    // Extraire les données du corps de la requête
    const { email, password, name, adressePostal } = req.body;
   

    // Créer le restaurant avec les données fournies
    const newRestaurant = await prisma.restaurant.create({
      data: {
        email,
        password,
        name,
        adressePostal
        // Vous pouvez ajouter d'autres champs ici si nécessaire
      }
    });

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Erreur lors de la création du restaurant :', error);
    res.status(500).json({ message: 'Erreur lors de la création du restaurant' });
  }
};


exports.putRestaurants = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};



exports.deleteRestaurants = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    await prisma.restaurant.delete({
      where: { id }
    });

    res.json({ message: 'Restaurant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du restaurant :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du restaurant' });
  }
};

