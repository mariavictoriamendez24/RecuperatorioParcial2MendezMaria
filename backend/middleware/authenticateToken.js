import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Acceso denegado');

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).send('Token inválido');
        req.user = user;
        next();
    });
};
