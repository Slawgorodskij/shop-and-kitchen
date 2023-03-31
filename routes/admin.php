<?php

use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminRecipeController;
use App\Http\Controllers\Admin\Select2SearchController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth', 'is_admin')->group(function () {
    Route::resource('/admin/product', AdminProductController::class);
    Route::resource('/admin/recipe', AdminRecipeController::class);

    Route::get('/admin/recipe', [App\Http\Controllers\Admin\AdminController::class, 'recipe'])->name('admin.recipe');
    Route::get('/admin/product', [App\Http\Controllers\Admin\AdminController::class, 'product'])->name('admin.product');

    Route::get('/ajax-autocomplete-search', [Select2SearchController::class, 'selectSearch']);
    Route::get('/ajax-autocomplete-unit', [Select2SearchController::class, 'selectUnit']);
});
