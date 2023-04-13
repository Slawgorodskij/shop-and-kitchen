<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiShoppingListRequest;
use App\Models\ShoppingList;
use App\Models\Storeroom;
use App\Models\Structure;


class ShoppingListController extends Controller
{
    public function addShoppingList(ApiShoppingListRequest $request)
    {
        //TODO прверка на наличие продукта в списке покупок
        $data = $request->validated();
        $structures = Structure::where('recipe_id', $data['recipes_id'])->get();

        foreach ($structures as $structure) {
            $storeroom = Storeroom::where('users_id', $data['users_id'])
                ->where('product_id', $structure->product_id)
                ->get();

            if (count($storeroom) === 0) {
                ShoppingList::create([
                    'users_id' => $data['users_id'],
                    'product_id' => $structure->product_id,
                    'units_id' => $structure->units_id,
                    'quantity' => $structure->quantity,
                ]);
            }

            if (count($storeroom) > 0 && $storeroom->quantity < $structure->quantity) {
                $newQuantity = $structure->quantity - $storeroom->quantity;
                ShoppingList::create([
                    'users_id' => $data['users_id'],
                    'product_id' => $structure->product_id,
                    'units_id' => $structure->units_id,
                    'quantity' => $newQuantity,
                ]);
            }

        }
        $shoppingList = ShoppingList::all();

        return response(compact('shoppingList'));
    }
}
