<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

//Route::apiResource('posts', PostController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('posts', PostController::class);
//Route::middleware('auth:sanctum')->group(function () {
//    Route::apiResource('posts', PostController::class);
//});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);