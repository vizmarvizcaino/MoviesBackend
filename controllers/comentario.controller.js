import { Comentario } from "../models/Comentario.js";

export const getComentario = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll();
    res.json(comentarios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createComentario = async (req, res) => {
  try {
    if (req.body.contenido.length <= 4) {
      return res.status(400).send({
        message: "comentario are required"
      });
    }
    
    const { contenido, id, user} = req.body;
    console.log(req.body)
    const comentario = await Comentario.create({
      contenido,
      peliculaId: id,
      user
    });
    res.status(201).json({
      "message": "Comentario Created",
      "userId": comentario.id
    });
  } catch (err) {
    console.log(err);
  }
};





