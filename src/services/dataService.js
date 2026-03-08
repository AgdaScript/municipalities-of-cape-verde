import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let data = null;

/**
 * Normaliza string para comparação (remove acentos, lowercase)
 */
function normalize(str) {
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Encontra chave no objeto por nome normalizado
 */
function findKey(obj, searchName) {
  if (!obj || typeof obj !== 'object') return null;
  const normalized = normalize(searchName);
  return Object.keys(obj).find((key) => normalize(key) === normalized) || null;
}

function loadData() {
  if (!data) {
    const path = join(__dirname, '..', '..', 'municipalities-of-cape-verde.json');
    const raw = readFileSync(path, 'utf-8');
    data = JSON.parse(raw);
  }
  return data;
}

/**
 * Lista todas as ilhas
 */
export function getIslands() {
  const d = loadData();
  return Object.keys(d);
}

/**
 * Lista municípios de uma ilha
 */
export function getMunicipalities(islandName) {
  const d = loadData();
  const islandKey = findKey(d, islandName);
  if (!islandKey) return null;
  return Object.keys(d[islandKey]);
}

/**
 * Lista zonas de um município
 */
export function getZones(islandName, municipalityName) {
  const d = loadData();
  const islandKey = findKey(d, islandName);
  if (!islandKey) return null;
  const municipalityKey = findKey(d[islandKey], municipalityName);
  if (!municipalityKey) return null;
  const municipality = d[islandKey][municipalityKey];
  return municipality?.zonas ?? null;
}

/**
 * Obtém ruas de uma zona (dados não disponíveis no JSON - retorna array vazio)
 * Estrutura preparada para futuras expansões
 */
export function getStreets(islandName, municipalityName, zoneName) {
  const zones = getZones(islandName, municipalityName);
  if (!zones) return null;
  const zoneKey = zones.find((z) => normalize(z) === normalize(zoneName));
  if (!zoneKey) return null;
  // Dados de ruas não existem no JSON - retorna array vazio
  return [];
}

/**
 * Verifica se ilha existe
 */
export function islandExists(islandName) {
  return findKey(loadData(), islandName) !== null;
}
