import { Router } from 'express';
import Dog from '../models/Dog';

export default Router()
  .post('/api/v1/dogs', async (req, res) => {
    try {
      const dog = await Dog.insert(req.body);
      res.send(dog);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/dogs', async (req, res) => {
    try {
      const dogs = await Dog.readAll();
      res.send(dogs);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.readById(req.params.id);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.update(req.body, req.params.id);
      res.send(dog);
    } catch(err) {
      res.status(500).send(err);
    }
  })
  .delete('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.delete(req.params.id);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
