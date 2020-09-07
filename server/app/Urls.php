<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Urls extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\Urls');
    }
}
