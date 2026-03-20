<?php

namespace App\Http\Controllers;

use App\Models\Thesis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

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
}
