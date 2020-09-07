<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Urls;

class UrlsController extends Controller
{
    public function index(Request $request)
    {
        if(!$request->user()) {
            return response()->json(['error' => 'User does not exist'], 500);
        }

        return $request->user()->urls;
    }
}
