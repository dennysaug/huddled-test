<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ForecastCollection;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Filesystem\Cache;
use Illuminate\Http\Request;

class ForecastController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $forecast = [];

        if(cache()->has('forecast')) {

            $forecast = cache()->get('forecast');

        } else {

           return ['error' => 'No longer available data'];

        }

        return new ForecastCollection(collect($forecast));

    }
}
