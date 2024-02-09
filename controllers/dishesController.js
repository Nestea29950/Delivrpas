const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getdishes = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.postdishes = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.putdishes = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};



exports.deletedishes = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    await prisma.dishe.delete({
      where: { id }
    });

    res.json({ message: 'dishe supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du dishe :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du dishe' });
  }
};

