import request from 'supertest';
import chai from 'chai';
import app from '../app.js';
import { User } from '../models/User.js'
const { expect } = chai;


describe('Test the auth endpoints', () => {

  it('should allow to create users', async () => {
    const payload = {
      'nombres': 'teast',
      'email': 'josae@email.com',
      'password': '123456'
    }
    const { body, status } = await request(app).post('/auth/register').send(payload);
    expect(status).to.equal(201);

    // check the userId
    expect(body).to.have.property('userId');
    const userId = body.userId;
    const user = await User.findByPk(userId);
    expect(user.nombres).to.equal(payload.nombres);
  });

  it('should return 400 if payload is incomplete', async () => {
    const payload = {
      'nombres': 'teast',
      'password': '123456'
    }
    const { status } = await request(app).post('/auth/register').send(payload);
    expect(status).to.equal(400);
  });

  it('should return 400 if password is shorter than 4 characters', async () => {
    const payload = {
      'nombres': 'teast',
      'email': 'josa123e@email.com',
      'password': '12'
    }
    const { body, status } = await request(app).post('/auth/register').send(payload);
    expect(status).to.equal(400);
    expect(body.message).contains('password must be at least 4 characters');
  });

  it('should return 400 if email does not have an @ character', async () => {
    const payload = {
      'nombres': 'teast',
      'email': 'josa123e.email.com',
      'password': '12345123123'
    }
    const { body, status } = await request(app).post('/auth/register').send(payload);
    expect(status).to.equal(400);
    expect(body.message).contains('email must contain @ character');
  });

  it('should allow to login', async () => {
    const payload = {
      'email': 'josae@email.com',
      'password': '123456'
    }
    const { body, status } = await request(app)
      .post('/auth/login')
      .type("json")
      .send(payload);
    expect(status).to.equal(200);
  });

  it("should fail if email is not incorrect", async () => {
    const payload = {
      'email': 'unexsitedEmail@email.com',
      'password': '123456'
    }
    const { body, status } = await request(app)
      .post('/auth/login')
      .type("json")
      .send(payload);
    expect(status).to.equal(404);
    expect(body.message).contains('No user found with email');
  });

  it("should fail if password is not incorrect", async () => {
    const payload = {
      'email': 'josae@email.com',
      'password': 'badPassword'
    }
    const { body, status } = await request(app)
      .post('/auth/login')
      .type("json")
      .send(payload);
    expect(status).to.equal(401);
    expect(body.message).contains('Invalid Password');
  });
});