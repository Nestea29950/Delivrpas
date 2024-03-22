const express = require('express');

const restaurantsRoutes = require('./routes/restaurantsRoutes');
const customersRoutes = require('./routes/customersRoutes');
const deliveriesRoutes = require('./routes/deliveriesRoute');
const dishesRoutes = require('./routes/dishesRoute');
const menusRoutes = require('./routes/menusRoutes');
const deliverymanRoutes = require('./routes/deliverymanRoutes');
const authRoutes = require('./routes/authRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Chemin vers votre fichier de documentation Swagger



const app = express();
const port = 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json()); // Middleware pour traiter les requêtes JSON
app.use('/api',[authRoutes,restaurantsRoutes,customersRoutes,deliveriesRoutes,dishesRoutes,menusRoutes,deliverymanRoutes]);




app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
