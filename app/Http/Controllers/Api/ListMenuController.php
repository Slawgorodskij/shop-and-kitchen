<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiListMenuRequest;
use App\Models\DeyWeek;
use App\Models\ListMenu;
use App\Models\MealTime;
use Illuminate\Http\Request;

class ListMenuController extends Controller
{
    public function listMenu()
    {

        /** $var ListMenu $listMenu */
//        $listMenu = listMenu::create([
//            'name' => $data['name'],
//            'email' => $data['email'],
//            'password' => bcrypt($data['password']),
//        ]);
        $listMenu = ListMenu::all();
        $deyWeek = DeyWeek::all();
        $mealTime = MealTime::all();
        $mealTimeAndRecipe = MealTime::select(
            'meal_times.id as meal_times_id',
            'meal_times.name as meal_times_name',
            'recipes.id as recipe_id',
            'recipes.name as recipe_name'
        )
            ->join('meal_time_recipe', 'meal_times.id', '=', 'meal_time_recipe.meal_time_id')
            ->join('recipes', 'meal_time_recipe.recipe_id', '=', 'recipes.id')
            ->get();

        return response(compact('listMenu', 'deyWeek', 'mealTime', 'mealTimeAndRecipe'));
    }

    public function addListMenu(ApiListMenuRequest $request)
    {
        $data = $request->validated();
        $listMenu = ListMenu::create([
            'users_id' => $data['users_id'],
            'recipes_id' => $data['recipes_id'],
            'dey_weeks_id' => $data['dey_weeks_id'],
            'meal_times_id' => $data['meal_times_id'],
            'date' => $data['date'],
        ]);

        return response(compact('listMenu'));

    }
}
