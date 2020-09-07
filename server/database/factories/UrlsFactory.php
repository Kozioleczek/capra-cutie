<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Urls;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Urls::class, function (Faker $faker) {
    return [
        'user_id' => 5,
        'long' => 'https://wp.pl',
        'short' => Str::random(7),
        'visitors' => 10,
    ];
});
