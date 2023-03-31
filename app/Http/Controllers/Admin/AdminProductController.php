<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminProduct;
use App\Http\Requests\AdminProductUpdateForm;
use App\Models\Product;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        return view('admin.newProduct', [
//            'product'=>Product::
//        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.newProduct');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdminProduct $request)
    {
        Product::create($request->validated());
        return to_route('product.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return view('admin.newProduct', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AdminProductUpdateForm $request, Product $product)
    {
        $product->update($request->validated());
        return to_route('admin.product');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return to_route('admin.product');
    }
}
