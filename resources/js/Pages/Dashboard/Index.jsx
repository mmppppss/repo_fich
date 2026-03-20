import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    const { auth, theses = [], stats = { total: 0, approved: 0, pending: 0, rejected: 0 } } = usePage().props;

    return (
        <AuthenticatedLayout theses={theses} stats={stats}>
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Bienvenido, {auth?.user?.name || 'Usuario'}
                        </h1>
                        <p className="text-gray-600 mt-1">Gestiona tus tesis y sube nuevo contenido</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Tesis</p>
                                    <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Aprobadas</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Pendientes</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Rechazadas</p>
                                    <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">Mis Tesis</h2>
                            <Link href={route('theses.create')} className="btn-primary">
                                + Subir Nueva Tesis
                            </Link>
                        </div>

                        {theses.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <p className="mb-4">Aún no has subido ninguna tesis.</p>
                                <Link href={route('theses.create')} className="btn-outline">
                                    Subir mi primera tesis
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Año</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {theses.map((thesis) => (
                                            <tr key={thesis.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <Link href={route('theses.show', thesis.id)} className="text-blue-900 hover:underline font-medium">
                                                        {thesis.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`badge-${thesis.status}`}>
                                                        {thesis.status === 'pending' ? 'Pendiente' : 
                                                         thesis.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                                                    </span>
                                                    {thesis.rejection_reason && (
                                                        <p className="text-xs text-red-600 mt-1">{thesis.rejection_reason}</p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{thesis.year}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <Link href={route('theses.show', thesis.id)} className="text-blue-600 hover:text-blue-800 text-sm">
                                                            Ver
                                                        </Link>
                                                        {thesis.status === 'pending' && (
                                                            <>
                                                                <Link href={route('theses.edit', thesis.id)} className="text-gray-600 hover:text-gray-800 text-sm">
                                                                    Editar
                                                                </Link>
                                                                <Link href={route('theses.destroy', thesis.id)} method="delete" as="button" className="text-red-600 hover:text-red-800 text-sm">
                                                                    Eliminar
                                                                </Link>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
