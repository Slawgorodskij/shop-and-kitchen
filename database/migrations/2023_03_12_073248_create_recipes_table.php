<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('name')
                ->unique()
                ->nullable(false);
            $table->text('description')
                ->nullable();
            $table->string('link')
                ->nullable();
            $table->boolean('for_breakfast')
                ->nullable(false)
                ->default(false);
            $table->boolean('for_lunch')
                ->nullable(false)
                ->default(false);
            $table->boolean('for_dinner')
                ->nullable(false)
                ->default(false);
            $table->boolean('for_second_breakfast')
                ->nullable(false)
                ->default(false);
            $table->boolean('for_afternoon_tea')
                ->nullable(false)
                ->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
