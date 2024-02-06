const express = require('express');
const customerRoutes = require('./routes/customerRoutes');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware pour traiter les requêtes JSON
app.use('/api', customerRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
