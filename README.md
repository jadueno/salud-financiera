# Salud Financiera

App personal (un solo usuario) para ver de un vistazo cómo va tu economía: ingresos, gastos, deudas, ahorro/inversión y recomendaciones. Ingresos, gastos, deudas y transferencias se pueden añadir/editar/borrar libremente — se guardan en una base de datos Postgres local, así que puedes "jugar" con los números sin miedo a romper nada real (y sin perder los cambios al recargar).

## Arrancar en local

Necesitas 3 cosas corriendo a la vez:

```bash
# 1. Base de datos (Postgres en Docker, puerto 5433 para no chocar con otros Postgres locales)
docker compose up -d

# 2. Backend (API)
cd backend
npm install
npm run migrate:up   # solo la primera vez, crea las tablas
npm run seed         # solo la primera vez, carga tus datos reales (backend/src/infrastructure/db/seed.ts, ignorado por git)
npm run dev          # http://localhost:3001

# 3. Frontend (en otra terminal, desde la raíz del proyecto)
npm install
npm run dev          # http://localhost:5183
```

## Datos

- **Ingresos, gastos, deudas y transferencias**: viven en Postgres, se editan desde la propia app (botones "+ Añadir..." y "Eliminar"/"×" en cada pantalla). El backend valida (importes no negativos, categorías válidas) antes de guardar.
- **Edad, estructura de cuentas y fondo de emergencia**: siguen siendo config estática en `src/data/finances.ts` (ignorado por git, con `finances.example.ts` como plantilla) — no cambian con el día a día, no tenía sentido meterlos en la base de datos.
- El **saldo pendiente de cada deuda** no se edita a mano: cada deuda guarda su saldo conocido y el mes al que corresponde (`balanceAsOf`), y la app resta una cuota por cada mes transcurrido desde entonces.
- El **saldo del fondo de emergencia** se introduce en la pantalla "Ahorro" y se guarda en `localStorage` del navegador (no en la base de datos, es solo una referencia personal).

## Estructura

- `src/domain/` — tipos y cálculos financieros puros (sin UI, sin red).
- `src/data/` — `finances.ts` (config estática real, ignorado por git), `api.ts` + `useFinancialData.ts` (cliente HTTP y estado de la app).
- `src/features/` — una pantalla por carpeta (resumen, gastos [ingresos+gastos+transferencias], deudas, ahorro, recomendaciones), con sus formularios de alta.
- `src/components/` — piezas de UI reutilizables.
- `backend/` — API en Node + TypeScript (Fastify) sobre Postgres, arquitectura hexagonal (`domain/` → `application/` → `infrastructure/`). Ver `backend/README.md`.
- `docker-compose.yml` — Postgres local, puerto 5433.

## Privacidad

Los datos financieros reales no salen de este Mac: no se suben a GitHub (`.gitignore` cubre `finances.ts` y `backend/src/infrastructure/db/seed.ts`), la base de datos es un contenedor Docker local, y no hay ningún despliegue remoto configurado.
