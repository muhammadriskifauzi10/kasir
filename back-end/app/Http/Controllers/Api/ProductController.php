<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $model_product = Product::all();

        return response()->json([
            'status' => 200,
            'message' => "Get data",
            'data' => $model_product,
        ]);
    }
}
