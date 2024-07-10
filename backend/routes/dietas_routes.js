import express from 'express';
import { getDietas, createDietas, updateDietas, deleteDietas } from '../controllers/dietas_controller.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const dietas = await getDietas();
        res.json(dietas);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const newDieta = await createDietas(req.body);
        res.status(201).json(newDieta);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedDieta = await updateDietas(req.body, req.params.id);
        res.json(updatedDieta);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedDieta = await deleteDietas(req.params.id);
        res.json(deletedDieta);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
