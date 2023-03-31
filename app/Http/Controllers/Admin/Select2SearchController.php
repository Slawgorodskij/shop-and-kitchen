<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Units;
use Illuminate\Http\Request;

class Select2SearchController extends Controller
{
    public function selectSearch(Request $request)
    {
        $product = [];
        if($request->has('q')){
            $search = $request->q;
            $product =Product::select("id", "name")
                ->where('name', 'LIKE', "%$search%")
                ->get();
        }
        return response()->json($product);
    }
    public function selectUnit()
    {
        $units = Units::all();
        return response()->json($units);
    }
}
