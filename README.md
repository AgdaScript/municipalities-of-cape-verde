# Cape Verde Municipalities API

REST API for querying islands, municipalities, zones and streets of Cape Verde, documented with Swagger/OpenAPI 3.0.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cabo-verde` | Full hierarchy (islands, municipalities, zones, streets) |
| GET | `/islands` | List all islands |
| GET | `/islands/{island}` | Island with all children (municipalities, zones, streets) |
| GET | `/islands/{island}/municipalities` | List municipalities of an island |
| GET | `/islands/{island}/municipalities/{municipality}` | Municipality with all children (zones, streets) |
| GET | `/islands/{island}/municipalities/{municipality}/zones` | List zones of a municipality |
| GET | `/islands/{island}/municipalities/{municipality}/zones/{zone}/streets` | List streets of a zone* |

\* Street data is not available in the current JSON; the endpoint returns an empty array and is prepared for future expansion.

## Usage examples

```bash
# Full Cape Verde hierarchy
curl https://municipalities-of-cape-verde.vercel.app/cabo-verde

# Island with all children (municipalities, zones, streets)
curl https://municipalities-of-cape-verde.vercel.app/islands/Santiago

# Municipality with all children (zones, streets)
curl https://municipalities-of-cape-verde.vercel.app/islands/Santiago/municipalities/Praia

# List islands
curl https://municipalities-of-cape-verde.vercel.app/islands

# Municipalities of Santiago
curl https://municipalities-of-cape-verde.vercel.app/islands/Santiago/municipalities

# Zones of Praia
curl https://municipalities-of-cape-verde.vercel.app/islands/Santiago/municipalities/Praia/zones

# Streets of Plateau
curl "https://municipalities-of-cape-verde.vercel.app/islands/Santiago/municipalities/Praia/zones/Plateau/streets"
```

Parameters accept names with or without accents (e.g. `Sao Vicente` or `São Vicente`).

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

Development mode (restarts on file changes):

```bash
npm run dev
```

## Swagger documentation

- **Swagger UI:** https://municipalities-of-cape-verde.vercel.app/api-docs
