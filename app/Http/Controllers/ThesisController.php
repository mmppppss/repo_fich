<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThesisStoreRequest;
use App\Http\Requests\ThesisUpdateRequest;
use App\Models\Career;
use App\Models\Thesis;
use App\Models\ThesisFile;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ThesisController extends Controller
{
    public function __construct(
        protected FileUploadService $fileUploadService
    ) {}

    public function index(Request $request)
    {
        $query = Thesis::with(['user', 'career', 'category', 'tags'])
            ->where('status', 'approved');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('author_name', 'like', "%{$search}%")
                    ->orWhere('abstract', 'like', "%{$search}%");
            });
        }

        if ($request->has('career_id')) {
            $query->where('career_id', $request->input('career_id'));
        }

        if ($request->has('year')) {
            $query->where('year', $request->input('year'));
        }

        $theses = $query->orderBy('created_at', 'desc')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Thesis/Index', [
            'theses' => $theses,
            'filters' => $request->only(['search', 'career_id', 'year']),
        ]);
    }

    public function show(Thesis $thesis)
    {
        $thesis->load(['user', 'career', 'category', 'tags', 'files']);
        $thesis->incrementViews();

        return Inertia::render('Thesis/Show', [
            'thesis' => $thesis,
        ]);
    }

    public function create()
    {
        $careers = Career::with('faculty')->get();
        $categories = \App\Models\Category::whereNull('parent_id')->get();
        $existingTags = \App\Models\Tag::all();

        return Inertia::render('Thesis/Create', [
            'careers' => $careers,
            'categories' => $categories,
            'existingTags' => $existingTags,
        ]);
    }

    public function store(ThesisStoreRequest $request)
    {
        $data = $request->validated();

        $thesis = Thesis::create([
            'user_id' => $request->user()->id,
            'career_id' => $data['career_id'],
            'category_id' => $data['category_id'] ?? null,
            'document_type' => $data['document_type'],
            'title' => $data['title'],
            'abstract' => $data['abstract'] ?? null,
            'author_name' => $data['author_name'],
            'advisor' => $data['advisor'] ?? null,
            'github_url' => $data['github_url'] ?? null,
            'gitlab_url' => $data['gitlab_url'] ?? null,
            'live_url' => $data['live_url'] ?? null,
            'technologies' => $data['technologies'] ?? null,
            'institution' => $data['institution'] ?? null,
            'city' => $data['city'] ?? null,
            'year' => $data['year'],
        ]);

        $files = $request->file('files');
        $primaryIndex = $data['is_primary'] ?? 0;
        foreach ($files as $index => $file) {
            $path = $this->fileUploadService->upload($file, $data['year']);
            ThesisFile::create([
                'thesis_id' => $thesis->id,
                'file_path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'file_type' => strtolower($file->getClientOriginalExtension()),
                'file_size' => $file->getSize(),
                'is_primary' => $index === (int)$primaryIndex,
            ]);
        }

        if (!empty($data['keywords'])) {
            $keywords = array_filter(array_map('trim', explode(',', $data['keywords'])));
            $tagIds = [];
            
            foreach ($keywords as $keyword) {
                $tag = \App\Models\Tag::firstOrCreate(
                    ['slug' => \Illuminate\Support\Str::slug($keyword)],
                    ['name' => ucfirst($keyword)]
                );
                $tagIds[] = $tag->id;
            }
            
            if (!empty($tagIds)) {
                $thesis->tags()->attach($tagIds);
            }
        }

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Tesis subida exitosamente', 'redirect' => route('dashboard')]);
        }
        
        session()->flash('success', 'Tesis subida exitosamente. Pendiente de aprobación.');
        
        $user = $request->user();
        $userTheses = Thesis::where('user_id', $user->id)->get();
        $stats = [
            'total' => Thesis::where('user_id', $user->id)->count(),
            'approved' => Thesis::where('user_id', $user->id)->where('status', 'approved')->count(),
            'pending' => Thesis::where('user_id', $user->id)->where('status', 'pending')->count(),
            'rejected' => Thesis::where('user_id', $user->id)->where('status', 'rejected')->count(),
        ];

        return Inertia::render('Dashboard/Index', [
            'theses' => $userTheses,
            'stats' => $stats,
        ]);
    }

    public function edit(Thesis $thesis)
    {
        Gate::authorize('update', $thesis);

        return Inertia::render('Thesis/Edit', [
            'thesis' => $thesis->load(['tags', 'files']),
        ]);
    }

    public function update(ThesisUpdateRequest $request, Thesis $thesis)
    {
        Gate::authorize('update', $thesis);

        $data = $request->validated();

        $thesis->update($data);

        if ($request->hasFile('files')) {
            foreach ($thesis->files as $existingFile) {
                Storage::disk('public')->delete($existingFile->file_path);
                $existingFile->delete();
            }

            $files = $request->file('files');
            $primaryIndex = $data['is_primary'] ?? 0;
            foreach ($files as $index => $file) {
                $path = $this->fileUploadService->upload($file, $data['year'] ?? $thesis->year);
                ThesisFile::create([
                    'thesis_id' => $thesis->id,
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'file_type' => strtolower($file->getClientOriginalExtension()),
                    'file_size' => $file->getSize(),
                    'is_primary' => $index === (int)$primaryIndex,
                ]);
            }
        }

        if (isset($data['tags'])) {
            $thesis->tags()->sync($data['tags']);
        }

        return redirect()->route('dashboard')->with('success', 'Tesis actualizada exitosamente.');
    }

    public function destroy(Thesis $thesis)
    {
        Gate::authorize('delete', $thesis);

        foreach ($thesis->files as $file) {
            Storage::disk('public')->delete($file->file_path);
            $file->delete();
        }
        $thesis->tags()->detach();
        $thesis->delete();

        return redirect()->route('dashboard')->with('success', 'Tesis eliminada exitosamente.');
    }

    public function download(Thesis $thesis, ThesisFile $file)
    {
        $thesis->incrementDownloads();

        $path = storage_path('app/public/' . $file->file_path);

        return response()->download($path, $file->original_name, [
            'Content-Type' => 'application/octet-stream',
            'X-Inertia' => 'false',
        ]);
    }
}
