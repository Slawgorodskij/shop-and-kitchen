<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiListUserRequest;
use App\Http\Requests\ApiShoppingListRequest;
use App\Http\Requests\ApiStoreroomRequest;
use App\Http\Resources\ShoppingListResource;
use App\Models\Product;
use App\Models\ShoppingList;
use App\Models\Storeroom;
use App\Models\Structure;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class ShoppingListController extends Controller
{
    public function addShoppingListInRecipes(ApiShoppingListRequest $request)
    {
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
                && count($storeroom) > 0
                && $storeroom[0]->quantity >= $structure->quantity
            ) {
                $storeroom[0]->quantity -= $structure->quantity;
                $storeroom[0]->reserve += $structure->quantity;
                $storeroom[0]->save();
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

    //TODO добавить проверку
    public function addShoppingList(ApiShoppingListRequest $request)
    {
        $data = $request->validated();
        $success = [];
        foreach ($data['products'] as $product) {

            $shoppingList = ShoppingList::where('users_id', $data['users_id'])
                ->where('product_id', $product['product_id'])
                ->get();
            if (isset($shoppingList[0])) {
                $shoppingList[0]->quantity += $product['quantity'];
                if ($shoppingList[0]->save()) {
                    $success[] = 'success';
                }
            } else {
                $shoppingList = ShoppingList::create([
                    'users_id' => $data['users_id'],
                    'product_id' => $product['product_id'],
                    'units_id' => $product['units_id'],
                    'quantity' => $product['quantity'],
                ]);
                if ($shoppingList) {
                    $success[] = $shoppingList;
                }
            }
        }
        if (count($success) > 0) {
            return response(['message' => 'Продукты добавлены'], 200);
        }
        return response(['message' => 'Продукты не добавлены'], 422);
    }

    public function shoppingListRendering(ApiListUserRequest $request)
    {
        $data = $request->validated();
        $shoppingListRendering = ShoppingList::where('users_id', $data['users_id'])
            ->orderBy('id', 'desc')
            ->paginate(10);
        foreach ($shoppingListRendering as $data) {
            $product = Product::where('id', $data['product_id'])->get();
            if ($product[0]->images) {
                foreach ($product[0]->images as $image) {
                    $data['imageName'] = $image->name;
                }
            }

            $data['name']=$product[0]->name;
            $data['description']=$product[0]->description;
            $data['category']=$product[0]->category;
            $data['default_weight']=$product[0]->default_weight;
            $data['calories']=$product[0]->calories;
            $data['squirrels']=$product[0]->squirrels;
            $data['fats']=$product[0]->fats;
            $data['carbohydrates']=$product[0]->carbohydrates;
            $data['packing_id']=$product[0]->packing_id;
            $data['type_products_id']=$product[0]->type_products_id;
            $data['units_id']=$product[0]->units_id;
        }

       return ShoppingListResource::collection($shoppingListRendering);
    }

//TODO добаввить проверку резерва
    public function deleteProductOfShoppingList(Request $request)
    {
        $shoppingList = ShoppingList::find($request['id']);
        if ($shoppingList->delete()) {
            return response(['message' => 'Продукт удален из списка'], 200);
        }

        return response(['message' => 'Продукт не удален из списка'], 422);
    }

    public function transferStorerooms(ApiStoreroomRequest $request): \Illuminate\Foundation\Application|Response|Application|ResponseFactory
    {
        $data = $request->validated();
        $storeroom = Storeroom::where(['product_id' => $data['product_id'], 'users_id' => $data['users_id']])->get();
        if (count($storeroom) > 0) {
            $storeroom[0]->quantity += $data['quantity'];
            if ($storeroom[0]->save() && $this->shoppingListDelete($data)) {
                return response(['message' => 'Продукт перенесен в кладовую'], 200);
            }
        } else {
            $storeroomNew = Storeroom::create($data);
            if ($storeroomNew && $this->shoppingListDelete($data)) {
                return response(['message' => 'Продукт перенесен в кладовую'], 200);
            }
        }
        return response(['message' => 'Продукт не перенесен в кладовую'], 422);
    }

    private function shoppingListDelete($data): bool
    {
        $shoppingList = ShoppingList::find($data['shopping_list_id']);
        if ($shoppingList->delete()) return true;
        return false;
    }
}
