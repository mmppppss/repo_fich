import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AllTheses() {
    const { theses, statusFilter } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Gestión de Tesis</h1>
                        <p className="text-gray-600 mt-1">Administra todas las tesis del repositorio</p>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <Link href={route('admin.pending')} className="btn-outline">
                            Pendientes
                        </Link>
                        <Link href={route('admin.theses.index')} className="btn-primary">
                            Todas las Tesis
                        </Link>
                        <Link href={route('admin.statistics')} className="btn-outline">
                            Estadísticas
                        </Link>
                    </div>

                    <div className="card mb-6 p-4">
                        <form method="GET" className="flex gap-4">
                            <select name="status" defaultValue={statusFilter} className="input-field">
                                <option value="">Todos los estados</option>
                                <option value="pending">Pendientes</option>
                                <option value="approved">Aprobadas</option>
                                <option value="rejected">Rechazadas</option>
                            </select>
                            <button type="submit" className="btn-primary">
                                Filtrar
                            </button>
                        </form>
                    </div>

                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Autor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carrera</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Año</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {theses.data.map((thesis) => (
                                        <tr key={thesis.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <Link href={route('theses.show', thesis.id)} className="text-blue-900 hover:underline font-medium">
                                                    {thesis.title.substring(0, 50)}{thesis.title.length > 50 ? '...' : ''}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{thesis.author_name}</td>
                                            <td className="px-6 py-4 text-gray-600">{thesis.career?.name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`badge-${thesis.status}`}>
                                                    {thesis.status === 'pending' ? 'Pendiente' : 
                                                     thesis.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{thesis.year}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Link href={route('theses.show', thesis.id)} className="text-blue-600 hover:text-blue-800 text-sm">
                                                        Ver
                                                    </Link>
                                                    {thesis.status === 'pending' && (
                                                        <>
                                                            <form action={route('admin.theses.approve', thesis.id)} method="POST">
                                                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                                                                <button type="submit" className="text-green-600 hover:text-green-800 text-sm">
                                                                    Aprobar
                                                                </button>
                                                            </form>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <div className="flex gap-2">
                            {theses.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg ${
                                        link.active
                                            ? 'bg-blue-900 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
