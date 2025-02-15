<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ApiAddShoppingListRequest;
use App\Models\CategoriesProduct;
use App\Models\Product;
use App\Models\TypeGoods;
use App\Models\TypeProduct;

class AddShoppingListController
{
    public function getDataProduct()
    {
        $typeGoods = TypeGoods::all();
        $categoriesProduct = CategoriesProduct::all();
        $products = Product::all();
//        $arrayTypeProduct = [];
//        foreach ($typeProducts as $typeProduct) {
//            if ($typeProduct->images) {
//                foreach ($typeProduct->images as $image) {
//                    $typeProduct['imageName'] = $image->name;
//                }
//            }
//            $arrayTypeProduct[] = $typeProduct;
//        }

        return response(compact('typeGoods', 'categoriesProduct', 'products'));
    }


}
