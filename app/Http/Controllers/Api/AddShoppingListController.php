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

    public function getProducts(ApiAddShoppingListRequest $request)
    {
        $data = $request->validated();
        $products = Product::where('type_products_id', $data['type_product_id'])->get();
        $arrayProducts = [];
        foreach ($products as $product) {
            if ($product->images) {
                foreach ($product->images as $image) {
                    $product['imageName'] = $image->name;
                }
            }
            $arrayProducts[] = $product;
        }

        return response(compact('arrayProducts'));
    }
}
