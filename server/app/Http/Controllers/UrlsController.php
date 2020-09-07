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

    public function redirectURL(Request $request){
        // dd($request->input('short'));
        // $req = json_decode($request->getContent(), true);
        $url = Urls::where('short', $request->input('short'))->first();
        if($url === null){
            return response()->json(['error' => 'Short URL does not exist'], 500);
        }
        return $url;
    }

    public function store(Request $request){
        $req = json_decode($request->getContent(), true);
        // return $req;
        $newurl = new Urls;
        $newurl->user_id = $request->user()->id;
        $newurl->long = $request->long;
        $newurl->short = $request->short;
        $newurl->visitors = 0;
        $newurl->save();
        return response()->json(['success' => 'Requested URL was created', 200]);
    }
}
