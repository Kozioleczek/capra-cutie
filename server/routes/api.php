<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/secrets', 'SecretController@index');

Route::middleware('auth:sanctum')->get('/test', function (Request $request) {
    return 'no dobrze byczq';
});

// Display urls belongs to specific user
Route::get('/urls', 'UrlsController@index');
Route::get('/redirect-url', 'UrlsController@redirectURL');
