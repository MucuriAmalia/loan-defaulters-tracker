<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'account_name',
        'village_id',
        'credit_officer_id',
        'disbursed_amount',
        'outstanding_balance',
        'arrears_amount',
        'arrears_days',
        'last_paid_date',
    ];

    public function village()
    {
        return $this->belongsTo(Village::class);
    }

    public function creditOfficer()
    {
        return $this->belongsTo(CreditOfficer::class, 'credit_officer_id');
    }

    public function questionnaireResponses()
    {
        return $this->hasMany(QuestionnaireResponse::class);
    }
}
