<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Structure extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'recipe_id',
        'product_id',
        'units_id',
        'quantity',
    ];

    public function recipes(): BelongsTo
    {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function units()
    {
        return $this->belongsTo(Units::class, 'units_id');
    }
}
