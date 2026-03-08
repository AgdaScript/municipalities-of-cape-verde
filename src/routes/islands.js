import { Router } from 'express';
import {
  getIslands,
  getMunicipalities,
  getZones,
  getStreets,
} from '../services/dataService.js';

const router = Router();

/**
 * GET /islands
 * Lista todas as ilhas de Cabo Verde
 */
router.get('/', (req, res) => {
  const islands = getIslands();
  res.json({ islands });
});

/**
 * GET /islands/:island/municipalities
 * Lista municípios de uma ilha
 */
router.get('/:island/municipalities', (req, res) => {
  const { island } = req.params;
  const municipalities = getMunicipalities(island);
  if (municipalities === null) {
    return res.status(404).json({
      error: 'Ilha não encontrada',
      message: `A ilha "${island}" não existe nos dados.`,
    });
  }
  res.json({ municipalities });
});

/**
 * GET /islands/:island/municipalities/:municipality/zones
 * Lista zonas de um município
 */
router.get('/:island/municipalities/:municipality/zones', (req, res) => {
  const { island, municipality } = req.params;
  const zones = getZones(island, municipality);
  if (zones === null) {
    return res.status(404).json({
      error: 'Recurso não encontrado',
      message: `Ilha "${island}" ou município "${municipality}" não encontrado.`,
    });
  }
  res.json({ zones });
});

/**
 * GET /islands/:island/municipalities/:municipality/zones/:zone/streets
 * Lista ruas de uma zona (estrutura preparada - dados não disponíveis no JSON)
 */
router.get(
  '/:island/municipalities/:municipality/zones/:zone/streets',
  (req, res) => {
    const { island, municipality, zone } = req.params;
    const streets = getStreets(island, municipality, zone);
    if (streets === null) {
      return res.status(404).json({
        error: 'Recurso não encontrado',
        message: `Ilha, município ou zona não encontrado.`,
      });
    }
    res.json({ streets });
  }
);

export default router;
