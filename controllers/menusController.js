const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getmenus = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.postmenus = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};

exports.putmenus = async (req, res) => {
  // Logique de création d'un customer
  res.send('bonjour')
};



exports.deletemenus = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    await prisma.menu.delete({
      where: { id }
    });

    res.json({ message: 'menu supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du menu :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du menu' });
  }
};

