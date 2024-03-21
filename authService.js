const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function generateToken(payload) {
  // Générer un jeton JWT avec le payload spécifié
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyPassword(plainPassword, hashedPassword) {
  // Vérifier si le mot de passe fourni correspond au mot de passe haché en utilisant bcrypt
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { generateToken, verifyPassword };
