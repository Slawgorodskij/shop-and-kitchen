<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiListUserRequest;
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

            $shoppingList = ShoppingList::where('users_id', $data['users_id'])
                ->where('product_id', $structure->product_id)
                ->get();
            $storeroom = Storeroom::where('users_id', $data['users_id'])
                ->where('product_id', $structure->product_id)
                ->get();

            if (isset($shoppingList) && count($shoppingList) > 0) {
                $shoppingList[0]->quantity += $structure->quantity;
                $shoppingList[0]->save();
            } elseif (isset($storeroom)
                && count($storeroom) > 0) {
                foreach ($storeroom as $item) {
                    if ($item->quantity > $structure->quantity) {
                        $item->quantity -= $structure->quantity;
                        $item->save();
                    }
                }
            } else {
                $newQuantity = $structure->quantity;

                if (isset($storeroom)
                    && count($storeroom) > 0
                    && $storeroom[0]->quantity < $newQuantity) {
                    $newQuantity -= $storeroom[0]->quantity;
                }

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

    public function shoppingListRendering(ApiListUserRequest $request)
    {
        $data = $request->validated();

        $shoppingListRendering = ShoppingList::select(
            'shopping_lists.id as id',
            'units.name as units_name',
            'shopping_lists.quantity',
            'products.name as product_name'
        )
            ->join('products', 'shopping_lists.product_id', '=', 'products.id')
            ->join('units', 'shopping_lists.units_id', '=', 'units.id')
            ->where('users_id', $data['users_id'])
            ->get();

        return response(compact('shoppingListRendering'));
    }
}
