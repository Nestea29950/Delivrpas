const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10; 
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
    
    // Générer un sel et hacher le mot de passe
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error('Erreur lors du hachage du mot de passe :', err);
        throw new Error('Erreur lors du hachage du mot de passe');
      }

      // Créer le restaurant avec le mot de passe haché
      const newRestaurant = await prisma.restaurant.create({
        data: {
          email,
          password: hash, // Utilisation du hash du mot de passe
          name,
          adressePostal,
          // Créer également la carte associée au restaurant
          card: {
            create: {}
          }
        },
        // Inclure la création de la carte dans la transaction
        include: {
          card: true
        }
      });

      res.status(201).json(newRestaurant);
    });
  } catch (error) {
    console.error('Erreur lors de la création du restaurant :', error);
    res.status(500).json({ message: 'Erreur lors de la création du restaurant' });
  }
};



exports.putRestaurants = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du restaurant à mettre à jour
    const { email, password, name, adressePostal, carte } = req.body; // Extraire les données du corps de la requête

    // Vérifier si le restaurant existe dans la base de données
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingRestaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé pour l\'ID fourni' });
    }

    // Mettre à jour le restaurant avec les données fournies
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: {
        email,
        password,
        name,
        adressePostal,
        card: {
          create: carte.menu.map(menu => ({
            dishes: {
              create: menu.dishes ? menu.dishes.map(dish => ({
                name: dish.name,
              })) : []
            }
          }))
        }
      }
    });

    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du restaurant :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du restaurant' });
  }
};



exports.deleteRestaurants = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    // Supprimer la carte associée au restaurant
    await prisma.card.deleteMany({
      where: { restaurantId: id }
    });

    // Supprimer le restaurant lui-même
    await prisma.restaurant.delete({
      where: { id }
    });

    res.json({ message: 'Restaurant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du restaurant :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du restaurant' });
  }
};




