<?php

namespace App\Console;

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Filesystem\Cache;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // dont forget:
        //* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1

        $schedule->call(function() {
            //Yes, I know should set on php.ini line curl.cainfo = /path/to/crt/cacert.pem
            $client = new Client(['verify' => false]);

            $response = $client->get('https://rgw.5878-e94b1c46.eu-gb.apiconnect.appdomain.cloud/metoffice/production/v0/forecasts/point/daily?latitude=56.4745215&longitude=-3.1069149',[
                'headers' => [
                    'Accept' => 'application/json',
                    'X-IBM-Client-Id' => 'e4a2a6b999c263df68a809a0ec607bd5',
                    'X-IBM-Client-Secret' => '580b480e7e736113504fc6976f626d35'
                ]
            ]);



            if($response->getStatusCode() == 200) {

                $json = $response->getBody();
                $forecast = json_decode($json, true);
                $forecast['last_updated'] = Carbon::now()->format('g:i A');
//                Cache::put('forecast', $json, now()->addHour(1)); //1hr
                dump('last_updated ' . $forecast['last_updated']);
                cache(['forecast' => $forecast], 3600); //1h = 3600s

            }
        })->hourly()->runInBackground();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
