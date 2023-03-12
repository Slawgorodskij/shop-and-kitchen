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
        'recipes_id',
        'product_id',
        'units_id',
        'quantity',
    ];

    public function recipes(): BelongsTo
    {
        return $this->belongsTo(Recipe::class, 'recipes_id');
    }
}
