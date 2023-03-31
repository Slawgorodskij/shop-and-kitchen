<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Recipe extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'link',
        'for_breakfast',
        'for_lunch',
        'for_dinner',
        'for_second_breakfast',
        'for_afternoon_tea',
    ];

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function structures()
    {
        return $this->hasMany(Structure::class, 'recipe_id');
    }
    public function mealTime()
    {
        return $this->belongsToMany(MealTime::class, 'meal_time_recipe');
    }
}
