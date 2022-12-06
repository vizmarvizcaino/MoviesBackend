import { Comentario } from "../models/Comentario.js";
import { Pelicula } from "../models/Pelicula.js";

export const getPelicula = async (req, res) => {
  try {
    const peliculas = await Pelicula.findAll();
    res.json(peliculas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getpeliculaById = async (req, res) => {
  try {
    const pelicula = await Pelicula.findByPk(req.params.id);
    if (!pelicula) {
      res.status(404).send({
        message: `No school found with id ${req.params.id}`
      });
    }
    res.send(pelicula);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  };
};

export const createPelicula = async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.sinopsis || !req.body.image) {
      return res.status(400).send({
        message: "name, sinopsis and image are required"
      });
    }

    if (req.body.nombre.length <= 4  || req.body.categoria1 <= 4 ) {
      return res.status(400).send({
        message: "the name and the category must have at least 4 characters"
      });
    }

    const { nombre, sinopsis, ano, director, image, categoria1, categoria2 } = req.body;
    const pelicula = await Pelicula.create({
      nombre,
      sinopsis,
      ano,
      director,
      image,
      categoria1,
      categoria2
    });
    res.status(201).json({
      "message": "Pelicula Created",
      "peliculaId": pelicula.id
    });
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPeliculaComentario = async (req, res) => {
  try {
    const { id } =req.params;
  const comentarios = await Comentario.findAll({
    where: { peliculaId: id },
  });
  res.json(comentarios);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Pelicula.findAll({
      attributes: ['categoria1', 'categoria2','image']
    });
    res.json(categorias);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


