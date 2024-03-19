const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getdeliveries = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.postdeliveries = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.putdeliveries = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.deletedeliveries = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    await prisma.deliverie.delete({
      where: { id }
    });

    res.json({ message: 'deliverie supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du deliverie :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du deliverie' });
  }
};

