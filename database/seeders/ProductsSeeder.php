<?php

namespace Database\Seeders;

use App\Models\CategoriesProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    const NAME_FILE = 'data_files/data_products.json';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json_data = file_get_contents(storage_path(self::NAME_FILE));
        $data = json_decode($json_data, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            foreach ($data as $value) {
                DB::table('products')->insert(
                    [
                        'name' => $value['name'],
                        "description" => $value['description'],
                        "type_goods_id" => $value['type_goods'],
                        "categories_products_id" => $this->getCategoryId($value['category_name']),
                        "units_id" => 1,
                        "calories" => $value['calories'],
                        "proteins" => $value['proteins'],
                        "fats" => $value['fats'],
                        "carbohydrates" => $value['carbohydrates'],
                        "serving_size" => $value['serving_size'],
                        "default_weight" => 1,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                );
            }
        } else {
            echo 'Ошибка при декодировании JSON: ' . json_last_error_msg();
        }

    }

    private function getCategoryId($name)
    {
        return CategoriesProduct::where(['category_name' => $name])->first()->id;
    }
}
