# Task Manager API

API construida con **Node.js, Express, Prisma y JWT**, que permite manejar usuarios y tareas, implementando seguridad con **Passport + JWT**, **Rate Limiting** y **CORS configurado**.


## Tecnologías principales

* Node.js + Express
* Prisma ORM
* PostgreSQL
* JWT para autenticación
* Passport con estrategia JWT
* bcrypt para hashing
* express-rate-limit
* CORS protegido

# Instalación del proyecto

## Clonar el repositorio

```bash
git clone <URL-del-repo>
cd <nombre-del-proyecto>
```

## Instalar dependencias

```bash
npm install
```

# Variables de entorno

Crea un archivo `.env` (NO subir este archivo):

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db?schema=public"
JWT_SECRET="clave-secreta-super-segura"
PORT=3000
```

En el proyecto existe un archivo `.env.example` como guía.

# Migraciones con Prisma

Ejecutar la primera migración:

```bash
npx prisma migrate dev --name init
```

Abrir Prisma Studio:

```bash
npx prisma studio
```

# Seguridad del proyecto

## Flujo de Autenticación (Registro → Login → Token → Rutas protegidas)

1. **Registro – POST /auth/register**
   Crea usuario con contraseña hasheada.

2. **Login – POST /auth/login**

   * Valida email/password
   * Genera JWT con:

     * `sub: user.id`
     * `exp: <tiempo>`
   * Devuelve token.

3. **Rutas protegidas (ej: /tasks)**
   El cliente debe enviar:
   `Authorization: Bearer <token>`

# Configuración de seguridad

## CORS (src/app.js)

```js
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
```

## Rate Limit (src/app.js)

```js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
```

## Passport con JWT (src/config/passport.js)

* Extrae token del header Authorization
* Verifica JWT
* Busca usuario en BD

Uso en una ruta protegida:

```js
router.get(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  taskController.getTasks
);
```

# Iniciar servidor

```bash
npm run dev
```

Debe mostrar algo como:

```
Server running on http://localhost:3000
Connected to database with Prisma
```

# Confirmación

✔️ `.env` está en `.gitignore`
✔️ No se suben claves ni datos sensibles
✔️ El proyecto inicia sin errores

