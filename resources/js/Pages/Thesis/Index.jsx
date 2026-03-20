import { Link, usePage } from '@inertiajs/react';

const documentTypeLabels = {
    thesis: 'Tesis',
    degree_project: 'Proyecto de Grado',
    programming_project: 'Proyecto de Programación',
    research: 'Investigación',
};

const documentTypeColors = {
    thesis: 'bg-blue-100 text-blue-900',
    degree_project: 'bg-green-100 text-green-900',
    programming_project: 'bg-purple-100 text-purple-900',
    research: 'bg-orange-100 text-orange-900',
};

export default function Index() {
    const { theses, filters, careers } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3">
                                <img src="/media/logo.png" alt="Logo FIC" className="h-10 w-10 object-contain" />
                                <span className="text-xl font-bold text-blue-900">Repositorio Institucional FICH</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="nav-link">Inicio</Link>
                            <Link href={route('theses.index')} className="text-blue-900 font-bold">Documentos</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="header-gradient text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <img src="/media/logo.png" alt="Logo FICH" className="h-16 w-16 object-contain mb-4" />
                    <h1 className="text-4xl font-bold mb-2">Repositorio Institucional FICH</h1>
                    <p className="text-xl opacity-90">Catálogo de Documentos - Facultad Integral del Chaco - Camiri, Bolivia</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="card mb-8 p-4">
                    <form method="GET" action={route('theses.index')} className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search}
                                placeholder="Buscar por título, autor o palabras clave..."
                                className="input-field"
                            />
                        </div>
                        <div className="w-48">
                            <select name="career_id" defaultValue={filters.career_id} className="input-field">
                                <option value="">Todas las Carreras</option>
                            </select>
                        </div>
                        <div className="w-32">
                            <input
                                type="number"
                                name="year"
                                defaultValue={filters.year}
                                placeholder="Año"
                                className="input-field"
                                min="2000"
                            />
                        </div>
                        <button type="submit" className="btn-primary">
                            Buscar
                        </button>
                    </form>
                </div>

                <div className="mb-4 text-gray-600">
                    Mostrando {theses.data.length} de {theses.total} documentos
                </div>

                {theses.data.length === 0 ? (
                    <div className="card p-12 text-center">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xl text-gray-600 mb-4">No se encontraron documentos</p>
                        <Link href={route('theses.index')} className="btn-outline">
                            Limpiar filtros
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {theses.data.map((thesis) => (
                            <div key={thesis.id} className="card hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ${documentTypeColors[thesis.document_type] || documentTypeColors.thesis}`}>
                                            {documentTypeLabels[thesis.document_type] || thesis.document_type}
                                        </span>
                                        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                                            {thesis.career?.name || 'Sin carrera'}
                                        </span>
                                        <span className="text-gray-500 text-sm">{thesis.year}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                        <Link href={route('theses.show', thesis.id)} className="hover:text-blue-900 transition-colors">
                                            {thesis.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        {thesis.author_name}
                                    </p>
                                    {thesis.abstract && (
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                                            {thesis.abstract}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                {thesis.views}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                {thesis.downloads}
                                            </span>
                                        </div>
                                        <Link href={route('theses.show', thesis.id)} className="text-blue-900 hover:underline text-sm font-medium">
                                            Ver más →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-center">
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

            <footer className="bg-blue-900 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <img src="/media/logo.png" alt="Logo FICH" className="h-12 w-12 object-contain mx-auto mb-3" />
                    <p className="mb-2 font-semibold">Repositorio Institucional FICH</p>
                    <p className="text-blue-200 text-sm mb-1">Facultad Integral del Chaco - Camiri, Bolivia</p>
                    <p className="text-blue-300 text-xs">© {new Date().getFullYear()} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
}
