# Hito 1: Setup Inicial

## ¿Qué se hizo?

Se configuró la estructura base completa del proyecto con todas las herramientas necesarias para desarrollar una aplicación SPA moderna.

## Decisiones de arquitectura

### 1. Estructura de carpetas por capas

```
src/
├── pages/       → Componentes de página (screens completos)
├── components/  → Componentes reutilizables de UI
├── features/    → Lógica de negocio por dominio (auth, tasks, etc)
├── services/    → Integraciones externas (Firebase, API, AWS)
├── types/       → Tipos e interfaces TypeScript
├── hooks/       → Custom hooks para estado y efectos
├── utils/       → Funciones auxiliares puras
```

**Por qué**: Cada capa tiene responsabilidades claras. Los componentes no llaman directamente a Firebase; lo hacen a través de services. Los types están centralizados para reutilización.

### 2. Configuración de TypeScript con `strict: true`

**Por qué**: Evita la mayoría de errores en tiempo de desarrollo. Aunque sea más verboso, ahorra debugging en producción.

### 3. Alias `@/*` para imports

**Por qué**: `import { Task } from '@/types/task'` es más legible que `import { Task } from '../../types/task'`

### 4. Variables de entorno con prefijo `VITE_`

**Por qué**: Vite solo expone en el navegador variables que empiezan con `VITE_`. Las que no tienen ese prefijo permanecen en el servidor (serverless functions).

### 5. `.env` en `.gitignore` desde el inicio

**Por qué**: La seguridad debe ser la primera prioridad. Si se sube por accidente, las credenciales quedan comprometidas.

## Dependencias principales

- **react 18.3.1**: Framework UI
- **react-router-dom 6.22.0**: Enrutamiento SPA
- **firebase 10.7.2**: Auth + Firestore
- **typescript 5.3.3**: Tipado estático
- **vite 5.0.8**: Build tool y dev server ultra rápido
- **vitest 1.0.4**: Testing framework (alternativa a Jest, integrado con Vite)

## Configuración de Vite

- Port 5173
- Alias `@` para imports claros
- Auto-open al iniciar dev

## Configuración de TypeScript

- Target ES2020 (compatible con navegadores modernos)
- `strict: true` para máxima seguridad
- `noUnusedLocals` y `noUnusedParameters` para código limpio
- Paths resueltos para imports

## Estado actual

✅ Proyecto listo para instalar dependencias y comenzar Hito 2
✅ Estructura base validada
✅ Variables de entorno seguras
✅ TypeScript configurado con máxima strictitud

## Próximo paso

**Hito 2**: Configurar Firebase (Auth + Firestore)
