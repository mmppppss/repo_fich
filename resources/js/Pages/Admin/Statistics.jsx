import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Statistics() {
    const { stats, byCareer, byYear } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Estadísticas del Repositorio</h1>
                        <p className="text-gray-600 mt-1">Resumen del contenido y actividad del sistema</p>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <Link href={route('admin.pending')} className="btn-outline">
                            Pendientes
                        </Link>
                        <Link href={route('admin.theses.index')} className="btn-outline">
                            Todas las Tesis
                        </Link>
                        <Link href={route('admin.statistics')} className="btn-primary">
                            Estadísticas
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="card p-6">
                            <p className="text-sm text-gray-500 mb-1">Total de Tesis</p>
                            <p className="text-4xl font-bold text-blue-900">{stats.total}</p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm text-gray-500 mb-1">Vistas Totales</p>
                            <p className="text-4xl font-bold text-green-600">{stats.totalViews}</p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm text-gray-500 mb-1">Descargas Totales</p>
                            <p className="text-4xl font-bold text-purple-600">{stats.totalDownloads}</p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm text-gray-500 mb-1">Tasa de Aprobación</p>
                            <p className="text-4xl font-bold text-blue-900">
                                {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="card">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Tesis por Carrera</h2>
                            </div>
                            <div className="p-6">
                                {byCareer.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
                                ) : (
                                    <div className="space-y-4">
                                        {byCareer.map((item) => (
                                            <div key={item.career_id} className="flex items-center justify-between">
                                                <span className="text-gray-700">{item.career?.name}</span>
                                                <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-semibold">
                                                    {item.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Tesis por Año</h2>
                            </div>
                            <div className="p-6">
                                {byYear.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
                                ) : (
                                    <div className="space-y-4">
                                        {byYear.map((item) => (
                                            <div key={item.year} className="flex items-center justify-between">
                                                <span className="text-gray-700">{item.year}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-900 rounded-full"
                                                            style={{ width: `${(item.count / byYear[0].count) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-gray-600 font-medium w-8">{item.count}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
