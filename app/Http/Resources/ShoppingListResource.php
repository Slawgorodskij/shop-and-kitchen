<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShoppingListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'name' => $this->name,
            'description' => $this->description,
            'category' => $this->category,
            'default_weight' => $this->default_weight,
            'imageName' => $this->imageName,
            'calories' => $this->calories,
            'squirrels' => $this->squirrels,
            'fats' => $this->fats,
            'carbohydrates' => $this->carbohydrates,
            'packing' => $this->packing,
            'type_products_id' => $this->type_products_id,
            'units_id' => $this->units_id,
            'quantity' => $this->quantity,
            'count' => $this->count,
            'is_buy' => $this->is_buy,
        ];
    }
}
