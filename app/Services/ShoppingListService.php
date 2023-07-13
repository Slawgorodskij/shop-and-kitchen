<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ShoppingList;

class ShoppingListService
{
    private function getArrayNames(int $id)
    {
        return match ($id) {
            1 => ["кг", "кг", "кг"],
            2 => ["пачку", "пачки", "пачек"],
            3 => ["пучёк", "пучка", "пучков"],
            4 => ["бутылку", "бутылки", "бутылок"],
            5 => ["палку", "палки", "палок"],
            6 => ["стакан", "стакана", "стаканов"],
            7 => ["коробку", "коробки", "коробок"],
        };
    }

    private function getPlural($num, $forms)
    {
        if ($num % 10 === 1 && $num % 100 !== 11) return $forms[0];

        if (($num % 10 === 2 && $num % 100 !== 12)
            || ($num % 10 === 3 && $num % 100 !== 13)
            || ($num % 10 === 4 && $num % 100 !== 14)
        ) {
            return $forms[1];
        }

        return $forms[2];
    }

    private function iterateArray($array)
    {
        foreach ($array as $data) {
            $product = Product::where('id', $data['product_id'])->get();
            if ($product[0]->images) {
                foreach ($product[0]->images as $image) {
                    $data['imageName'] = $image->name;
                }
            }
            $data['count'] = $data->quantity / $product[0]->default_weight;
            $data['packing'] = $this->getPlural($data['count'], $this->getArrayNames((int)$product[0]->packing_id));
            $data['name'] = $product[0]->name;
            $data['description'] = $product[0]->description;
            $data['category'] = $product[0]->category;
            $data['default_weight'] = $product[0]->default_weight;
            $data['calories'] = $product[0]->calories;
            $data['squirrels'] = $product[0]->squirrels;
            $data['fats'] = $product[0]->fats;
            $data['carbohydrates'] = $product[0]->carbohydrates;
            $data['type_products_id'] = $product[0]->type_products_id;
            $data['units_id'] = $product[0]->units_id;
        }
        return $array;
    }

    public function shoppingListRenderingAll($userId)
    {
        $shoppingListRendering = ShoppingList::where('users_id', $userId)
            ->orderBy('id', 'asc')
            ->get();

        return $this->iterateArray($shoppingListRendering);
    }

    public function shoppingListRenderingPagination($userId)
    {
        $shoppingListRendering = ShoppingList::where('users_id', $userId)
            ->orderBy('id', 'asc')
            ->paginate(10);

        return $this->iterateArray($shoppingListRendering);
    }
}
