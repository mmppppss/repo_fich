import { useForm, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const documentTypes = [
    { value: 'thesis', label: 'Tesis' },
    { value: 'degree_project', label: 'Proyecto de Grado' },
    { value: 'programming_project', label: 'Proyecto de Programación' },
    { value: 'research', label: 'Investigación' },
];

export default function Create() {
    const { careers = [], categories = [], existingTags = [] } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        abstract: '',
        author_name: '',
        advisor: '',
        year: new Date().getFullYear(),
        career_id: '',
        category_id: '',
        keywords: '',
        document_type: 'thesis',
        github_url: '',
        gitlab_url: '',
        live_url: '',
        technologies: '',
        institution: '',
        city: '',
        files: [],
    });

    const [selectedTags, setSelectedTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [filePreviews, setFilePreviews] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map(file => ({
            file,
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            type: file.type,
        }));
        setData('files', [...data.files, ...files]);
        setFilePreviews([...filePreviews, ...newPreviews]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = data.files.filter((_, i) => i !== index);
        const newPreviews = filePreviews.filter((_, i) => i !== index);
        setData('files', newFiles);
        setFilePreviews(newPreviews);
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            const tag = newTag.trim().toLowerCase();
            if (!selectedTags.includes(tag)) {
                setSelectedTags([...selectedTags, tag]);
            }
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setSelectedTags(selectedTags.filter(t => t !== tagToRemove));
    };

    const handleExistingTagToggle = (tagId, tagName) => {
        if (selectedTags.includes(tagName)) {
            setSelectedTags(selectedTags.filter(t => t !== tagName));
        } else {
            setSelectedTags([...selectedTags, tagName]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData('keywords', selectedTags.join(','));
        post(route('theses.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href={route('dashboard')} className="text-blue-900 hover:underline flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver al Dashboard
                        </Link>
                    </div>

                    <div className="card">
                        <div className="p-6 border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900">Subir Nuevo Documento</h1>
                            <p className="text-gray-600 mt-1">Completa el formulario para subir tu documento al repositorio</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="document_type" value="Tipo de Documento *" />
                                <select
                                    id="document_type"
                                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-900 focus:border-transparent"
                                    value={data.document_type}
                                    onChange={(e) => setData('document_type', e.target.value)}
                                    required
                                >
                                    {documentTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.document_type} />
                            </div>

                            <div>
                                <InputLabel htmlFor="title" value="Título del Documento *" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.title} />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="author_name" value="Nombre del Autor *" />
                                    <TextInput
                                        id="author_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.author_name}
                                        onChange={(e) => setData('author_name', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.author_name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="advisor" value="Tutor/Asesor" />
                                    <TextInput
                                        id="advisor"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.advisor}
                                        onChange={(e) => setData('advisor', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.advisor} />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="institution" value="Institución" />
                                    <TextInput
                                        id="institution"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.institution}
                                        onChange={(e) => setData('institution', e.target.value)}
                                        placeholder="Facultad Integral del Chaco"
                                    />
                                    <InputError className="mt-2" message={errors.institution} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="city" value="Ciudad" />
                                    <TextInput
                                        id="city"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="Camiri, Bolivia"
                                    />
                                    <InputError className="mt-2" message={errors.city} />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="abstract" value="Resumen/Abstract" />
                                <textarea
                                    id="abstract"
                                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-900 focus:border-transparent"
                                    rows="4"
                                    value={data.abstract || ''}
                                    onChange={(e) => setData('abstract', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.abstract} />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="career_id" value="Carrera *" />
                                    <select
                                        id="career_id"
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-900 focus:border-transparent"
                                        value={data.career_id}
                                        onChange={(e) => setData('career_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar Carrera</option>
                                        {careers.map((career) => (
                                            <option key={career.id} value={career.id}>
                                                {career.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError className="mt-2" message={errors.career_id} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="year" value="Año *" />
                                    <TextInput
                                        id="year"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        min="2000"
                                        max={new Date().getFullYear() + 1}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.year} />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="technologies" value="Tecnologías/Lenguajes" />
                                <TextInput
                                    id="technologies"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.technologies}
                                    onChange={(e) => setData('technologies', e.target.value)}
                                    placeholder="Python, React, PostgreSQL, Docker"
                                />
                                <InputError className="mt-2" message={errors.technologies} />
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <InputLabel htmlFor="github_url" value="GitHub URL" />
                                    <TextInput
                                        id="github_url"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                        placeholder="https://github.com/usuario/proyecto"
                                    />
                                    <InputError className="mt-2" message={errors.github_url} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="gitlab_url" value="GitLab URL" />
                                    <TextInput
                                        id="gitlab_url"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.gitlab_url}
                                        onChange={(e) => setData('gitlab_url', e.target.value)}
                                        placeholder="https://gitlab.com/usuario/proyecto"
                                    />
                                    <InputError className="mt-2" message={errors.gitlab_url} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="live_url" value="URL en Vivo" />
                                    <TextInput
                                        id="live_url"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.live_url}
                                        onChange={(e) => setData('live_url', e.target.value)}
                                        placeholder="https://proyecto.com"
                                    />
                                    <InputError className="mt-2" message={errors.live_url} />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="keywords" value="Palabras Clave" />
                                <div className="mt-1">
                                    <div className="flex gap-2 mb-2">
                                        <TextInput
                                            id="keywords"
                                            type="text"
                                            className="flex-1"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyDown={handleAddTag}
                                            placeholder="Escribe una palabra y presiona Enter"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (newTag.trim()) {
                                                    const tag = newTag.trim().toLowerCase();
                                                    if (!selectedTags.includes(tag)) {
                                                        setSelectedTags([...selectedTags, tag]);
                                                    }
                                                    setNewTag('');
                                                }
                                            }}
                                            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                                        >
                                            Agregar
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">Presiona Enter o haz clic en Agregar para añadir palabras clave</p>
                                    
                                    {selectedTags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {selectedTags.map((tag) => (
                                                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm">
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTag(tag)}
                                                        className="hover:text-blue-700 font-bold"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {existingTags.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600 mb-2">Sugerencias:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {existingTags.slice(0, 12).map((tag) => (
                                                    <button
                                                        key={tag.id}
                                                        type="button"
                                                        onClick={() => handleExistingTagToggle(tag.id, tag.name)}
                                                        className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                                            selectedTags.includes(tag.name)
                                                                ? 'bg-blue-900 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {tag.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <InputLabel value="Archivos del Documento *" />
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-900 transition-colors">
                                    <div className="space-y-1 text-center">
                                        {filePreviews.length > 0 ? (
                                            <div className="text-left space-y-2">
                                                {filePreviews.map((preview, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span className="text-sm text-gray-700 truncate max-w-xs">{preview.name}</span>
                                                            <span className="text-xs text-gray-500">({preview.size})</span>
                                                            {index === 0 && (
                                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Principal</span>
                                                            )}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                                <label className="cursor-pointer text-blue-900 hover:text-blue-700 text-sm font-medium">
                                                    + Agregar más archivos
                                                    <input id="files-upload" name="files-upload" type="file" className="sr-only" accept=".pdf,.tex,.zip,.html,.txt" onChange={handleFileChange} multiple />
                                                </label>
                                            </div>
                                        ) : (
                                            <>
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-900 hover:text-blue-800 focus-within:outline-none">
                                                        <span>Subir archivos</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,.tex,.zip,.html,.txt" onChange={handleFileChange} multiple required />
                                                    </label>
                                                    <p className="pl-1">o arrastrar y soltar</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, TEX, ZIP, HTML, TXT hasta 50MB c/u</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <InputError className="mt-2" message={errors.files} />
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href={route('dashboard')} className="btn-outline">
                                    Cancelar
                                </Link>
                                <PrimaryButton processing={processing} className="btn-primary">
                                    Subir Documento
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
