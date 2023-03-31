<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
        return response(compact('listMenu', 'deyWeek', 'mealTime'));
//        return response([
//            'user' => $user,
//          //  'token' => $token,
//            'token' => "$token",
//        ]);
    }
}
