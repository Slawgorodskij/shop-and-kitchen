<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ListMenu;
use App\Models\Product;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;

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
//        $listMenu = ListMenu::where('users_id', auth()->user()->id)->get();
        /** $var User $user */
        $user = Auth::user();
        dd($user->id);
//        die();
        return view('admin.product', [
            'array_data' => $product,
        ]);
    }


}
