# Task Manager - Gestor de Tareas Inteligente

Aplicación SPA (Single Page Application) de alto rendimiento para la gestión optimizada de tareas diarias. El proyecto implementa un flujo completo de autenticación de usuarios, persistencia en tiempo real en la nube, rutas protegidas en el cliente y un sistema automatizado de notificaciones por correo electrónico mediante arquitectura Serverless.

## 🚀 Características Principales

- **Autenticación Robusta**: Registro e inicio de sesión seguro mediante correo/contraseña y proveedor de identidad social (Google Auth) integrado con Firebase Authentication.
- **Gestión CRUD en Tiempo Real**: Creación, lectura, actualización y eliminación de tareas vinculadas de forma aislada a cada usuario a través de Cloud Firestore.
- **Rutas Protegidas**: Sistema de enrutamiento del lado del cliente que restringe el acceso a la consola de tareas a usuarios no autenticados.
- **Notificaciones Serverless**: Endpoint seguro en el backend (`/api/send-email`) que procesa y despacha resúmenes de tareas en formato HTML utilizando Amazon SES (Simple Email Service).
- **Diseño Responsivo y Modular**: Interfaz de usuario fluida, optimizada para dispositivos móviles y escritorio, siguiendo buenas prácticas de reutilización de componentes.

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Backend as a Service (BaaS)**: Firebase (Auth + Cloud Firestore)
- **Infraestructura Serverless**: Vercel Functions (Node.js)
- **Servicio de Email**: AWS SDK v2 (Amazon SES)
- **Despliegue e Integración Continu**: Vercel
- **Testing**: Vitest + React Testing Library

## 📁 Estructura del Proyecto

La arquitectura sigue un patrón modular y orientado a servicios, facilitando la escalabilidad y el mantenimiento del código:

```text
├── api/               # Serverless Functions de Vercel (Backend Node.js)
│   └── send-email.ts  # Endpoint de integración con AWS SES
├── src/
│   ├── components/    # Componentes globales y reutilizables de la UI
│   ├── features/      # Lógica de dominio por módulos (Tareas, Auth)
│   ├── hooks/         # Custom Hooks para abstracción de lógica de estado
│   ├── pages/         # Vistas principales de la SPA (Login, Register, Dashboard)
│   ├── services/      # Integración y configuración de APIs (Firebase, Email)
│   ├── types/         # Definiciones de interfaces y tipos de TypeScript
│   └── utils/         # Funciones auxiliares y helpers globales
├── tests/             # Suite de pruebas unitarias y de componentes
├── vercel.json        # Configuración de redirecciones SPA para entornos de producción
```

## ⚙️ Configuración del Entorno (Setup)

### 1. Clonar el repositorio e instalar dependencias
```bash
npm install
```

### 2. Variables de Entorno

Para que el proyecto funcione correctamente, debés configurar las variables de entorno. Crea un archivo `.env` en la raíz para el desarrollo local y carga las siguientes llaves en el panel de Vercel para entornos de producción:

#### Frontend (Variables de Vite - Prefijo VITE_)
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

#### Backend / Serverless (Variables de Entorno Seguras en Vercel)
```env
AWS_ACCESS_KEY_ID=tu_aws_access_key_id
AWS_SECRET_ACCESS_KEY=tu_aws_secret_access_key
AWS_REGION=us-east-1
SES_EMAIL_FROM=tu-email-verificado@dominio.com
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

## 🧪 Ejecución de Tests

El proyecto cuenta con cobertura de pruebas unitarias y de integración para garantizar la estabilidad de los componentes clave:

```bash
# Ejecutar la suite de pruebas en modo watch
npm run test

# Abrir la interfaz interactiva de Vitest UI
npm run test:ui
```

## 🚀 Despliegue en Producción

La SPA está configurada para compilarse y desplegarse automáticamente en Vercel mediante integración directa con GitHub. Debido al uso de enrutamiento dinámico en el cliente (React Router), el proyecto incluye un archivo `vercel.json` que redirige de forma segura todas las peticiones al `index.html` para prevenir errores 404 al recargar páginas internas:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Para realizar un despliegue manual mediante la interfaz de comandos de Vercel:
```bash
npm run build
vercel --prod
```