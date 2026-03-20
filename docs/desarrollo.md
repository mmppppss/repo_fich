# Guía del Desarrollador

## Arquitectura

### Patrón MVC con Inertia

El proyecto sigue el patrón **Model-View-Controller** adaptado para SPA con InertiaJS:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   ReactJS   │ ←→  │   Inertia    │ ←→  │   Laravel    │
│   (Views)   │     │   (Bridge)   │     │ Controller  │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                   ┌────────────────────────────┴──────┐
                   │              Services              │
                   │  FileUploadService                 │
                   └───────────────────────────────────┘
                                                │
                   ┌────────────────────────────┴──────┐
                   │         Eloquent Models          │
                   │  Thesis, User, Career, Category  │
                   └───────────────────────────────────┘
```

## Modelos

### User
```php
User::create([...])->assignRole('student');
User::create([...])->assignRole('admin');
```

### Thesis
```php
Thesis::create([
    'user_id' => auth()->id(),
    'title' => 'Mi Tesis',
    'status' => 'pending',
    // ...
]);
```

## Controladores

### ThesisController
Gestiona CRUD de tesis y descargas.

### ThesisApprovalController
Gestiona aprobaciones y estadísticas (admin).

## Políticas

### ThesisPolicy
Controla quién puede ver, crear, editar o eliminar tesis.

## Servicios

### FileUploadService
```php
$service = app(FileUploadService::class);
$path = $service->upload($file, $year);
$service->delete($path);
```

## Middleware

| Middleware | Función |
|------------|---------|
| `auth` | Requiere autenticación |
| `verified` | Requiere email verificado |
| `role:admin` | Requiere rol de administrador |

## Comandos Artisan Útiles

```bash
# Migraciones
php artisan migrate
php artisan migrate:fresh --seed

# Limpiar caché
php artisan cache:clear
php artisan config:clear

# Permisos de storage
php artisan storage:link

# Ver rutas
php artisan route:list
```

## Testing

```bash
php artisan test
```

## Deployment

### Producción

1. Configurar `.env` con producción
2. Optimizar:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
composer install --optimize-autoloader
```

3. Permisos:
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data .
```

4. Servir con Apache/Nginx apuntando a `public/`
