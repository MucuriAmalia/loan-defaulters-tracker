<?php

use Maatwebsite\Excel\Facades\Excel;
use App\Imports\LoansImport;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VillageController;


Route::inertia('/', 'welcome')->name('home');
// Route::get('defaulters/', [LoanController::class, 'defaulters']);

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/villages/{village}/loans', [LoanController::class, 'showVillageLoans'])
    ->name('villages.loans');

    Route::get('/loans/{loan}/details', [LoanController::class, 'showLoanQuestionnaire'])
    ->name('loans.details');

    Route::post('/loans/{loan}/questionnaire', [LoanController::class, 'saveQuestionnaire'])
    ->name('loans.questionnaire.save');

    Route::get('/import-loans', function () {
    Excel::import(new LoansImport, storage_path('app/loans1.xlsx'));

    return "Loans Imported Successfully";
});