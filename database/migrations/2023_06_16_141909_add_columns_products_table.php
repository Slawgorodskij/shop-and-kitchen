<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('products', function ($table) {
            $table->foreignId('type_products_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('units_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->enum('category', ['продукты', 'товары',]);
            $table->decimal('calories', 6, 2);
            $table->decimal('squirrels', 6, 2);
            $table->decimal('fats', 6, 2);
            $table->decimal('carbohydrates', 6, 2);
            $table->integer('default_weight');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function ($table) {
            $table->dropColumn('type_product_id');
            $table->dropColumn('units_id');
            $table->dropColumn('category');
            $table->dropColumn('calories');
            $table->dropColumn('squirrels');
            $table->dropColumn('fats');
            $table->dropColumn('carbohydrates');
            $table->dropColumn('default_weight');
        });
    }
};
