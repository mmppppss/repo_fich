<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Career extends Model
{
    use HasFactory;

    protected $fillable = ['faculty_id', 'name', 'slug', 'description'];

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    public function theses(): HasMany
    {
        return $this->hasMany(Thesis::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
