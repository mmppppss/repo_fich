<?php

namespace Database\Seeders;

use App\Models\Career;
use App\Models\Category;
use App\Models\Faculty;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Role::create(['name' => 'admin', 'guard_name' => 'web']);
        Role::create(['name' => 'student', 'guard_name' => 'web']);

        $admin = User::create([
            'name' => 'Administrador',
            'email' => 'admin@fic.edu.bo',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        $faculty = Faculty::create([
            'name' => 'Facultad Integral del Chaco',
            'slug' => 'facultad-integral-del-chaco',
            'description' => 'Repositorio de tesis de la Facultad Integral del Chaco, Camiri - Bolivia',
            'logo_path' => 'media/logo.png',
        ]);

        $careers = [
            'Ingeniería de Sistemas' => 'Computación y Tecnología de la Información',
            'Derecho' => 'Ciencias Jurídicas y Sociales',
            'Administración de Empresas' => 'Ciencias Administrativas',
            'Contaduría Pública' => 'Ciencias Económicas y Financieras',
            'Ingeniería Agronómica' => 'Ciencias Agrícolas',
            'Medicina' => 'Ciencias de la Salud',
        ];

        foreach ($careers as $name => $description) {
            Career::create([
                'faculty_id' => $faculty->id,
                'name' => $name,
                'slug' => Str::slug($name),
                'description' => $description,
            ]);
        }

        $categories = [
            'Tesis de Grado' => null,
            'Tesis de Maestría' => null,
            'Proyectos de Grado' => null,
        ];

        foreach ($categories as $name => $parentId) {
            $category = Category::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'parent_id' => $parentId,
            ]);
            
            $categories[$name . ' - Subcategoria'] = $category->id;
        }

        $tags = [
            'Sistemas', 'Base de Datos', 'Redes', 'Inteligencia Artificial',
            'Desarrollo Web', 'Software Libre', 'Gestión Empresarial', 'Marketing',
            'Contabilidad', 'Agricultura', 'Producción', 'Salud Pública',
        ];

        foreach ($tags as $name) {
            Tag::create([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);
        }

        User::factory(5)->create()->each(function ($user) use ($faculty) {
            $user->update(['career_id' => $faculty->careers->random()->id]);
            $user->assignRole('student');
        });
    }
}
