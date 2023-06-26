<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ApiAddShoppingListRequest;
use App\Http\Requests\ApiProductRequest;
use App\Models\Product;
use App\Models\ShoppingList;

class ProductController
{
    public function getProducts(ApiProductRequest $request)
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

    public function getProduct(ApiProductRequest $request)
    {
        $data = $request->validated();
        $products = Product::where('id', $data['product_id'])->get();
        $dataProduct = [];
        foreach ($products as $product) {
            if ($product->images) {
                foreach ($product->images as $image) {
                    $product['imageName'] = $image->name;
                }
            }
            $shoppingList = ShoppingList::where(['product_id' => $product->id, 'users_id' => $data['users_id']])->get();
            if (count($shoppingList) > 0) {
                $product['quantity'] = $shoppingList[0]['quantity'];
                $product['count'] = $shoppingList[0]['quantity'] / $product->default_weight;

            }
            $dataProduct[] = $product;
        }
        return response(compact('dataProduct'));
    }
}
