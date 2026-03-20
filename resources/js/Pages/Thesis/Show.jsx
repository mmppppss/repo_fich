import { Link, usePage } from '@inertiajs/react';

const documentTypeLabels = {
    thesis: 'Tesis',
    degree_project: 'Proyecto de Grado',
    programming_project: 'Proyecto de Programación',
    research: 'Investigación',
};

export default function Show({ thesis }) {
    const { auth } = usePage().props;

    const getFileIcon = (type) => {
        const icons = {
            pdf: { bg: 'bg-red-100', color: 'text-red-600', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
            tex: { bg: 'bg-purple-100', color: 'text-purple-600', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
            zip: { bg: 'bg-yellow-100', color: 'text-yellow-600', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
            html: { bg: 'bg-orange-100', color: 'text-orange-600', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
            txt: { bg: 'bg-gray-100', color: 'text-gray-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        };
        return icons[type] || icons.pdf;
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

    const handleDownload = (fileId) => {
        const url = route('theses.download', { thesis: thesis.id, file: fileId });
        window.open(url, '_blank');
    };

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
                            <Link href={route('theses.index')} className="nav-link">Documentos</Link>
                            {auth.user ? (
                                <Link href={route('dashboard')} className="btn-primary">
                                    Mi Panel
                                </Link>
                            ) : (
                                <Link href={route('login')} className="btn-outline">
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href={route('theses.index')} className="text-blue-900 hover:underline flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver al catálogo
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="card">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    <span className="bg-blue-100 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
                                        {thesis.career?.name || 'Sin carrera'}
                                    </span>
                                    <span className="bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded-full">
                                        {documentTypeLabels[thesis.document_type] || thesis.document_type}
                                    </span>
                                    <span className="text-gray-500">{thesis.year}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{thesis.title}</h1>
                                <div className="space-y-2 text-gray-600">
                                    <p className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <strong>Autor:</strong> {thesis.author_name}
                                    </p>
                                    {thesis.advisor && (
                                        <p className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <strong>Tutor:</strong> {thesis.advisor}
                                        </p>
                                    )}
                                    {(thesis.institution || thesis.city) && (
                                        <p className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{thesis.institution}{thesis.city ? ` - ${thesis.city}` : ''}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {thesis.abstract && (
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Resumen</h2>
                                    <p className="text-gray-700 leading-relaxed">{thesis.abstract}</p>
                                </div>
                            )}

                            {thesis.technologies && (
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Tecnologías</h2>
                                    <p className="text-gray-700">{thesis.technologies}</p>
                                </div>
                            )}

                            {(thesis.github_url || thesis.gitlab_url || thesis.live_url) && (
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Enlaces</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {thesis.github_url && (
                                            <a href={thesis.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                                GitHub
                                            </a>
                                        )}
                                        {thesis.gitlab_url && (
                                            <a href={thesis.gitlab_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h10.02l2.44-7.51a.42.42 0 01.11-.18.43.43 0 01.58 0 .42.42 0 01.12.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z"/>
                                                </svg>
                                                GitLab
                                            </a>
                                        )}
                                        {thesis.live_url && (
                                            <a href={thesis.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Ver en Vivo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {thesis.tags && thesis.tags.length > 0 && (
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Palabras Clave</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {thesis.tags.map((tag) => (
                                            <span key={tag.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {thesis.views} visitas
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            {thesis.downloads} descargas
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card p-6 sticky top-24">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Archivos ({thesis.files?.length || 0})</h3>
                            {thesis.files && thesis.files.length > 0 ? (
                                <div className="space-y-3">
                                    {thesis.files.map((file, index) => {
                                        const fileInfo = getFileIcon(file.file_type);
                                        return (
                                            <div key={file.id} className={`${fileInfo.bg} rounded-lg p-3`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <svg className={`w-6 h-6 ${fileInfo.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={fileInfo.icon} />
                                                    </svg>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate" title={file.original_name}>
                                                            {file.original_name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{formatFileSize(file.file_size)}</p>
                                                    </div>
                                                    {file.is_primary && (
                                                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">Principal</span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleDownload(file.id)}
                                                    className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    Descargar
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No hay archivos disponibles</p>
                            )}
                        </div>
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
