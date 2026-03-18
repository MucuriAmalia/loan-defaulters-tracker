<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionnaireResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_id',
        'question_key',
        'response',
    ];

    protected $casts = [
        'response' => 'array',
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }
}
