import express from 'express';
import { loginUser } from '../controllers/usuarios_controller.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Intentando iniciar sesión con email: ${email}`); 

        const { user, token } = await loginUser(email, password);
        res.json({ user, token });
    } catch (error) {
        console.error(`Error en /login: ${error.message}`); 
        res.status(400).send(error.message);
    }
});

export default router;

