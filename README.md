# Cape Verde Municipalities API

REST API for querying islands, municipalities, zones and streets of Cape Verde, documented with Swagger/OpenAPI 3.0.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/islands` | List all islands |
| GET | `/islands/{island}/municipalities` | List municipalities of an island |
| GET | `/islands/{island}/municipalities/{municipality}/zones` | List zones of a municipality |
| GET | `/islands/{island}/municipalities/{municipality}/zones/{zone}/streets` | List streets of a zone* |

\* Street data is not available in the current JSON; the endpoint returns an empty array and is prepared for future expansion.

## Usage examples

```bash

curl http://localhost:3000/islands


curl http://localhost:3000/islands/Santiago/municipalities


curl http://localhost:3000/islands/Santiago/municipalities/Praia/zones


curl "http://localhost:3000/islands/Santiago/municipalities/Praia/zones/Plateau/streets"
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

After starting the server, access:

- **Swagger UI:** http://localhost:3000/api-docs
