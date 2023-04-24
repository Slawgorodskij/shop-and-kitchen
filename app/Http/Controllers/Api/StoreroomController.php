<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiListUserRequest;
use App\Models\Storeroom;
use Illuminate\Http\Request;

class StoreroomController extends Controller
{
    public function storeroomListRendering(ApiListUserRequest $request)
    {
        $data = $request->validated();

        $storeroomListRendering = Storeroom::select(
            'storerooms.id as id',
            'storerooms.units_id',
            'storerooms.product_id',
            'units.name as units_name',
            'storerooms.quantity',
            'products.name as product_name'
        )
            ->join('products', 'storerooms.product_id', '=', 'products.id')
            ->join('units', 'storerooms.units_id', '=', 'units.id')
            ->where('users_id', $data['users_id'])
            ->get();

        return response(compact('storeroomListRendering'));
    }

    //TODO переделать
    public function deleteProductOfStoreroom(Request $request)
    {
        $storeroom = Storeroom::find($request['id']);
        if ($storeroom->delete()) {
            return response(['message' => 'Продукт удален из кладовой'], 200);
        }

        return response(['message' => 'Продукт не удален из кладовой'], 422);
    }
}
