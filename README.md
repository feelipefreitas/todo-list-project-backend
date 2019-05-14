# Descrição da aplicação
Uma WEB API para gerenciamento de tarefas (todo-list) na qual o usuário vai poder logar no sistema e então fazer todas as operações básicas em suas tarefas (CRUD). Ela é o Back-End da aplicação, na fase de desenvolvimento foi utilizado o [Postman](https://www.getpostman.com/) para a realização dos testes.

# Bibliotecas utilizadas
* [Express](https://www.npmjs.com/package/express) - As rotas são feitas com base no ExpressJs.
* [Mongoose](https://www.npmjs.com/package/mongoose) - Para fazer a modelagem dos objetos foi utilizado o Mongoose, além disso foi utilizado para as operações no banco de dados (MongoDB).
* [Json Web Token](https://www.npmjs.com/package/jsonwebtoken) - O login de usuários e operações privadas são feitos usando autenticação de token que está relacionado ao id do usuário cadastrado. 
* [BcryptJs](https://www.npmjs.com/package/bcryptjs) - As senhas dos usuários foram salvas no banco de dados utilizando o bcryptjs, com isso, antes de serem salvas elas passaram por um processo de Hash para que haja maior segurança. 
* [Validator](https://www.npmjs.com/package/validator) - Um validador que foi utilizado para validar se o email do usuário é valido, antes que fosse salvo no banco de dados.
* [env-cmd](https://www.npmjs.com/package/env-cmd) - Utilizado para a criação de variáveis de ambiente. 

# Deploy
Para a criação de um banco de dados de produção, foi utilizado o [MongoDb Atlas](https://www.mongodb.com/cloud/atlas). E para subir a API na rede foi utilizado o [Heroku](https://www.heroku.com/).
