# Explicación de Rate-Limit, CORS y JWT

## 1. Rate-Limit

### **¿Qué es y para qué sirve?**

Rate-limit es como ponerle un límite de velocidad a las solicitudes que un usuario puede hacer a un servidor. Sirve para evitar abusos, evitar ataques de fuerza bruta y proteger la estabilidad del sistema.

### **Ejemplo**

Si alguien intenta iniciar sesión muchas veces consecutivamente para adivinar contraseñas, el rate-limit detiene estas solicitudes y evita que el servidor colapse o sea atacado.

---

## 2. CORS

### **¿Qué problema resuelve?**

El CORS controla desde qué sitios web se permite acceder a una API. Es una medida de seguridad del navegador que evita que cualquier página externa intente usar tu servidor sin permiso.

### **Ejemplo**

Tu frontend está en `misitio.com` y tu backend en `api.misitio.com`. El navegador bloqueará las solicitudes entre dominios a menos que configures CORS para permitirlo.

---

## 3. JWT

### **¿Qué es, qué contiene, para que se usa?**

Un JWT es un token, una especie de pase digital que recibe un usuario cuando inicia sesión. Dentro lleva información como:

* ID del usuario
* Email
* Fecha de expiración

Se usa para identificar al usuario en cada petición sin tener que pedir la contraseña nuevamente.

### **Ejemplo**

Un usuario inicia sesión, el servidor le entrega un JWT. Ahora cada vez que quiera ver su perfil o sus tareas, se enviara ese token y el servidor confirma que está autenticado.

---

# Entonces...

* **Rate-limit**: limita cuántas veces alguien puede pedir información al servidor para evitar abusos.
* **CORS**: controla qué sitios web pueden acceder a tu API.
* **JWT**: token que identifica al usuario después de iniciar sesión.
