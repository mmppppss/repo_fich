<?php

namespace App\Http\Controllers;

use App\Models\Thesis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThesisApprovalController extends Controller
{
    public function index(Request $request)
    {
        $query = Thesis::with(['user', 'career', 'category'])
            ->where('status', 'pending');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('author_name', 'like', "%{$search}%");
            });
        }

        $pendingTheses = $query->orderBy('created_at', 'asc')->paginate(10);

        return Inertia::render('Admin/PendingTheses', [
            'pendingTheses' => $pendingTheses,
        ]);
    }

    public function approve(Thesis $thesis)
    {
        $thesis->update(['status' => 'approved']);

        return back()->with('success', 'Tesis aprobada exitosamente.');
    }

    public function reject(Request $request, Thesis $thesis)
    {
        $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $thesis->update([
            'status' => 'rejected',
            'rejection_reason' => $request->input('reason'),
        ]);

        return back()->with('success', 'Tesis rechazada.');
    }

    public function allTheses(Request $request)
    {
        $query = Thesis::with(['user', 'career', 'category'])
            ->withCount('views', 'downloads');

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        $theses = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AllTheses', [
            'theses' => $theses,
            'statusFilter' => $request->input('status'),
        ]);
    }

    public function statistics()
    {
        $stats = [
            'total' => Thesis::count(),
            'approved' => Thesis::where('status', 'approved')->count(),
            'pending' => Thesis::where('status', 'pending')->count(),
            'rejected' => Thesis::where('status', 'rejected')->count(),
            'totalViews' => Thesis::sum('views'),
            'totalDownloads' => Thesis::sum('downloads'),
        ];

        $byCareer = Thesis::where('status', 'approved')
            ->selectRaw('career_id, count(*) as count')
            ->groupBy('career_id')
            ->with('career')
            ->get();

        $byYear = Thesis::where('status', 'approved')
            ->selectRaw('year, count(*) as count')
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Statistics', [
            'stats' => $stats,
            'byCareer' => $byCareer,
            'byYear' => $byYear,
        ]);
    }
}
