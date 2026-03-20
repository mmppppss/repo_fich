<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    protected array $allowedExtensions = ['pdf', 'tex', 'zip', 'html', 'txt'];

    public function upload(UploadedFile $file, int $year): string
    {
        $extension = strtolower($file->getClientOriginalExtension());

        if (!in_array($extension, $this->allowedExtensions)) {
            throw new \InvalidArgumentException(
                "Extensión no permitida: {$extension}. Permitidas: " . implode(', ', $this->allowedExtensions)
            );
        }

        $filename = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $filename .= '_' . time() . '.' . $extension;

        $path = "theses/{$year}/{$filename}";

        Storage::disk('public')->putFileAs(
            dirname($path),
            $file,
            basename($path)
        );

        return $path;
    }

    public function uploadMultiple(array $files, int $year): array
    {
        $uploadedFiles = [];

        foreach ($files as $index => $file) {
            $path = $this->upload($file, $year);
            $uploadedFiles[] = [
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'extension' => strtolower($file->getClientOriginalExtension()),
                'size' => $file->getSize(),
                'is_primary' => $index === 0,
            ];
        }

        return $uploadedFiles;
    }

    public function delete(string $path): bool
    {
        return Storage::disk('public')->delete($path);
    }

    public function getMimeType(string $path): ?string
    {
        $fullPath = storage_path('app/public/' . $path);
        return file_exists($fullPath) ? mime_content_type($fullPath) : null;
    }

    public function getSize(string $path): int
    {
        return Storage::disk('public')->size($path);
    }
}
