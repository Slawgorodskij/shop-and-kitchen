<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRecipe;
use App\Http\Requests\AdminRecipeUpdateForm;
use App\Models\MealTime;
use App\Models\MealTimeRecipe;
use App\Models\Product;
use App\Models\Recipe;
use App\Models\Structure;
use App\Models\Units;


class AdminRecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = Product::all();
        $units = Units::all();
        $mealTimes = MealTime::all();

        return view('admin.newRecipe', [
            'product' => $product,
            'units' => $units,
            'mealTimes' => $mealTimes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdminRecipe $request)
    {
        $requestValidated = $request->validated();

        $recipe = Recipe::create([
            'name' => $requestValidated['name'],
            'description' => $requestValidated['description'],
            'link' => $requestValidated['link'],
        ]);
        $productName = $requestValidated['product_name'];
        $unitsId = $requestValidated['units_id'];
        $quantity = $requestValidated['quantity'];
        $mealTimesId = $requestValidated['meal_time_id'];

        for ($i = 0; $i < count($productName); $i++) {
            $product = Product::firstOrCreate([
                'name' => $productName[$i]
            ]);
            Structure::create([
                'recipe_id' => $recipe->id,
                'product_id' => $product->id,
                'units_id' => $unitsId[$i],
                'quantity' => $quantity[$i],
            ]);
        }
        for ($i = 0; $i < count($mealTimesId); $i++) {
            MealTimeRecipe::create([
                'recipe_id' => $recipe->id,
                'meal_time_id' => $mealTimesId[$i],
            ]);
        }
        return to_route('recipe.create');
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
    public function edit(Recipe $recipe)
    {
        $mealTimes = MealTime::all();
        return view('admin.newRecipe', [
            'recipe' => $recipe,
            'mealTimes' => $mealTimes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AdminRecipeUpdateForm $request, Recipe $recipe)
    {
        $requestValidated = $request->validated();

        $recipe->update([
            'name' => $requestValidated['name'],
            'description' => $requestValidated['description'],
            'link' => $requestValidated['link'],
        ]);
        $productName = $requestValidated['product_name'];
        $unitsId = $requestValidated['units_id'];
        $quantity = $requestValidated['quantity'];
        $mealTimesId = $requestValidated['meal_time_id'];
        for ($i = 0; $i < count($productName); $i++) {
            $product = Product::firstOrCreate([
                'name' => $productName[$i]
            ]);

            $structure = Structure::firstOrCreate([
                'recipe_id' => $recipe->id,
                'product_id' => $product->id,
                'units_id' => $unitsId[$i],
            ]);

//            $structure->units_id = $unitsId[$i];
            $structure->quantity = $quantity[$i];
            $structure->save();
        }
        for ($i = 0; $i < count($mealTimesId); $i++) {
            MealTimeRecipe::firstOrCreate([
                'recipe_id' => $recipe->id,
                'meal_time_id' => $mealTimesId[$i],
            ]);
        }
        return to_route('admin.recipe');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //$product->delete();
        return to_route('admin.recipe');
    }
}
