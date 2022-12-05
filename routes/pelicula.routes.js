import { Router } from "express" ;
import { createPelicula, getCategorias, getPelicula, getpeliculaById, getPeliculaComentario } from "../controllers/pelicula.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.js";


const router = Router();

router.get('/peliculas',getPelicula);

router.get('/pelicula/:id',getpeliculaById);

router.post('/pelicula',  createPelicula);

router.get('/peliculas/:id/comentarios',getPeliculaComentario);

router.get('/categorias',getCategorias);




export default router;