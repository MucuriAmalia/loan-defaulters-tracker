<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->string('account_id');
            $table->string('account_name');
            $table->foreignId('village_id')->constrained()->cascadeOnDelete();
            $table->foreignId('credit_officer_id')->constrained()->cascadeOnDelete();

            $table->decimal('disbursed_amount', 12, 2)->nullable();
            $table->decimal('outstanding_balance', 12, 2)->nullable();
            $table->decimal('arrears_amount', 12, 2)->nullable();
            $table->integer('arrears_days')->nullable();

            $table->date('last_paid_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
