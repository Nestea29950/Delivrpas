const express = require('express');

const restaurantsRoutes = require('./routes/restaurantsRoutes');
const customersRoutes = require('./routes/customersRoutes');
const deliveriesRoutes = require('./routes/deliveriesRoute');
const dishesRoutes = require('./routes/dishesRoute');
const menusRoutes = require('./routes/menusRoutes');
const deliverymanRoutes = require('./routes/deliverymanRoutes');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware pour traiter les requêtes JSON
app.use('/api',[restaurantsRoutes,customersRoutes,deliveriesRoutes,dishesRoutes,menusRoutes,deliverymanRoutes]);

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
