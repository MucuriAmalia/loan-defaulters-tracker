<?php

namespace App\Imports;

use App\Models\Loan;
use App\Models\Village;
use App\Models\CreditOfficer;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class LoansImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        $village = Village::firstOrCreate([
            'name' => $row['village']
        ]);

        $creditOfficer = CreditOfficer::firstOrCreate([
            'id' => $row['creditofficerid']
        ]);

        return new Loan([
            'account_id' => $row['accountid'],
            'account_name' => $row['accountname'],
            'village_id' => $village->id,
            'credit_officer_id' => $creditOfficer->id,
            'outstanding_balance' => $row['outstandingprinciple'] + $row['outstandinginterest'],
            'arrears_amount' => $row['arrearsinterest'],
            'arrears_days' => $row['arrearsdays'],
        ]);
    }
}