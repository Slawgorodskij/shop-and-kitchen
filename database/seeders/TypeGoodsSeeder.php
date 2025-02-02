<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeGoodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'type_name' => 'Продукты',
                'description' => 'Товары, предназначенные для потребления в пищу.',
            ],
            [
                'type_name' => 'Бытоывая химия',
                'description' => 'Группа потребительских товаров, представляющая собой непродовольственные химические вещества.',
            ],
        ];


        foreach ($types as $type) {
            DB::table('type_goods')->insert([
                'name' => $type['type_name'],
                'description' => $type['description'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
