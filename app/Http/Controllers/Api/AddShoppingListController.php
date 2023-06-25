<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ApiAddShoppingListRequest;
use App\Models\Product;
use App\Models\TypeProduct;

class AddShoppingListController
{
    public function getTypeProduct()
    {
        $typeProducts = TypeProduct::all();
        $arrayTypeProduct = [];
        foreach ($typeProducts as $typeProduct) {
            if ($typeProduct->images) {
                foreach ($typeProduct->images as $image) {
                    $typeProduct['imageName'] = $image->name;
                }
            }
            $arrayTypeProduct[] = $typeProduct;
        }

        return response(compact('arrayTypeProduct'));
    }


}
