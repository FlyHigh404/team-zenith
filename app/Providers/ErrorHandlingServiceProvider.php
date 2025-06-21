<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ErrorHandlingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Log all SQL queries when in debug mode
        if (config('app.debug')) {
            DB::listen(function($query) {
                $sql = $query->sql;
                $bindings = $query->bindings;
                $time = $query->time;

                if ($time > 1000) { // Log queries taking more than 1 second
                    Log::channel('api_errors')->warning(
                        "Slow query detected ({$time}ms): $sql",
                        ['bindings' => $bindings]
                    );
                }
            });
        }
    }
}
