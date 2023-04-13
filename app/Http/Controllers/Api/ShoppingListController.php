<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiShoppingListRequest;
use App\Models\ShoppingList;
use App\Models\Storeroom;
use Illuminate\Http\Request;

class ShoppingListController extends Controller
{
    public function addShoppingList(ApiShoppingListRequest $request)
    {
        $data = $request->validated();
        $storeroom = Storeroom::with([
            ['users_id', '=', $data['users_id']],
            ['product_id', '=', $data['product_id']]
        ])->get();

        if (!isset($storeroom)) {
            $shoppingList = ShoppingList::create([
                'users_id' => $data['users_id'],
                'product_id' => $data['product_id'],
                'units_id' => $data['units_id'],
                'quantity' => $data['quantity'],
            ]);
            return response(compact('shoppingList'));
        }

        if (isset($storeroom)
            && $storeroom->quantity < $data['quantity']) {
            $newQuantity = $data['quantity'] - $storeroom->quantity;
            $shoppingList = ShoppingList::create([
                'users_id' => $data['users_id'],
                'product_id' => $data['product_id'],
                'units_id' => $data['units_id'],
                'quantity' => $newQuantity,
            ]);
            return response(compact('shoppingList'));
        }


//        return response(compact('shoppingList'));
    }
}
