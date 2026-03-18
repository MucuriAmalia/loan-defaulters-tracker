<?php

namespace App\Imports;

use App\Models\Loan;
use App\Models\Village;
use App\Models\CreditOfficer;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;
use Illuminate\Support\Str;

class LoansImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // --- Normalize headers dynamically using fuzzy matching ---
        $getColumn = function(array $row, array $possibilities) {
            foreach ($possibilities as $key) {
                foreach ($row as $col => $value) {
                    if (Str::of($col)->lower()->replace(' ', '_')->contains(Str::of($key)->lower()->replace(' ', '_'))) {
                        return $value;
                    }
                }
            }
            return null;
        };

        $accountId       = $getColumn($row, ['account_id', 'accountid', 'acct_id']);
        $accountName     = $getColumn($row, ['account_name', 'accountname', 'name']);
        $villageName     = $getColumn($row, ['village', 'village_name']);
        $creditOfficerName = $getColumn($row, ['credit_officer', 'creditofficer', 'officer']);
        $disbursedAmount = $getColumn($row, ['disbursed_amount', 'disbursedamount']);
        $outstandingPrinciple = $getColumn($row, ['outstanding_principle', 'outstandingprinciple']);
        $outstandingInterest  = $getColumn($row, ['outstanding_interest', 'outstandinginterest']);
        $arrearsAmount       = $getColumn($row, ['arrears_amount', 'arrearsinterest']);
        $arrearsDays         = $getColumn($row, ['arrears_days', 'arrearsdays']);
        $lastPaidRaw         = $getColumn($row, ['last_paid_date', 'lastpaiddate']);

        // --- Skip row if essential info is missing ---
        if (!$accountId || !$accountName) {
            return null;
        }

        // --- Create or get Credit Officer ---
        $creditOfficer = CreditOfficer::firstOrCreate([
            'name' => $creditOfficerName ?? 'Unknown Officer'
        ]);

        // --- Create or get Village ---
        $village = null;
        if ($villageName) {
            $village = Village::firstOrCreate(['name' => $villageName]);
        }

        // --- Parse last paid date safely ---
        $lastPaidDate = null;
        if ($lastPaidRaw) {
            try {
                $lastPaidDate = Carbon::parse($lastPaidRaw);
            } catch (\Exception $e) {
                $lastPaidDate = null;
            }
        }

        // --- Return Loan model ---
        return new Loan([
            'account_id'         => $accountId,
            'account_name'       => $accountName,
            'village_id'         => $village?->id,
            'credit_officer_id'  => $creditOfficer->id,
            'disbursed_amount'   => $disbursedAmount ?? 0,
            'outstanding_balance'=> ($outstandingPrinciple ?? 0) + ($outstandingInterest ?? 0),
            'arrears_amount'     => $arrearsAmount ?? 0,
            'arrears_days'       => $arrearsDays ?? 0,
            'last_paid_date'     => $lastPaidDate,
        ]);
    }
}