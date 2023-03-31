<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminRecipeUpdateForm extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'min:1',],
            'link' => ['required'],
            'description' => ['max:1000'],
            'product_name' => ['required'],
            'units_id' => ['required'],
            'quantity' => ['required'],
            'meal_time_id' => ['required'],
        ];
    }
}
