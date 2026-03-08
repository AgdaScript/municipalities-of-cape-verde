import { Router } from 'express';
import {
  getIslands,
  getMunicipalities,
  getZones,
  getStreets,
} from '../services/dataService.js';

const router = Router();

router.get('/', (req, res) => {
  const islands = getIslands();
  res.json({ islands });
});

router.get('/:island/municipalities', (req, res) => {
  const { island } = req.params;
  const municipalities = getMunicipalities(island);
  if (municipalities === null) {
    return res.status(404).json({
      error: 'Island not found',
      message: `Island "${island}" does not exist in the data.`,
    });
  }
  res.json({ municipalities });
});

router.get('/:island/municipalities/:municipality/zones', (req, res) => {
  const { island, municipality } = req.params;
  const zones = getZones(island, municipality);
  if (zones === null) {
    return res.status(404).json({
      error: 'Resource not found',
      message: `Island "${island}" or municipality "${municipality}" not found.`,
    });
  }
  res.json({ zones });
});

router.get(
  '/:island/municipalities/:municipality/zones/:zone/streets',
  (req, res) => {
    const { island, municipality, zone } = req.params;
    const streets = getStreets(island, municipality, zone);
    if (streets === null) {
      return res.status(404).json({
        error: 'Resource not found',
        message: 'Island, municipality or zone not found.',
      });
    }
    res.json({ streets });
  }
);

export default router;
