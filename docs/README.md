# RepoFICH - Repositorio de Tesis

## FACULTAD INTEGRAL DEL CHACO - CAMIRI, BOLIVIA

---

## Descripción

RepoFICH es un sistema de gestión de repositorio de tesis desarrollado para la **Facultad Integral del Chaco** en Camiri, Bolivia. Permite a estudiantes subir, gestionar y compartir sus trabajos de investigación en múltiples formatos.

## Características Principales

- **Subida de tesis** en formatos PDF, TEX, ZIP y HTML
- **Sistema de autenticación** con roles (Estudiante/Administrador)
- **Aprobación de contenido** por administradores
- **Búsqueda avanzada** por título, autor, carrera y año
- **Estadísticas** de visualizaciones y descargas
- **Diseño responsive** con los colores institucionales (Rojo y Azul)

## Tecnologías

| Componente | Tecnología |
|------------|------------|
| Backend | Laravel 11 (PHP 8.2+) |
| Frontend | React 18 + InertiaJS |
| Base de Datos | MySQL |
| Autenticación | Laravel Breeze + Spatie Permissions |
| Estilos | Tailwind CSS |

## Requisitos

- PHP 8.2 o superior
- Composer
- Node.js 18+
- MySQL 5.7+ o MariaDB 10.3+
- Extensiones PHP: pdo_mysql, mbstring, xml, zip

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repositorio> repoFich
cd repoFich
```

### 2. Instalar dependencias

```bash
composer install
npm install
```

### 3. Configurar el entorno

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configurar la base de datos

Editar `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=repofich
DB_USERNAME=root
DB_PASSWORD=tu_password
```

### 5. Ejecutar migraciones

```bash
php artisan migrate
php artisan db:seed
```

### 6. Crear enlace simbólico para storage

```bash
php artisan storage:link
```

### 7. Compilar assets

```bash
npm run build
```

### 8. Iniciar el servidor

```bash
php artisan serve
```

## Datos de Acceso

Después de ejecutar los seeders:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@fic.edu.bo | password |
| Student | (creado por factory) | password |

## Estructura del Proyecto

```
repoFich/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Controladores de la aplicación
│   │   └── Requests/        # Validación de formularios
│   ├── Models/              # Modelos Eloquent
│   ├── Policies/             # Políticas de acceso
│   └── Services/             # Servicios de negocio
├── database/
│   ├── migrations/           # Migraciones de BD
│   └── seeders/             # Datos iniciales
├── resources/
│   └── js/
│       ├── Pages/           # Páginas React
│       ├── Components/      # Componentes React
│       └── Layouts/         # Layouts principales
├── routes/
│   └── web.php              # Rutas web
├── docs/                     # Documentación Docsify
└── media/                    # Archivos multimedia (logo)
```

## Roles y Permisos

### Administrador
- Aprobar/rechazar tesis
- Ver estadísticas
- Gestionar todas las tesis
- Gestionar usuarios

### Estudiante
- Subir tesis propias
- Editar tesis pendientes propias
- Eliminar tesis pendientes propias
- Ver tesis aprobadas

## Rutas Principales

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/theses` | Catálogo de tesis |
| `/theses/{id}` | Detalle de tesis |
| `/dashboard` | Panel del usuario |
| `/theses/create` | Subir nueva tesis |
| `/admin/pending` | Aprobaciones (admin) |
| `/admin/statistics` | Estadísticas (admin) |

## Formatos de Archivo Soportados

| Formato | Extensión | Descripción |
|---------|-----------|-------------|
| PDF | `.pdf` | Documento final |
| LaTeX | `.tex` | Código fuente LaTeX |
| ZIP | `.zip` | Paquete con archivos |
| HTML | `.html` | Documento web |
| Texto | `.txt` | Texto plano |

**Límite de tamaño:** 50MB por archivo

## API de Archivos

Los archivos se almacenan en `storage/app/public/theses/{año}/` y se sirven mediante rutas controladas.

## Licencia

Este proyecto es software propietario de la Facultad Integral del Chaco.

---

**FACULTAD INTEGRAL DEL CHACO - CAMIRI, BOLIVIA**
