<?php

use App\Http\Controllers\Api\Category\MainController as CategoryMainController;
use App\Http\Controllers\Api\Product\MainController as ProductMainController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/products', [ProductMainController::class, 'index']);
Route::get('/category', [CategoryMainController::class, 'index']);
Route::post('/category', [CategoryMainController::class, 'create']);
