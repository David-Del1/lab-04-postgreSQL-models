import { Router } from 'express';
import Snack from '../models/Snack';

export default Router()
  .post('/api/v1/snacks', async (req, res) => {
    try {
      const snack = await Snack.insert(req.body);
      res.send(snack);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
