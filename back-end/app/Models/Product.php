<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $fillable = [
        'code',
        'category_id',
        'name',
        'description',
        'price',
        'stock',
    ];
}
