<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/secrets', 'SecretController@index');

Route::middleware('auth:sanctum')->get('/test', function (Request $request) {
    return 'no dobrze byczq';
});
