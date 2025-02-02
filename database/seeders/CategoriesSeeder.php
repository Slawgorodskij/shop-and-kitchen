<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Список категорий продуктов с описаниями
        $categories = [
            [
                'category_name' => 'Овощи и зелень',
                'description' => 'Свежие и замороженные овощи, а также зелень для салатов и гарниров.',
            ],
            [
                'category_name' => 'Фрукты и ягоды',
                'description' => 'Свежие, сушеные и консервированные фрукты, а также ягоды для десертов и перекусов.',
            ],
            [
                'category_name' => 'Зерновые и крупы',
                'description' => 'Различные виды круп, макаронных изделий и хлебобулочных продуктов.',
            ],
            [
                'category_name' => 'Молочные продукты',
                'description' => 'Молоко, сыр, творог, йогурт и другие продукты на основе молока.',
            ],
            [
                'category_name' => 'Мясные продукты',
                'description' => 'Говядина, свинина, баранина, птица и мясные полуфабрикаты.',
            ],
            [
                'category_name' => 'Рыба и морепродукты',
                'description' => 'Свежая, замороженная и консервированная рыба, а также морепродукты.',
            ],
            [
                'category_name' => 'Яйца',
                'description' => 'Куриные, утиные и гусиные яйца для приготовления различных блюд.',
            ],
            [
                'category_name' => 'Жиры и масла',
                'description' => 'Растительные и животные жиры, такие как масло, маргарин и сливки.',
            ],
            [
                'category_name' => 'Пряности и приправы',
                'description' => 'Соль, перец, специи, соусы и другие ингредиенты для приправ.',
            ],
            [
                'category_name' => 'Сладости и десерты',
                'description' => 'Шоколад, конфеты, печенье, торты и другие сладкие лакомства.',
            ],
            [
                'category_name' => 'Напитки',
                'description' => 'Вода, соки, нектары, чай, кофе и другие напитки.',
            ],
            [
                'category_name' => 'Алкогольные напитки',
                'description' => 'Алкогольные напитки, такие как вино, пиво и водка.',
            ],
            [
                'category_name' => 'Готовые блюда и полуфабрикаты',
                'description' => 'Замороженные готовые блюда, пельмени, пицца и другие удобные продукты.',
            ],
        ];

        // Добавление категорий в таблицу categories
        foreach ($categories as $category) {
            DB::table('categories_products')->insert([
                'category_name' => $category['category_name'],
                'description' => $category['description'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
