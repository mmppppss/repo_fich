<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ThesisStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'abstract' => 'nullable|string|max:5000',
            'author_name' => 'required|string|max:255',
            'advisor' => 'nullable|string|max:255',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'career_id' => 'required|exists:careers,id',
            'category_id' => 'nullable|exists:categories,id',
            'keywords' => 'nullable|string|max:500',
            'document_type' => 'required|in:thesis,degree_project,programming_project,research',
            'github_url' => 'nullable|url|max:500',
            'gitlab_url' => 'nullable|url|max:500',
            'live_url' => 'nullable|url|max:500',
            'technologies' => 'nullable|string|max:1000',
            'institution' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'files' => 'required|array|min:1',
            'files.*' => 'required|file|mimes:pdf,tex,zip,html,txt|max:51200',
            'is_primary' => 'nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'files.required' => 'Debe subir al menos un archivo.',
            'files.*.mimes' => 'Los archivos deben ser PDF, TEX, ZIP, HTML o TXT.',
            'files.*.max' => 'Cada archivo no debe exceder 50MB.',
            'document_type.in' => 'El tipo de documento debe ser: tesis, proyecto de grado, proyecto de programación o investigación.',
            'github_url.url' => 'La URL de GitHub no es válida.',
            'gitlab_url.url' => 'La URL de GitLab no es válida.',
            'live_url.url' => 'La URL no es válida.',
        ];
    }
}
