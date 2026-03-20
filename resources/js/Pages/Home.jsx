import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Home({ auth }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            <img src="/media/logo.png" alt="Logo FICH" className="h-10 w-10 object-contain" />
                            <span className="text-xl font-bold text-blue-900">Repositorio Institucional FICH</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="btn-primary">
                                    Mi Panel
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="nav-link">
                                        Iniciar Sesión
                                    </Link>
                                    <Link href={route('register')} className="btn-primary">
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="header-gradient text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <img src="/media/logo.png" alt="Logo FICH" className="h-24 w-24 object-contain mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Repositorio Institucional
                    </h1>
                    <p className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-200">
                        FICH - Camiri
                    </p>
                    <p className="text-lg mb-8 opacity-90">
                        Facultad Integral del Chaco - Bolivia
                    </p>
                    <Link href={route('theses.index')} className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Explorar Tesis
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="card p-6 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tesis PDF, TEX, ZIP, HTML</h3>
                        <p className="text-gray-600">Multiple formatos de documento soportados para tu investigación académica.</p>
                    </div>

                    <div className="card p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Contenido Verificado</h3>
                        <p className="text-gray-600">Todas las tesis son revisadas y aprobadas por administradores.</p>
                    </div>

                    <div className="card p-6 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Búsqueda Avanzada</h3>
                        <p className="text-gray-600">Encuentra rápidamente tesis por título, autor, carrera o palabras clave.</p>
                    </div>
                </div>
            </div>

            <footer className="bg-blue-900 text-white py-8 mt-auto">
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
