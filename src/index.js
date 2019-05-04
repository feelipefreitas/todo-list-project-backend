const express = require('express');
require('./db/mongoose');

const app = express();

//Vai automaticamente converter os jsons que vinherem na request em objetos js
app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => {
   console.log('Server running at ' + port);
});