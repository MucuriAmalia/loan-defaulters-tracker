<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;

class DashboardController extends Controller
{
    public function index()
    {
        // Load villages with their loans
        $villages = Village::with('loans')->get();

        return Inertia::render('Dashboard', [
            'villages' => $villages
        ]);
    }
}