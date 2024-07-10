import Usuario from "../models/usuarios_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const userSchema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    estado: Joi.boolean().default(true),
    imagen: Joi.string().optional()
});

async function getUsers() {
    let usuarios = await Usuario.find();
    return usuarios;
}

async function createUser(body) {
    const { error } = userSchema.validate(body);
    if (error) {
        throw new Error(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    let user = new Usuario({
        nombre: body.nombre,
        password: hashedPassword,
        email: body.email,
        estado: true
    });
    return await user.save();
}

async function updateUser(body, email) {
    const { error } = userSchema.validate(body);
    if (error) {
        throw new Error(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    let user = await Usuario.updateOne({ email: email }, {
        $set: {
            nombre: body.nombre,
            password: hashedPassword
        }
    });
    return user;
}

async function loginUser(email, password) {
    try {
        const user = await Usuario.findOne({ email: email });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        return { user, token };
    } catch (error) {
        throw new Error(error.message);
    }
}

export { getUsers, createUser, updateUser, loginUser };
