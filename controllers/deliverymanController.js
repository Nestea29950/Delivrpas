const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getdeliveryman = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.postdeliveryman = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.putdeliveryman = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};



exports.deletedeliveryman = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    await prisma.deliveryman.delete({
      where: { id }
    });

    res.json({ message: 'deliveryman supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du deliveryman :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du deliveryman' });
  }
};

