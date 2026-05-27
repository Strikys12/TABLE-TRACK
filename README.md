# 🍽️ TableTrack - Sistema de Gestión de Reservas

**TableTrack** es una solución integral diseñada para la gestión eficiente de reservas en restaurantes. El sistema permite a los anfitriones registrar, editar, filtrar y monitorear el estado de las mesas en tiempo real, garantizando una operación fluida y evitando conflictos de disponibilidad.

---

## 🚀 Características Principales

### ✅ Gestión de Reservas (CRUD)
Creación, edición y eliminación de reservas mediante una interfaz intuitiva.

### ✅ Validación de Negocio

- **Control de Aforo:** Sistema restringido a **34 mesas físicas**.
- **Capacidad Máxima:** Límite de **25 personas por reserva**.
- **Prevención de Conflictos:** Validación automática para evitar doble reserva.
- **Bloqueo de Fechas:** Impedimento de creación de reservas en horarios pasados.

### ✅ Gestión de Estados
Flujo de trabajo completo con estados:

- En Espera
- Confirmada
- Finalizada

### ✅ Diseño Responsivo
Interfaz moderna y minimalista, optimizada para tablets y escritorio.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- **Node.js** (Versión 18.0.0 o superior)  
  👉 Descárgalo en: https://nodejs.org/

- **Git**  
  👉 Disponible en: https://git-scm.com/



## 💻 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Strikys12/TABLE-TRACK.git

cd TABLE-TRACK

### 2️⃣ Instalar dependencias

```bash
npm install


### 3️⃣ Ejecutar el proyecto

npm run dev

# 🛠️ Tecnologías y Dependencias

Para el desarrollo de TableTrack se utilizaron las siguientes herramientas:

- **React.js** → Framework principal.
- **Tailwind CSS** → Diseño profesional y responsivo.
- **React Router DOM** → Navegación entre Login y Panel.
- **SweetAlert2** → Notificaciones y alertas interactivas.
- **Axios / Fetch** → Comunicación con la REST API (MockAPI).

---

# 📦 Instalación Manual de Librerías

Si necesitas instalar dependencias manualmente:

```bash
npm install react-router-dom sweetalert2 axios


## 🧠 Arquitectura y Lógica

El sistema implementa un patrón de **Rutas Protegidas**, asegurando que el acceso al panel administrativo solo sea posible para usuarios autenticados.

La interfaz está estructurada mediante componentes globales como:

- Header
- Footer

Esto garantiza una experiencia de usuario consistente y escalable.

> “La eficiencia de un restaurante depende de su capacidad para organizar el flujo de clientes. TableTrack no solo registra datos, sino que optimiza el uso de los recursos físicos del local.”

---

## 👨‍💻 Enfoque del Proyecto

Desarrollado con enfoque en:

- Soluciones robustas
- Escalabilidad
- Experiencia de usuario optimizada
- Buenas prácticas de desarrollo frontend