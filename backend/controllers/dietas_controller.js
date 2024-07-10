// dietas_controller.js
import Dieta from "../models/dietas_model.js";

async function getDietas() {
    let dietas = await Dieta.find();
    return dietas;
}

async function createDietas(body) {
    let dieta = new Dieta({
        titulo: body.titulo,
        descripcion: body.descripcion,
        ingredientes: body.ingredientes,
    });
    return await dieta.save();
}

async function updateDietas(body, id) {
    try {
        console.log(body);
        console.log(id);

        let dietaActualizada = await Dieta.findByIdAndUpdate(
            id,
            {
                $set: {
                    titulo: body.titulo,
                    descripcion: body.descripcion,
                    ingredientes: body.ingredientes,
                }
            },
            { new: true } 
        );

        if (!dietaActualizada) {
            throw new Error(`No se encontró la dieta con id ${id}`);
        }

        return dietaActualizada;
    } catch (error) {
        console.error("Error al actualizar la dieta:", error);
        throw error; 
    }
}


async function deleteDietas(id) {
    try {
        let dietaEliminada = await Dieta.findByIdAndDelete(id);
        if (!dietaEliminada) {
            throw new Error(`No se encontró la dieta con ID ${id}`);
        }
        return dietaEliminada;
    } catch (error) {
        console.error("Error al eliminar la dieta:", error);
        throw error;
    }
}

export { getDietas, createDietas, updateDietas, deleteDietas };
