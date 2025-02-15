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
use App\Services\ShoppingListService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;


class ShoppingListController extends Controller
{
    /**
     * @param ApiListUserRequest $request
     * @return AnonymousResourceCollection
     */
    public function getShoppingList(ApiListUserRequest $request): AnonymousResourceCollection
    {
        $data = $request->validated();
        $shoppingListRendering = app(ShoppingListService::class)->shoppingListRenderingAll($data['users_id']);

        return ShoppingListResource::collection($shoppingListRendering);
    }


    public function addShoppingList(ApiShoppingListRequest $request)
    {
        $data = $request->validated();
        $shoppingList = ShoppingList::where('users_id', $data['users_id'])
            ->where('product_id', $data['product_id'])
            ->first();

        if ($shoppingList) {
            $shoppingList->quantity += $data['quantity'];
            if ($shoppingList->save()) {
                return response(compact('shoppingList'));
            }
            return response(['message' => 'Не добавлен продукт ' . $data['product']['name']], 422);
        }

        $shoppingList = ShoppingList::create([
            'users_id' => $data['users_id'],
            'product_id' => $data['product_id'],
            'units_id' => $data['units_id'],
            'quantity' => $data['quantity'],
        ]);

        if ($shoppingList) {
            return response(compact('shoppingList'));
        }
        return response(['message' => 'Не добавлен продукт ' . $data['product']['name']], 422);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Foundation\Application|Response|Application|ResponseFactory
     */
    public function deleteProductOfShoppingList(Request $request): \Illuminate\Foundation\Application|Response|Application|ResponseFactory
    {
        $shoppingList = ShoppingList::where('users_id', $request['users_id'])
            ->where('product_id', $request['id'])
            ->first();
        if ($shoppingList->delete()) {
            return response(['message' => 'Продукт удален из списка'], 200);
        }

        return response(['message' => 'Продукт не удален из списка'], 422);
    }


    // Еще предстоит оценить
    public function shoppingListRendering(ApiListUserRequest $request): AnonymousResourceCollection
    {
        $data = $request->validated();
        $shoppingListRendering = app(ShoppingListService::class)->shoppingListRenderingPagination($data['users_id']);

        return ShoppingListResource::collection($shoppingListRendering);
    }

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
