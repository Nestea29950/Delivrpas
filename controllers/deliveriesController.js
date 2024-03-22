const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getdeliveries = async (req, res) => {
  try {
    const { user } = req; // Récupérer l'utilisateur à partir de l'authentification
    const deliveries = await prisma.delivery.findMany({
      include: {
        customer: true,
        restaurant: true,
        deliveryMan: true
      }
    });

    // Filtrer les livraisons en fonction du type d'utilisateur
    const filteredDeliveries = deliveries.filter(delivery => {
      return (
        delivery.customer.id === user.id ||
        delivery.restaurant.id === user.id ||
        delivery.deliveryMan.id === user.id
      );
    });

    res.json(filteredDeliveries);
  } catch (error) {
    console.error('Erreur lors de la récupération des livraisons :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des livraisons' });
  }
};



exports.postdeliveries = async (req, res) => {
  try {
    const { user } = req; // Récupérer l'utilisateur à partir de l'authentification

    // Vérifier si l'utilisateur est un client
    if (user.userType !== 'Customer') {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à créer une livraison' });
    }

    const { deliveryManId, restaurantId, orderitemId } = req.body;

    // Créer une nouvelle livraison en utilisant les données reçues
    const newDelivery = await prisma.delivery.create({
      data: {
        deliveryMan: { connect: { id: deliveryManId } },
        customer: { connect: { id: user.id } }, // Utiliser l'ID de l'utilisateur authentifié (client)
        restaurant: { connect: { id: restaurantId } },
        orderitem: { connect: { id: orderitemId } }
      },
      include: {
        deliveryMan: true,
        customer: true,
        restaurant: true,
        orderitem: true
      }
    });

    // Retourner la nouvelle livraison créée
    res.status(201).json(newDelivery);
  } catch (error) {
    console.error('Erreur lors de la création de la livraison :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la livraison' });
  }
};




exports.deletedeliveries = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req; // Récupérer l'utilisateur à partir de l'authentification

    // Vérifier si l'utilisateur est un restaurant ou un client
    if (user.role !== 'Restaurant' && user.role !== 'Customer') {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cette livraison' });
    }

    // Vérifier si la livraison existe dans la base de données
    const delivery = await prisma.delivery.findUnique({ where: { id: parseInt(id) } });
    if (!delivery) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }

    // Vérifier si l'utilisateur est autorisé à supprimer la livraison
    if (user.role === 'Restaurant' && delivery.restaurantId !== user.id) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cette livraison' });
    }

    if (user.role === 'Customer' && delivery.customerId !== user.id) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cette livraison' });
    }

    // Supprimer la livraison
    await prisma.delivery.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Livraison supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la livraison :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la livraison' });
  }
};
