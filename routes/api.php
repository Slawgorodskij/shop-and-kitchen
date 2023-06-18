<?php

use App\Http\Controllers\Api\AddShoppingListController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ListMenuController;
use App\Http\Controllers\Api\ShoppingListController;
use App\Http\Controllers\Api\StoreroomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/listMenu', [ListMenuController::class, 'listMenu']);
Route::post('/addShoppingList', [ShoppingListController::class, 'addShoppingList']);
Route::post('/shoppingListRendering', [ShoppingListController::class, 'shoppingListRendering']);
Route::post('/deleteProductOfShoppingList', [ShoppingListController::class, 'deleteProductOfShoppingList']);
Route::post('/transferStorerooms', [ShoppingListController::class, 'transferStorerooms']);
Route::post('/addListMenu', [ListMenuController::class, 'addListMenu']);
Route::post('/deleteSelectedDish', [ListMenuController::class, 'deleteSelectedDish']);
Route::post('/storeroomListRendering', [StoreroomController::class, 'storeroomListRendering']);
Route::post('/deleteProductOfStoreroom', [StoreroomController::class, 'deleteProductOfStoreroom']);
Route::get('/getTypeProduct', [AddShoppingListController::class, 'getTypeProduct']);
Route::post('/getProducts', [AddShoppingListController::class, 'getProducts']);

