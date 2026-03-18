<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditOfficer extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }
}
