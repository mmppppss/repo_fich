import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PendingTheses() {
    const { pendingTheses } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Tesis Pendientes de Aprobación</h1>
                        <p className="text-gray-600 mt-1">Revisa y aproba las tesis enviadas por los estudiantes</p>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <Link href={route('admin.pending')} className="btn-primary">
                            Pendientes ({pendingTheses.total})
                        </Link>
                        <Link href={route('admin.theses.index')} className="btn-outline">
                            Todas las Tesis
                        </Link>
                        <Link href={route('admin.statistics')} className="btn-outline">
                            Estadísticas
                        </Link>
                    </div>

                    {pendingTheses.data.length === 0 ? (
                        <div className="card p-12 text-center">
                            <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xl text-gray-600">¡No hay tesis pendientes!</p>
                            <p className="text-gray-500 mt-2">Todas las tesis han sido revisadas.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingTheses.data.map((thesis) => (
                                <div key={thesis.id} className="card p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-blue-100 text-blue-900 text-sm font-semibold px-2 py-1 rounded">
                                                    {thesis.career?.name}
                                                </span>
                                                <span className="text-gray-500">{thesis.year}</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{thesis.title}</h3>
                                            <p className="text-gray-600 mb-2">
                                                <strong>Autor:</strong> {thesis.author_name}
                                                {thesis.advisor && <span className="ml-4"><strong>Tutor:</strong> {thesis.advisor}</span>}
                                            </p>
                                            {thesis.abstract && (
                                                <p className="text-gray-500 text-sm line-clamp-2">{thesis.abstract}</p>
                                            )}
                                            <p className="text-sm text-gray-400 mt-2">
                                                Subido por: {thesis.user?.name} - {new Date(thesis.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2 ml-4">
                                            <form action={route('admin.theses.approve', thesis.id)} method="POST">
                                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full">
                                                    Aprobar
                                                </button>
                                            </form>
                                            <form action={route('admin.theses.reject', thesis.id)} method="POST" className="flex flex-col gap-1">
                                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                                                <input
                                                    type="text"
                                                    name="reason"
                                                    placeholder="Razón del rechazo"
                                                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                    required
                                                />
                                                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                                                    Rechazar
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex justify-center">
                        <div className="flex gap-2">
                            {pendingTheses.links.map((link, index) => (
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
