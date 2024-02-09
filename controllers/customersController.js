const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getcustomers = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.postcustomers = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.putcustomers = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};



exports.deletecustomers = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    await prisma.customer.delete({
      where: { id }
    });

    res.json({ message: 'customer supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du customer :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du customer' });
  }
};

