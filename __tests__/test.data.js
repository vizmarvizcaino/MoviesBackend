import request from 'supertest';
import chai from 'chai';
import app from '../app.js';
import { Pelicula } from '../models/Pelicula.js';

const { expect } = chai;


describe('Test the post endpoints', () => {

  it('should allow to create movies', async () => {
    const payload = {
      "nombre": "El señor de los anillos",
      "sinopsis": "Una pelis de hobbies",
      "ano": "2014",
      "director": "Will Smith",
      "image": "https://es.web.img3.acsta.net/medias/nmedia/18/89/67/45/20061512.jpg",
      "categoria1": "Accion",
      "categoria2": "Terror"
    };
    const { body, status } = await request(app).post('/pelicula').send(payload);
    expect(status).to.equal(201);
    // check the userId
    expect(body).to.have.property('peliculaId');
    const peliculaId = body.peliculaId;
    const pelicula = await Pelicula.findByPk(peliculaId);
    expect(pelicula.nombre).to.equal(payload.nombre);
  });

  it('should return 400 if name, sinopsis, image is incomplete', async () => {
    const payload = {
      "nombre": "El señor de los anillos",
      "sinopsis": "Una buena pelicula de Hobbies",
    };
    const { status } = await request(app).post('/pelicula').send(payload);
    expect(status).to.equal(400);
  });

  // it('should return 400 if name, category is shorter than 4 characters', async () => {
  //   const payload = {
  //     "nombre": "El",
  //     "categoria1": "ds", 
  //   };
  //   const { body, status } = await request(app).post('/pelicula').send(payload);
  //   expect(status).to.equal(400);
  //   expect(body.message).contains('the name and the category must have at least 4 characters');
  // }); 
});