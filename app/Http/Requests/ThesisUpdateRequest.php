<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ThesisUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'abstract' => 'nullable|string|max:5000',
            'author_name' => 'sometimes|string|max:255',
            'advisor' => 'nullable|string|max:255',
            'year' => 'sometimes|integer|min:2000|max:' . (date('Y') + 1),
            'career_id' => 'sometimes|exists:careers,id',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'document_type' => 'sometimes|in:thesis,degree_project,programming_project,research',
            'github_url' => 'nullable|url|max:500',
            'gitlab_url' => 'nullable|url|max:500',
            'live_url' => 'nullable|url|max:500',
            'technologies' => 'nullable|string|max:1000',
            'institution' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'files' => 'nullable|array|min:1',
            'files.*' => 'required|file|mimes:pdf,tex,zip,html,txt|max:51200',
            'is_primary' => 'nullable|integer|min:0',
        ];
    }
}
