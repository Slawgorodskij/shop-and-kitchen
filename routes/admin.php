<?php

use App\Http\Controllers\Admin\AdminProductController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth', 'is_admin')->group(function () {
    Route::resource('/admin/product', AdminProductController::class);

    Route::get('/admin/recipe', [App\Http\Controllers\Admin\AdminController::class, 'recipe'])->name('admin.recipe');
    Route::get('/admin/product', [App\Http\Controllers\Admin\AdminController::class, 'product'])->name('admin.product');

});
