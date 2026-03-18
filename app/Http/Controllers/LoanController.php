<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\QuestionnaireResponse;
use Inertia\Inertia;
use App\Models\Village;

class LoanController extends Controller
{
    //

    public function defaulters() {
        return Inertia::render('Defaulters', ['loans' => 'loans']);
    }

public function showVillageLoans(Village $village)
{
    $village->load(['loans.creditOfficer', 'loans.questionnaireResponses']);

    $loans = $village->loans->map(function ($loan) {
        $loan->has_questionnaire = $loan->questionnaireResponses->isNotEmpty();
        return $loan;
    });

    return Inertia::render('VillageLoans', [
        'village' => $village,
        'loans' => $loans,
    ]);
}

public function showLoanQuestionnaire(Loan $loan)
{
    $loan->load('questionnaireResponses');

    // Transform responses into key => value format for frontend
    $responses = $loan->questionnaireResponses->mapWithKeys(function ($item) {
        $value = $item->response;

        // Decode JSON arrays if stored as JSON (e.g., multi-select options)
        $decoded = json_decode($value, true);
        return [$item->question_key => $decoded ?? $value];
    });

    return Inertia::render('LoanQuestionnaire', [
        'loan' => $loan,
        'responses' => $responses,
    ]);
}

public function saveQuestionnaire(Request $request, Loan $loan)
{
    $data = $request->except(['_token']); // avoid saving csrf token

    foreach ($data as $key => $value) {

        // Handle file uploads
        if ($request->hasFile($key)) {
            $file = $request->file($key);
            $path = $file->store('questionnaire_files', 'public');
            $value = $path;
        }

        // Encode arrays (checkbox groups etc.)
        if (is_array($value)) {
            $value = json_encode($value);
        }

        QuestionnaireResponse::updateOrCreate(
            [
                'loan_id' => $loan->id,
                'question_key' => $key,
            ],
            [
                'response' => $value,
            ]
        );
    }

    return redirect()
        ->route('villages.loans', ['village' => $loan->village_id])
        ->with('success', 'Questionnaire saved successfully.');
}

}
