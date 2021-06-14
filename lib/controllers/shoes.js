import { Router } from 'express';
import Shoe from '../models/Shoe';

export default Router()
  .post('/api/v1/shoes', async (req, res) => {
    try {
      const shoe = await Shoe.insert(req.body);
      res.send(shoe);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/shoes', async (req, res) => {
    try {
      const shoe = await Shoe.readAll();
      res.send(shoe);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/shoes/:id', async (req, res) => {
    try {
      const shoe = await Shoe.readById(req.params.id);
      res.send(shoe);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/api/v1/shoes/:id', async (req, res) => {
    try {
      const shoe = await Shoe.update(req.body, req.params.id);
      res.send(shoe);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/shoes/:id', async (req, res) => {
    try {
      const shoe = await Shoe.delete(req.params.id);
      res.send(shoe);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
