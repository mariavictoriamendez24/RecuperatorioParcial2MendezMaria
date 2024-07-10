import express from 'express';
import { getUsers, createUser, updateUser, loginUser } from '../controllers/usuarios_controller.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const usuarios = await getUsers();
        res.json(usuarios);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:email', async (req, res) => {
    try {
        const updatedUser = await updateUser(req.body, req.params.email);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.json({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;
