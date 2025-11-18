# 📘 README - Aplicación Next.js

Este proyecto es una aplicación construida con **Next.js**, utilizando **Drizzle ORM** para la gestión de la base de datos y **AWS S3** para almacenamiento de archivos.

---

## 🚀 Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

* Node.js 18+
* PostgreSQL
* Una cuenta y credenciales de AWS (IAM user con permisos para S3)

---

## 🛠 Variables de Entorno

El proyecto incluye un archivo **`.env.template`** como referencia. Debes crear tu propio archivo `.env` basado en este template.

```
DB=postgresql://xxxxx
AWS_ACCESS_KEY_ID=xxxxxx
AWS_SECRET_ACCESS_KEY=xxxx/xx
AWS_REGION=xx-xx-x
AWS_BUCKET_NAME=xxxxx
```

### 🔐 Pasos

1. Copia `.env.template` → `.env`.
2. Completa los valores reales.

---

## 🗄 Base de Datos (Drizzle ORM)

Este proyecto usa **Drizzle ORM** para manejar esquemas y migraciones.

### 🔧 Configuración inicial

Para generar las migraciones basadas en tus esquemas:

```
npx drizzle-kit generate
```

Para aplicar las migraciones a la base de datos:

```
npx drizzle-kit migrate
```

---


## ▶️ Ejecutar el Proyecto

Instala dependencias:

```
npm install
```

Ejecuta la app en desarrollo:

```
npm run dev
```

---
## 📁 Estructura del Proyecto (básica)

```
/project
 ├── drizzle/              # Migraciones y configuración
 ├── src/
 │    ├── app/            # Rutas y páginas (Next.js App Router)
 │    ├── lib/            # Config y utilidades
 │    └── components/     # Componentes reutilizables
 ├── .env.template
 ├── package.json
 └── README.md
```
---

¡Gracias por usar este proyecto! 🚀
