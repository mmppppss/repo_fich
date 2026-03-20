# Base de Datos

## Esquema de Tablas

### users
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT | Identificador único |
| name | VARCHAR(255) | Nombre del usuario |
| email | VARCHAR(255) | Email (único) |
| password | VARCHAR | Hash de contraseña |
| career_id | BIGINT | FK a careers (opcional) |
| email_verified_at | TIMESTAMP | Verificación de email |
| created_at | TIMESTAMP | Fecha creación |
| updated_at | TIMESTAMP | Fecha actualización |

### roles (Spatie)
| Campo | Tipo |
|-------|------|
| id | BIGINT |
| name | VARCHAR(255) |
| guard_name | VARCHAR(255) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

### role_user (Spatie)
| Campo | Tipo |
|-------|------|
| user_id | BIGINT |
| role_id | BIGINT |

### faculties
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT | Identificador único |
| name | VARCHAR(255) | Nombre de la facultad |
| slug | VARCHAR(255) | URL amigable |
| description | TEXT | Descripción |
| logo_path | VARCHAR(255) | Ruta del logo |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### careers
| Campo | Tipo |
|-------|------|
| id | BIGINT |
| faculty_id | BIGINT FK |
| name | VARCHAR(255) |
| slug | VARCHAR(255) |
| description | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

### categories
| Campo | Tipo |
|-------|------|
| id | BIGINT |
| parent_id | BIGINT FK (self) |
| name | VARCHAR(255) |
| slug | VARCHAR(255) |
| description | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

### theses
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT | |
| user_id | BIGINT FK | Autor |
| career_id | BIGINT FK | Carrera |
| category_id | BIGINT FK | Categoría (nullable) |
| title | VARCHAR(255) | Título |
| abstract | TEXT | Resumen |
| author_name | VARCHAR(255) | Nombre del autor |
| advisor | VARCHAR(255) | Tutor |
| year | YEAR | Año de presentación |
| file_path | VARCHAR(255) | Ruta del archivo |
| file_type | ENUM | pdf, tex, zip, html |
| file_size | INT | Tamaño en bytes |
| status | ENUM | pending, approved, rejected |
| rejection_reason | TEXT | Razón de rechazo |
| views | INT | Contador de vistas |
| downloads | INT | Contador de descargas |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### tags
| Campo | Tipo |
|-------|------|
| id | BIGINT |
| name | VARCHAR(255) |
| slug | VARCHAR(255) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

### thesis_tag (pivot)
| Campo | Tipo |
|-------|------|
| thesis_id | BIGINT FK |
| tag_id | BIGINT FK |

## Índices

```sql
-- theses
INDEX (status, year)
INDEX (career_id, status)

-- careers
INDEX (faculty_id)

-- categories
INDEX (parent_id)
```

## Relaciones

```
Faculty 1──M Career
Career 1──M User
Career 1──M Thesis
Thesis M──1 User
Thesis M──M Tag
Category 1──M Thesis
Category 1──M Category (self)
```
