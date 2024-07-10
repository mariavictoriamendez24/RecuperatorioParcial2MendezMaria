import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dietasRoutes from './routes/dietas_routes.js';
import usuariosRoutes from './routes/usuarios_routes.js';
import authRoutes from './routes/auth.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Conectar a la base de datos MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));

// Configurar middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rutas
app.use('/dietas', dietasRoutes);
app.use('/users', usuariosRoutes);
app.use('/login', authRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
