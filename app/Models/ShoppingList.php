<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShoppingList extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'users_id',
        'product_id',
        'units_id',
        'quantity',
    ];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id');
    }
    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
