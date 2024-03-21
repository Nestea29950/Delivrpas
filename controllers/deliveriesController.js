const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getdeliveries = async (req, res) => {
  try {
    const deliveries = await prisma.delivery.findMany({
      include: {
        customer: true,
        restaurant: true,
        deliveryMan: true
      }
    });
    res.json(deliveries);
  } catch (error) {
    console.error('Erreur lors de la récupération des livraisons :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des livraisons' });
  }
};


exports.postdeliveries = async (req, res) => {
  try {
    const { deliveryManId, customerId, restaurantId, orderitemId } = req.body;

    // Créer une nouvelle livraison en utilisant les données reçues
    const newDelivery = await prisma.delivery.create({
      data: {
        deliveryMan: { connect: { id: deliveryManId } },
        customer: { connect: { id: customerId } },
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
    res.json(newDelivery);
  } catch (error) {
    console.error('Erreur lors de la création de la livraison :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la livraison' });
  }
};



exports.deletedeliveries = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.delivery.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Livraison supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la livraison :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la livraison' });
  }
};