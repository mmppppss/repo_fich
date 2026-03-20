<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThesisFile extends Model
{
    protected $fillable = [
        'thesis_id',
        'file_path',
        'original_name',
        'file_type',
        'file_size',
        'is_primary',
    ];

    protected $casts = [
        'file_size' => 'integer',
        'is_primary' => 'boolean',
    ];

    public function thesis(): BelongsTo
    {
        return $this->belongsTo(Thesis::class);
    }

    public function getFileSizeFormattedAttribute()
    {
        if ($this->file_size < 1024) {
            return $this->file_size . ' B';
        } elseif ($this->file_size < 1024 * 1024) {
            return round($this->file_size / 1024, 2) . ' KB';
        } else {
            return round($this->file_size / 1024 / 1024, 2) . ' MB';
        }
    }

    public function getIconAttribute()
    {
        $icons = [
            'pdf' => ['bg' => 'bg-red-100', 'color' => 'text-red-600', 'icon' => 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'],
            'docx' => ['bg' => 'bg-blue-100', 'color' => 'text-blue-600', 'icon' => 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
            'tex' => ['bg' => 'bg-purple-100', 'color' => 'text-purple-600', 'icon' => 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'],
            'zip' => ['bg' => 'bg-yellow-100', 'color' => 'text-yellow-600', 'icon' => 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'],
            'html' => ['bg' => 'bg-orange-100', 'color' => 'text-orange-600', 'icon' => 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'],
        ];
        return $icons[$this->file_type] ?? $icons['pdf'];
    }
}
