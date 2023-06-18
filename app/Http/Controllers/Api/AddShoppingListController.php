<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ApiAddShoppingListRequest;
use App\Models\Product;
use App\Models\TypeProduct;

class AddShoppingListController
{
    public function getTypeProduct()
    {
        $arrayTypeProduct = TypeProduct::all();
        return response(compact('arrayTypeProduct'));
    }

    public function getProducts(ApiAddShoppingListRequest $request)
    {
        $data = $request->validated();
        $arrayProducts = Product::where('type_products_id', $data['type_product_id'])->get();
//        $arrayProducts = $typeProductId;
        return response(compact('arrayProducts'));
    }
}
