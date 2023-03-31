<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Recipe;

class AdminController extends Controller
{

    public function recipe()
    {
        $recipe = Recipe::simplePaginate(10);
        return view('admin.recipe', [
            'array_data' => $recipe,
        ]);
    }

    public function product()
    {

        $product = Product::simplePaginate(10);
//        var_dump($product);
//        die();
        return view('admin.product', [
            'array_data' => $product,
        ]);
    }


}
