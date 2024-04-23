const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getdeliveries = async (req, res) => {
  try {
    const { userid, userType } = req.query; // Récupérer les paramètres de requête de l'URL

    // Vérifier que le userType est valide
    if (userType !== 'restaurant' && userType !== 'deliveryMan' && userType !== 'customer') {
      return res.status(400).json({ message: 'Le type d\'utilisateur spécifié n\'est pas valide' });
    }

    // Récupérer toutes les livraisons avec les informations associées
    const deliveries = await prisma.delivery.findMany({
      where: {
        OR: [
          { customerId: parseInt(userid) },
          { restaurantId: parseInt(userid)},
          { deliveryManId: parseInt(userid) }
        ]
      },
      include: {
        customer: true,
        restaurant: true,
        deliveryMan: true,
        orderitem: true // Inclure les détails de la commande associée
      }
    });

    // Filtrer les livraisons en fonction du type d'utilisateur
    const filteredDeliveries = deliveries.filter(delivery => {
      if (userType === 'restaurant') {
        return delivery.restaurantId === parseInt(userid);
      } else if (userType === 'deliveryMan') {
        return delivery.deliveryManId === parseInt(userid);
      } else {
        return delivery.customerId === parseInt(userid);
      }
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
    if (user.userType !== 'customer') {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à créer une livraison' });
    }

    const { deliveryManId, restaurantId, orderItemData } = req.body; // Ajoutez orderItems dans le corps de la requête

    const newOrderItem = await prisma.orderItem.create({
      data: {
        ...orderItemData // Utilisez les données de l'élément de la commande pour créer l'OrderItem
      }
    });

    // Créer une nouvelle livraison en utilisant les données reçues et les OrderItems nouvellement créés
    const newDelivery = await prisma.delivery.create({
      data: {
        deliveryMan: { connect: { id: deliveryManId } },
        customer: { connect: { id: user.id } }, // Utiliser l'ID de l'utilisateur authentifié (client)
        restaurant: { connect: { id: restaurantId } },
        orderitem: { connect: newOrderItems.map(item => ({ id: item.id })) } // Connectez tous les nouveaux OrderItems à la livraison
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


    // Vérifier si la livraison existe dans la base de données
    const delivery = await prisma.delivery.findUnique({ where: { id: parseInt(id) } });
    if (!delivery) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }

    // Supprimer la livraison
    await prisma.delivery.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Livraison supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la livraison :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la livraison' });
  }
};
