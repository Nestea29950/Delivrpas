API de Gestion Delivrpas
Bienvenue dans l'API de gestion Delivrpas. Cette API fournit des fonctionnalités pour gérer les restaurants, les clients, les livreurs, les livraisons, les plats, les menus, ainsi que l'authentification des utilisateurs.

Accès à la Documentation
La documentation complète de l'API est disponible via Swagger UI. Vous pouvez accéder à la documentation en suivant ce lien : Documentation Swagger

Accès à l'api : william.gaonarch.vannes.mds-project.fr

Utilisation de l'API
L'API expose divers endpoints pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur différentes entités. Voici un aperçu des principaux endpoints :

/api/customers: Gérer les clients.
/api/deliveries: Gérer les livraisons.
/api/deliveryman: Gérer les livreurs.
/api/dishes: Gérer les plats.
/api/menus: Gérer les menus.
/api/restaurants: Gérer les restaurants.
/api/login: Endpoint d'authentification des utilisateurs.
Authentification
L'authentification des utilisateurs se fait via l'endpoint /api/login. Vous devez fournir les informations d'identification de l'utilisateur (email et mot de passe) pour obtenir un jeton d'authentification, qui doit ensuite être inclus dans les en-têtes des requêtes pour les endpoints protégés.

Contributions
Les contributions à l'amélioration de cette API sont les bienvenues. Si vous trouvez des bogues, des lacunes ou si vous avez des suggestions d'amélioration, n'hésitez pas à ouvrir une issue ou à soumettre une pull request.
