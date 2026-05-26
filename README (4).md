🍽️ TableTrack - Sistema de Gestión de Reservas
TableTrack es una solución integral diseñada para la gestión eficiente de reservas en restaurantes. El sistema permite a los anfitriones registrar, editar, filtrar y monitorear el estado de las mesas en tiempo real, garantizando una operación fluida y evitando conflictos de disponibilidad.

🚀 Características Principales
Gestión de Reservas (CRUD): Creación, edición y eliminación de reservas mediante una interfaz intuitiva.

Validación de Negocio:

Control de Aforo: Sistema restringido a 34 mesas físicas.

Capacidad Máxima: Límite de 25 personas por reserva.

Prevención de Conflictos: Validación automática para evitar doble reserva.

Bloqueo de Fechas: Impedimento de creación de reservas en horarios pasados.

Gestión de Estados: Flujo de trabajo completo con estados: En Espera, Confirmada y Finalizada.

Diseño Responsivo: Interfaz moderna y minimalista, optimizada para tablets y escritorio.

🛠️ Requisitos Previos
Antes de comenzar, asegúrate de tener instalado en tu sistema:

Node.js: (Versión 18.0.0 o superior). Descárgalo en nodejs.org.

Git: Para clonar y gestionar el repositorio. git-scm.com.

💻 Instalación y Configuración
Sigue estos pasos para levantar el proyecto en tu entorno local:

Clonar el repositorio:
git clone https://github.com/Strikys12/TABLE-TRACK.git
cd TABLE-TRACK

Instalar dependencias:
npm install

Ejecutar el proyecto:
npm run dev
Accede a la dirección que indique la terminal (usualmente http://localhost:5173).

🛠️ Tecnologías y Dependencias
Para el desarrollo de TableTrack se utilizaron las siguientes herramientas:

React.js: Framework principal.

Tailwind CSS: Para un diseño profesional y responsivo.

React Router DOM: Para la navegación (Login/Panel).

SweetAlert2: Notificaciones y alertas interactivas.

Axios / Fetch: Comunicación con la REST API (MockAPI).

Gestión de dependencias:
Si necesitas instalar alguna librería manualmente, puedes usar:
npm install react-router-dom sweetalert2 axios

🧠 Arquitectura y Lógica
El sistema implementa un patrón de Rutas Protegidas, asegurando que el acceso al panel administrativo solo sea posible para usuarios autenticados. La interfaz está estructurada mediante componentes globales (Header y Footer) que garantizan una experiencia de usuario consistente.

"La eficiencia de un restaurante depende de su capacidad para organizar el flujo de clientes. TableTrack no solo registra datos, sino que optimiza el uso de los recursos físicos del local."

Desarrollado con enfoque en soluciones robustas y experiencias de usuario optimizadas.