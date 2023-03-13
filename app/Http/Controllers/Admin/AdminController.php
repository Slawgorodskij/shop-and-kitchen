<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function index()
    {
//        $test = auth()->user();
//        var_dump($test);
//        die();
        if (!auth()->user() || !auth()->user()->is_admin) {
//            var_dump('$test');
//            die();
            return to_route('login');
        }
        return view('admin.index');
    }
}
