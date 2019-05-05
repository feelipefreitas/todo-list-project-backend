const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

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