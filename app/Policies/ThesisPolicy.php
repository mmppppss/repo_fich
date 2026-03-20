<?php

namespace App\Policies;

use App\Models\Thesis;
use App\Models\User;

class ThesisPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Thesis $thesis): bool
    {
        if ($thesis->status === 'approved') {
            return true;
        }

        return $user->id === $thesis->user_id || $user->isAdmin();
    }

    public function create(User $user): bool
    {
        return $user->isStudent() || $user->isAdmin();
    }

    public function update(User $user, Thesis $thesis): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $thesis->user_id && $thesis->isPending();
    }

    public function delete(User $user, Thesis $thesis): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $thesis->user_id && $thesis->isPending();
    }

    public function approve(User $user): bool
    {
        return $user->isAdmin();
    }

    public function reject(User $user): bool
    {
        return $user->isAdmin();
    }
}
