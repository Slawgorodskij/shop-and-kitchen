<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\ApiListMenuRequest;
use App\Http\Requests\ApiListUserRequest;
use App\Models\DayWeek;
use App\Models\ListMenu;
use App\Models\MealTime;


class ListMenuController extends Controller
{
    public function oldListMenu(Request $request)
    {
        $monday = strtotime('monday this week');
        $sunday = strtotime('+6 day', $monday);

        $DayWeek = DayWeek::all();
        $mealTime = MealTime::all();
        $listNameRecipes = ListMenu::select(
            'list_menus.id as id',
            'list_menus.day_weeks_id as day_weeks_id',
            'list_menus.meal_times_id as meal_times_id',
            'recipes.name as recipe_name'
        )
            ->join('recipes', 'list_menus.recipes_id', '=', 'recipes.id')
            ->where('users_id', $request['users_id'])
            ->whereBetween('date', [date("d.m.Y", $monday), date("d.m.Y", $sunday)])
            ->get();

        return response(compact('listNameRecipes', 'DayWeek', 'mealTime'));
    }

    public function newlistMenu(ApiListUserRequest $request)
    {
        //TODO добавить проверку на дату
        $DayWeek = DayWeek::all();
        $mealTime = MealTime::all();

        $data = $request->validated();
        $listNameRecipes = ListMenu::select(
            'list_menus.id as id',
            'list_menus.day_weeks_id as day_weeks_id',
            'list_menus.meal_times_id as meal_times_id',
            'recipes.name as recipe_name'
        )
            ->join('recipes', 'list_menus.recipes_id', '=', 'recipes.id')
            ->where('users_id', $data['users_id'])
            ->get();

        $mealTimeAndRecipe = MealTime::select(
            'meal_times.id as meal_times_id',
            'meal_times.name as meal_times_name',
            'recipes.id as recipe_id',
            'recipes.name as recipe_name'
        )
            ->join('meal_time_recipe', 'meal_times.id', '=', 'meal_time_recipe.meal_time_id')
            ->join('recipes', 'meal_time_recipe.recipe_id', '=', 'recipes.id')
            ->get();

        return response(compact('listNameRecipes', 'DayWeek', 'mealTime', 'mealTimeAndRecipe'));
    }

    public function addListMenu(ApiListMenuRequest $request)
    {
        $data = $request->validated();
        $listMenu = ListMenu::create([
            'users_id' => $data['users_id'],
            'recipes_id' => $data['recipes_id'],
            'day_weeks_id' => $data['day_weeks_id'],
            'meal_times_id' => $data['meal_times_id'],
            'date' => $data['date'],
        ]);

        return response(compact('listMenu'));

    }
}
