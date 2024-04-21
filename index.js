const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema, importSchema } = require('@graphql-tools/schema');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const cors = require('cors'); // Importez le module cors
const saltRounds = 10; 
const restaurantsRoutes = require('./routes/restaurantsRoutes');
const customersRoutes = require('./routes/customersRoutes');
const deliveriesRoutes = require('./routes/deliveriesRoute');
const dishesRoutes = require('./routes/dishesRoute');
const menusRoutes = require('./routes/menusRoutes');
const deliverymanRoutes = require('./routes/deliverymanRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Chemin vers votre fichier de documentation Swagger


// Ici j'ai du faire le graphql car impossible de faire des modules impossible d'importer 


const typeDefs = `
  type Customer {
    id: Int!
    name: String!
    email: String!
    password: String!
    users: User
    deliveries: [Delivery!]!
  }

  type Mutation {
    createCustomer(name: String!, email: String!, password: String!): Customer!
    updateCustomer(id: Int!, name: String!, email: String!, password: String!): Customer!
    deleteCustomer(id: Int!): DeleteResponse!
    createRestaurant(input: RestaurantInput!): Restaurant!  # Assurez-vous que cette ligne est présente
    updateRestaurant(id: Int!, input: RestaurantInput!): Restaurant!
    deleteRestaurant(id: Int!): String!
    postdeliveryman(name: String!, password: String!, email: String!): DeliveryMan!
    putdeliveryman(id: Int!, name: String!): DeliveryMan!
    deletedeliveryman(id: Int!): DeleteResponse!
    createMenu(nom: String!, restaurantId: Int!): Menu!
    updateMenu(id: Int!, nom: String!): Menu!
    deleteMenu(id: Int!): DeleteResponse!
    postdishes(nom: String!): Dish!
    putdishes(id: Int!, nom: String!): Dish!  # Ajoutez cette ligne pour définir la mutation putdishes dans le schéma
    deletedishes(id: Int!): DeleteResponse!  # Ajoutez cette ligne pour définir la mutation deletedishes dans le schéma

  }
  input RestaurantInput {
    name: String!
    email: String!
    password: String!
    adressePostal: Int!
    # Ajoutez d'autres champs requis pour la création d'un restaurant
  }
  
  type DeleteResponse {
    success: Boolean!
    message: String
  }
  

  type DeliveryMan {
    id: Int!
    name: String!
    email: String!
    password: String!
    users: User
    deliveries: [Delivery!]!
    
  }

  type Restaurant {
    id: Int!
    email: String!
    password: String!
    name: String!
    adressePostal: Int!
    card: Card
    users: User
    deliveries: [Delivery!]!
  }

  type User {
    deliveryMan: DeliveryMan
    customer: Customer
    restaurant: Restaurant
  }

  type Card {
    id: Int!
    restaurant: Restaurant!
    menu: [Menu!]!
    dish: [Dish!]!
  }

  type Menu {
    id: Int!
    nom: String!
    card: Card!
    dishes: [DishOnMenu!]!
    orderitem: [OrderItem!]!
  }

  type Dish {
    id: Int!
    card: Card!
    nom: String!
    menus: [DishOnMenu!]!
    orderitem: [OrderItem!]!
  }

  type DishOnMenu {
    menu: Menu!
    dish: Dish!
  }

  type OrderItem {
    id: Int!
    dish: Dish!
    menu: Menu!
    delivery: [Delivery!]!
  }

  type Delivery {
    id: Int!
    deliveryMan: DeliveryMan!
    customer: Customer!
    restaurant: Restaurant!
    orderitem: OrderItem!
  }

  # Définitions des autres types...

  type Query {
    customers: [Customer!]!
    deliveryMen: [DeliveryMan!]!
    restaurants: [Restaurant!]!
    getdeliveryman: [DeliveryMan]!
    getMenus(menuId: Int!): [Dish!]!
    getdishes: [Dish!]!  # Mettre à jour le nom de la requête pour correspondre à la fonction de résolution

  }
`;


const resolvers = {
  Query: {
    customers: async () => {
      try {
        // Récupérer tous les clients depuis la base de données
        const customers = await prisma.customer.findMany({
          select: {
            id: true,
            name: true,
            email: true,
          },
        });
        return customers;
      } catch (error) {
        console.error('Erreur lors de la récupération des clients :', error);
        throw new Error('Erreur lors de la récupération des clients');
      }
    },
    getdishes: async () => {
      try {
        const dishes = await prisma.dish.findMany();
        return dishes;
      } catch (error) {
        console.error('Erreur lors de la récupération des plats :', error);
        throw new Error('Erreur lors de la récupération des plats');
      }
    },

    getdeliveryman: async (_, __, { req, res }) => {
      try {
        const deliverymen = await prisma.deliveryMan.findMany({
          select: {
            id: true,
            name: true,
            email: true,
          },
        });
        return deliverymen;
      } catch (error) {
        console.error('Erreur lors de la récupération des livreurs :', error);
        throw new Error('Erreur lors de la récupération des livreurs');
      }
    },
    getMenus: async (parent, args, context) => {
      try {
        const { menuId } = args;
        const menuWithDishes = await context.prisma.menu.findUnique({
          where: { id: parseInt(menuId) },
          include: {
            dishes: {
              include: {
                dish: true
              }
            }
          }
        });
        if (!menuWithDishes) {
          throw new Error('Menu non trouvé');
        }
        return menuWithDishes.dishes.map(dishOnMenu => dishOnMenu.dish);
      } catch (error) {
        throw new Error('Erreur lors de la récupération des plats du menu');
      }
    },
    restaurants: async () => {
      try {
        const restaurants = await prisma.restaurant.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            adressePostal: true,
          },
        });
        return restaurants;
      } catch (error) {
        console.error('Erreur lors de la récupération des restaurants :', error);
        throw new Error('Erreur lors de la récupération des restaurants');
      }
    },
  },
  Mutation: {
    postdishes: async (_, { nom }, { req }) => {
      try {
        const card = await prisma.card.findFirst({
          where: { restaurantId: req.restaurantId }
        });

        if (!card) {
          throw new Error('La carte pour ce restaurant n\'existe pas');
        }

        const newDish = await prisma.dish.create({
          data: {
            nom,
            card: { connect: { id: card.id } }
          }
        });

        return newDish;
      } catch (error) {
        console.error('Erreur lors de la création du plat :', error);
        throw new Error('Erreur lors de la création du plat');
      }
    },
    putdishes: async (_, { id, nom }, { req }) => {
      try {
        const existingDish = await prisma.dish.findUnique({
          where: { id: parseInt(id) },
          include: { card: true }
        });

        if (!existingDish) {
          throw new Error('Plat non trouvé');
        }

        if (existingDish.card.restaurantId !== req.restaurantId) {
          throw new Error('Vous n\'êtes pas autorisé à modifier ce plat');
        }

        const updatedDish = await prisma.dish.update({
          where: { id: parseInt(id) },
          data: { nom }
        });

        return updatedDish;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du plat :', error);
        throw new Error('Erreur lors de la mise à jour du plat');
      }
    },
    deletedishes: async (_, { id }, { req }) => {
      try {
        const existingDish = await prisma.dish.findUnique({
          where: { id: parseInt(id) },
          include: { card: true }
        });

        if (!existingDish) {
          throw new Error('Plat non trouvé');
        }

        if (existingDish.card.restaurantId !== req.restaurantId) {
          throw new Error('Vous n\'êtes pas autorisé à supprimer ce plat');
        }

        await prisma.dish.delete({
          where: { id: parseInt(id) }
        });

        return { success: true, message: 'Plat supprimé avec succès' };
      } catch (error) {
        console.error('Erreur lors de la suppression du plat :', error);
        throw new Error('Erreur lors de la suppression du plat');
      }
    },
    createCustomer: async (parent, { input }) => {
      try {
        const { name, password, email } = input;

        // Hasher le mot de passe
        const hash = await bcrypt.hash(password, saltRounds);

        // Créer un nouveau client avec les données fournies, en utilisant le mot de passe hashé
        const newCustomer = await prisma.customer.create({
          data: {
            name,
            email,
            password: hash, // Stocker le mot de passe hashé
          },
        });

        return newCustomer;
      } catch (error) {
        console.error('Erreur lors de la création du client :', error);
        throw new Error('Erreur lors de la création du client');
      }
    },
    updateCustomer: async (parent, { id, input }) => {
      try {
        const { name } = input;

        // Mettre à jour le client avec les données fournies
        const updatedCustomer = await prisma.customer.update({
          where: { id: parseInt(id) },
          data: {
            name,
          },
        });
        return updatedCustomer;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du client :', error);
        throw new Error('Erreur lors de la mise à jour du client');
      }
    },
    deleteCustomer: async (parent, { id }) => {
      try {
        // Supprimer le client avec l'ID fourni
        await prisma.customer.delete({
          where: { id: parseInt(id) }
        });
        return { message: 'Client supprimé avec succès' };
      } catch (error) {
        console.error('Erreur lors de la suppression du client :', error);
        throw new Error('Erreur lors de la suppression du client');
      }
    },
    createRestaurant: async (parent, { input }) => {
      try {
        const { email, password, name, adressePostal } = input;

        // Hasher le mot de passe
        const hash = await bcrypt.hash(password, saltRounds);

        // Créer le restaurant avec les données fournies
        const newRestaurant = await prisma.restaurant.create({
          data: {
            email,
            password: hash,
            name,
            adressePostal,
            card: {
              create: {},
            },
          },
          include: {
            card: true,
          },
        });

        return newRestaurant;
      } catch (error) {
        console.error('Erreur lors de la création du restaurant :', error);
        throw new Error('Erreur lors de la création du restaurant');
      }
    },
    updateRestaurant: async (parent, { id, input }) => {
      try {
        const { email, password, name, adressePostal, carte } = input;

        // Mettre à jour le restaurant avec les données fournies
        const updatedRestaurant = await prisma.restaurant.update({
          where: { id: parseInt(id) },
          data: {
            email,
            password,
            name,
            adressePostal,
            card: {
              create: carte.menu.map(menu => ({
                dishes: {
                  create: menu.dishes ? menu.dishes.map(dish => ({
                    name: dish.name,
                  })) : [],
                },
              })),
            },
          },
        });

        return updatedRestaurant;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du restaurant :', error);
        throw new Error('Erreur lors de la mise à jour du restaurant');
      }
    },
    deleteRestaurant: async (parent, { id }) => {
      try {
        id = parseInt(id);

        // Supprimer la carte associée au restaurant
        await prisma.card.deleteMany({
          where: { restaurantId: id },
        });

        // Supprimer le restaurant lui-même
        await prisma.restaurant.delete({
          where: { id },
        });

        return { message: 'Restaurant supprimé avec succès' };
      } catch (error) {
        console.error('Erreur lors de la suppression du restaurant :', error);
        throw new Error('Erreur lors de la suppression du restaurant');
      }
    },
    postdeliveryman: async (_, { name, password, email }, { req, res }) => {
      try {
        const hash = await bcrypt.hash(password, saltRounds);
        const newDeliveryman = await prisma.deliveryMan.create({
          data: { name, password: hash, email }
        });
        return newDeliveryman;
      } catch (error) {
        console.error('Erreur lors de la création du livreur :', error);
        throw new Error('Erreur lors de la création du livreur');
      }
    },
    putdeliveryman: async (_, { id, name }, { req, res }) => {
      try {
        const updatedDeliveryman = await prisma.deliveryMan.update({
          where: { id: parseInt(id) },
          data: { name }
        });
        return updatedDeliveryman;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du livreur :', error);
        throw new Error('Erreur lors de la mise à jour du livreur');
      }
    },
    deletedeliveryman: async (_, { id }, { req, res }) => {
      try {
        await prisma.deliveryMan.delete({ where: { id: parseInt(id) } });
        return { message: 'Livreur supprimé avec succès' };
      } catch (error) {
        console.error('Erreur lors de la suppression du livreur :', error);
        throw new Error('Erreur lors de la suppression du livreur');
      }
    },
    createMenu: async (parent, args, context) => {
      try {
        const { nom, restaurantId } = args;
        const card = await context.prisma.card.findFirst({
          where: { restaurantId: restaurantId }
        });
        if (!card) {
          throw new Error('La carte pour ce restaurant n\'existe pas');
        }
        const newMenu = await context.prisma.menu.create({
          data: {
            nom: nom,
            card: { connect: { id: card.id } }
          }
        });
        return newMenu;
      } catch (error) {
        throw new Error('Erreur lors de la création du menu');
      }
    },
    updateMenu: async (parent, args, context) => {
      try {
        const { id, nom } = args;
        const updatedMenu = await context.prisma.menu.update({
          where: { id: parseInt(id) },
          data: { nom: nom }
        });
        return updatedMenu;
      } catch (error) {
        throw new Error('Erreur lors de la mise à jour du menu');
      }
    },
    deleteMenu: async (parent, args, context) => {
      try {
        const { id } = args;
        await context.prisma.menu.delete({ where: { id: parseInt(id) } });
        return { message: 'Menu supprimé avec succès' };
      } catch (error) {
        throw new Error('Erreur lors de la suppression du menu');
      }
    },
    postdishes: async (parent, { nom }, { req, res }) => {
      try {
        // Rechercher la carte en fonction de req.restaurantId
        const card = await prisma.card.findFirst({
          where: { restaurantId: req.restaurantId }
        });

        if (!card) {
          throw new Error('La carte pour ce restaurant n\'existe pas');
        }

        // Créer le plat avec les données fournies et la cardId récupérée
        const newDish = await prisma.dish.create({
          data: {
            nom,
            card: { connect: { id: card.id } } // Associer le plat à la carte spécifiée
          }
        });

        return newDish;
      } catch (error) {
        console.error('Erreur lors de la création du plat :', error);
        throw new Error('Erreur lors de la création du plat');
      }
    },
    putdishes: async (parent, { id, nom }, { req, res }) => {
      try {
        // Rechercher le plat à mettre à jour et inclure la carte associée
        const existingDish = await prisma.dish.findUnique({
          where: { id: parseInt(id) },
          include: { card: true }
        });

        if (!existingDish) {
          throw new Error('Plat non trouvé');
        }

        // Vérifier si la carte associée au plat appartient au restaurant actuel
        if (existingDish.card.restaurantId !== req.restaurantId) {
          throw new Error('Vous n\'êtes pas autorisé à modifier ce plat');
        }

        // Mettre à jour le plat
        const updatedDish = await prisma.dish.update({
          where: { id: parseInt(id) },
          data: { nom }
        });

        return updatedDish;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du plat :', error);
        throw new Error('Erreur lors de la mise à jour du plat');
      }
    },
    deletedishes: async (parent, { id }, { req, res }) => {
      try {
        // Rechercher le plat à supprimer et inclure la carte associée
        const existingDish = await prisma.dish.findUnique({
          where: { id: parseInt(id) },
          include: { card: true }
        });

        if (!existingDish) {
          throw new Error('Plat non trouvé');
        }

        // Vérifier si la carte associée au plat appartient au restaurant actuel
        if (existingDish.card.restaurantId !== req.restaurantId) {
          throw new Error('Vous n\'êtes pas autorisé à supprimer ce plat');
        }

        // Supprimer le plat
        await prisma.dish.delete({
          where: { id: parseInt(id) }
        });

        return { message: 'Plat supprimé avec succès' };
      } catch (error) {
        console.error('Erreur lors de la suppression du plat :', error);
        throw new Error('Erreur lors de la suppression du plat');
      }
    },
     
  },
};


const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const port = 3000;

app.use(cors({
  origin: '*'
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // Activer GraphiQL pour tester les requêtes
}));

app.use(express.json()); // Middleware pour traiter les requêtes JSON
app.use('/api', [authRoutes, restaurantsRoutes, customersRoutes, deliveriesRoutes, dishesRoutes, menusRoutes, deliverymanRoutes]);

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
