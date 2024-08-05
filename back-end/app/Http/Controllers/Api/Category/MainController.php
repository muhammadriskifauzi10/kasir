<?php

namespace App\Http\Controllers\Api\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MainController extends Controller
{
    public function index()
    {
        $category = Category::all();

        $response = [
            'status' => 200,
            'message' => 'get data',
            'data' => $category
        ];

        return response()->json($response);
    }
    public function create()
    {
        $validator = Validator::make(request()->all(), [
            'category' => 'required|unique:categories,name',
        ], [
            'category.required' => 'Kolom ini wajib diisi',
            'category.unique' => 'Kolom ini sudah terdaftar',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'validation error',
                'data' => $validator->errors()
            ]);
        }

        try {
            DB::beginTransaction();

            $category = request()->input('category');

            $post = Category::create([
                'name' => Str::title($category)
            ]);

            DB::commit();

            $response = [
                'status' => 201,
                'message' => 'create data',
                'data' => $post
            ];
            return response()->json($response);
        } catch (Exception $e) {
            DB::rollBack();
            $response = [
                'status' => 500,
                'message' => 'server error',
                'data' => NULL
            ];
            return response()->json($response);
        }
    }
}
