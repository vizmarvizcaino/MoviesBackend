import { Router } from "express" ;
import { createComentario, getComentario } from "../controllers/comentario.controller.js";
import { isUserAuthenticated } from '../middlewares/auth.js';


const router = Router();

router.get('/comentarios', getComentario);

router.post('/comentario', isUserAuthenticated, createComentario);

export default router;