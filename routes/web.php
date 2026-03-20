<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ThesisApprovalController;
use App\Http\Controllers\ThesisController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/theses', [ThesisController::class, 'index'])->name('theses.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/theses/create', [ThesisController::class, 'create'])->name('theses.create');
    Route::post('/theses', [ThesisController::class, 'store'])->name('theses.store');
    Route::get('/theses/{thesis}/edit', [ThesisController::class, 'edit'])->name('theses.edit');
    Route::put('/theses/{thesis}', [ThesisController::class, 'update'])->name('theses.update');
    Route::delete('/theses/{thesis}', [ThesisController::class, 'destroy'])->name('theses.destroy');

    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/pending', [ThesisApprovalController::class, 'index'])->name('pending');
        Route::post('/theses/{thesis}/approve', [ThesisApprovalController::class, 'approve'])->name('theses.approve');
        Route::post('/theses/{thesis}/reject', [ThesisApprovalController::class, 'reject'])->name('theses.reject');
        Route::get('/theses', [ThesisApprovalController::class, 'allTheses'])->name('theses.index');
        Route::get('/statistics', [ThesisApprovalController::class, 'statistics'])->name('statistics');
    });
});

Route::get('/theses/{thesis}', [ThesisController::class, 'show'])->name('theses.show');
Route::get('/theses/{thesis}/download/{file?}', [ThesisController::class, 'download'])->name('theses.download');

require __DIR__.'/auth.php';
