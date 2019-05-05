const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Esse middleware vai validar o token de aitenticação que está sendo enviado na request
// Caso ele seja válido será incluido na request o usuario referente ao token e o token em si
// Vai ser usado em todoas as requests que precisam do usuário já logado e autenticado no sistema
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        //Caso o token seja inválido ele não retorna nada
        //Se for válido vai retornar o token decodificado contendo o _id do usuario
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: tokenDecoded._id,
            'tokens.token': token
        });
        
        if(!user) throw new Error();
        
        req.user = user;
        req.token = token;
        
        next();
    } catch (e) {
        res.status(401).send({
            error: 'Please authenticate.'
        })
    }
};

module.exports = auth;