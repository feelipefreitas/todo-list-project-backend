const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/user.router');

const app = express();

//Vai automaticamente converter os jsons que vinherem na request em objetos js
app.use(express.json());

//Routers
app.use(userRouter);

const port = process.env.PORT;
app.listen(port, () => {
   console.log('Server running at ' + port);
});