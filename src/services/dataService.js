import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let data = null;

function normalize(str) {
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

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

export function getIslands() {
  const d = loadData();
  return Object.keys(d);
}

export function getMunicipalities(islandName) {
  const d = loadData();
  const islandKey = findKey(d, islandName);
  if (!islandKey) return null;
  return Object.keys(d[islandKey]);
}

export function getZones(islandName, municipalityName) {
  const d = loadData();
  const islandKey = findKey(d, islandName);
  if (!islandKey) return null;
  const municipalityKey = findKey(d[islandKey], municipalityName);
  if (!municipalityKey) return null;
  const municipality = d[islandKey][municipalityKey];
  const zonas = municipality?.zonas;
  if (!zonas) return null;
  return Array.isArray(zonas) ? zonas : Object.keys(zonas);
}

export function getStreets(islandName, municipalityName, zoneName) {
  const d = loadData();
  const islandKey = findKey(d, islandName);
  if (!islandKey) return null;
  const municipalityKey = findKey(d[islandKey], municipalityName);
  if (!municipalityKey) return null;
  const zonas = d[islandKey][municipalityKey]?.zonas;
  if (!zonas || typeof zonas !== 'object') return null;
  const zoneKey = findKey(zonas, zoneName);
  if (!zoneKey) return null;
  const zoneData = zonas[zoneKey];
  return zoneData?.ruas ?? zoneData?.streets ?? [];
}

export function islandExists(islandName) {
  return findKey(loadData(), islandName) !== null;
}

function buildZoneWithStreets(zoneData) {
  const streets = zoneData?.ruas ?? zoneData?.streets ?? [];
  return { streets };
}

function buildMunicipalityWithChildren(municipalityData) {
  const zonas = municipalityData?.zonas;
  if (!zonas || typeof zonas !== 'object') return { zones: {} };
  const zones = {};
  if (Array.isArray(zonas)) {
    for (const zoneName of zonas) {
      zones[zoneName] = buildZoneWithStreets({});
    }
  } else {
    for (const [zoneName, zoneData] of Object.entries(zonas)) {
      zones[zoneName] = buildZoneWithStreets(zoneData);
    }
  }
  return { zones };
}

function buildIslandWithChildren(islandData) {
  const municipalities = {};
  for (const [munName, munData] of Object.entries(islandData)) {
    municipalities[munName] = buildMunicipalityWithChildren(munData);
  }
  return { municipalities };
}

export function getFullCaboVerde() {
  const d = loadData();
  const islands = {};
  for (const [islandName, islandData] of Object.entries(d)) {
    islands[islandName] = buildIslandWithChildren(islandData);
  }
  return { islands };
}

export function getIslandWithChildren(islandName) {
  const d = loadData();
  const islandKey = findKey(d, islandName);
  if (!islandKey) return null;
  const result = buildIslandWithChildren(d[islandKey]);
  return { island: islandKey, ...result };
}

export function getMunicipalityWithChildren(islandName, municipalityName) {
  const d = loadData();
  const islandKey = findKey(d, islandName);
  if (!islandKey) return null;
  const municipalityKey = findKey(d[islandKey], municipalityName);
  if (!municipalityKey) return null;
  const munData = d[islandKey][municipalityKey];
  const result = buildMunicipalityWithChildren(munData);
  return { municipality: municipalityKey, ...result };
}
