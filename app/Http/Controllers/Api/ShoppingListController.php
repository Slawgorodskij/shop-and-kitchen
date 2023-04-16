<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiListUserRequest;
use App\Http\Requests\ApiShoppingListRequest;
use App\Http\Requests\ApiStoreroomRequest;
use App\Models\ShoppingList;
use App\Models\Storeroom;
use App\Models\Structure;
use Illuminate\Http\Request;


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
            'shopping_lists.units_id',
            'shopping_lists.product_id',
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

    public function deleteProductOfShoppingList(Request $request)
    {
        $shoppingList = ShoppingList::find($request['id']);
        if ($shoppingList->delete()) {
            return response(['message' => 'Продукт удален из списка'], 200);
        }

        return response(['message' => 'Продукт не удален из списка'], 422);
    }

    public function transferStorerooms(ApiStoreroomRequest $request)
    {
        $data = $request->validated();
        $storeroom = Storeroom::create($data);

        if ($storeroom) {
            $shoppingList = ShoppingList::find($data['shopping_list_id']);
            $shoppingList->delete();
            return response(['message' => 'Продукт перенесен в кладовую'], 200);
        }

        return response(['message' => 'Продукт не перенесен в кладовую'], 422);
    }
}
