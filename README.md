# Task Manager - Gestor de Tareas

Aplicación SPA para gestionar tareas con autenticación, persistencia en la nube y notificaciones por email.

## Stack tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Backend as a Service**: Firebase (Auth + Firestore)
- **Email**: AWS SES
- **Deploy**: Vercel
- **Testing**: Vitest + React Testing Library

## Estructura del proyecto

```
src/
├── pages/           # Vistas principales
├── components/      # Componentes reutilizables
├── features/        # Lógica de dominio
├── services/        # Integración con APIs
├── types/           # Interfaces TypeScript
├── hooks/           # Custom hooks
├── utils/           # Funciones auxiliares
functions/          # Serverless functions (Vercel)
tests/              # Tests unitarios y de componentes
DOCUMENTACION_PRIVADA/  # Documentación interna por hito
```

## Setup

```bash
npm install
npm run dev
```

## Testing

```bash
npm run test
npm run test:ui
```

## Variables de entorno

Crea un archivo `.env` basado en `.env.example` con tus credenciales de Firebase.

## Deploy

```bash
npm run build
vercel deploy
```
