import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import islandsRouter from './routes/islands.js';
import { getFullCaboVerde } from './services/dataService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerPath = join(__dirname, '..', 'openapi.yaml');
const swaggerDocument = parse(readFileSync(swaggerPath, 'utf-8'));

app.use(express.json());

app.get('/cabo-verde', (req, res) => {
  res.json(getFullCaboVerde());
});

app.use('/islands', islandsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
