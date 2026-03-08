# API Municípios de Cabo Verde

API REST para consulta de ilhas, municípios, zonas e ruas de Cabo Verde, documentada com Swagger/OpenAPI 3.0.

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/islands` | Lista todas as ilhas |
| GET | `/islands/{island}/municipalities` | Lista municípios de uma ilha |
| GET | `/islands/{island}/municipalities/{municipality}/zones` | Lista zonas de um município |
| GET | `/islands/{island}/municipalities/{municipality}/zones/{zone}/streets` | Lista ruas de uma zona* |

\* Os dados de ruas não estão no JSON atual; o endpoint retorna array vazio e está preparado para expansão.

## Exemplos de uso

```bash
# Listar ilhas
curl http://localhost:3000/islands

# Municípios de Santiago
curl http://localhost:3000/islands/Santiago/municipalities

# Zonas de Praia (Santiago)
curl http://localhost:3000/islands/Santiago/municipalities/Praia/zones

# Ruas de Plateau (dados vazios por agora)
curl "http://localhost:3000/islands/Santiago/municipalities/Praia/zones/Plateau/streets"
```

Os parâmetros aceitam nomes com ou sem acentuação (ex: `Sao Vicente` ou `São Vicente`).

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

Modo desenvolvimento (reinicia ao alterar ficheiros):

```bash
npm run dev
```

## Documentação Swagger

Após iniciar o servidor, acesse:

- **Swagger UI:** http://localhost:3000/api-docs
