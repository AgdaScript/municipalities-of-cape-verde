import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import islandsRouter from './routes/islands.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger/OpenAPI
const swaggerPath = join(__dirname, '..', 'openapi.yaml');
const swaggerDocument = parse(readFileSync(swaggerPath, 'utf-8'));

app.use(express.json());

// Rotas da API
app.use('/islands', islandsRouter);

// Documentação Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Redireciona / para documentação
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger: http://localhost:${PORT}/api-docs`);
});
