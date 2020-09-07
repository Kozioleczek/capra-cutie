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

    public function destroy(Request $request, $id){
        $delurl = Urls::where('user_id', $request->user()->id)->where('short', $id)->firstOrFail();
        // return $delurl;
        if($delurl === null) {
            return response()->json(['error' => 'Requested URL does not exist', 'reqdUrl' => $id, 200]);
        }
        $delurl->delete();
        return response()->json(['success' => 'Requested URL was deleted', 'deletedUrl' => $id, 200]);
    }
}
