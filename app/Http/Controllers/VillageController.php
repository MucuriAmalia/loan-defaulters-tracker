<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Village;

class VillageController extends Controller
{
    public function loans(Village $village)
    {
        // Load loans for the village with their credit officers
        $loans = $village->loans()->with('creditOfficer')->get();

        return Inertia::render('VillageLoans', [
            'village' => $village
        ]);
    }
}
