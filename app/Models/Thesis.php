<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Thesis extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'career_id',
        'category_id',
        'document_type',
        'title',
        'abstract',
        'author_name',
        'advisor',
        'github_url',
        'gitlab_url',
        'live_url',
        'technologies',
        'institution',
        'city',
        'year',
        'status',
        'rejection_reason',
        'views',
        'downloads',
    ];

    protected $casts = [
        'year' => 'integer',
        'views' => 'integer',
        'downloads' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'thesis_tag');
    }

    public function files(): HasMany
    {
        return $this->hasMany(ThesisFile::class);
    }

    public function getPrimaryFileAttribute()
    {
        return $this->files()->where('is_primary', true)->first() ?? $this->files()->first();
    }

    public function incrementViews(): void
    {
        $this->increment('views');
    }

    public function incrementDownloads(): void
    {
        $this->increment('downloads');
    }

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }
}
