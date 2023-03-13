<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;

class AdminController extends Controller
{

    public function recipe()
    {
        if (!auth()->user() || !auth()->user()->is_admin) {
            return to_route('login');
        }
        return view('admin.recipe');
    }
        public function product()
    {
        if (!auth()->user() || !auth()->user()->is_admin) {
            return to_route('login');
        }
        $product = Product::simplePaginate(10);
//        var_dump($product);
//        die();
        return view('admin.product', [
            'array_data' => $product,
        ]);
    }


}
