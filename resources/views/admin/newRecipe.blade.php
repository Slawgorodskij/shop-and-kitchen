<x-app-layout>
    {{--    {{var_dump($recipe)}}--}}
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ isset($recipe) ? ('Изменение рецепта:' . ' ' . $recipe->name) :  ('Добавление рецепта') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    <form method="POST" enctype="multipart/form-data"
                          action="{{ isset($recipe) ? route('recipe.update', $recipe) : route('recipe.store') }}">
                        @csrf

                        @if(isset($recipe))
                            @method('PUT')
                        @endif

                        <input name="name" type="text"
                               class="block-form__input @error('name') block-form__input_error @enderror"
                               placeholder="Название рецепта" value="{{ $recipe->name ?? '' }}"/>

                        @error('name')
                        <p class="block-form__text-error">{{ $message }}</p>
                        @enderror
                        <textarea id="editor" name="description"
                                  class="block-form__input @error('description') block-form__input_error @enderror"
                                  placeholder="Краткое описание рецепта"
                        >{{ $recipe->description ?? '' }}</textarea>
                        @error('description')
                        <p class="block-form__text-error">{{ $message }}</p>
                        @enderror

                        <input name="link" type="text"
                               class="block-form__input @error('link') block-form__input_error @enderror"
                               placeholder="Ссылка на сайт" value="{{ $recipe->link ?? '' }}"/>

                        @error('link')
                        <p class="block-form__text-error">{{ $message }}</p>
                        @enderror

                        <h3>Подходит для:</h3>
                        <div class="flex">
                            @foreach($mealTimes as $item)
                                <div class="input__checkbox">
                                    <label>{{$item->name}}</label>
                                    <input type="checkbox"
                                           name="meal_time_id[]"
                                           value="{{$item->id}}"
                                        {{count($item->recipe)>0 ? 'checked' : ''}}
                                    >
                                </div>
                            @endforeach
                        </div>

                        <h3>Состав</h3>
                        <table class="admin-table">
                            <thead>
                            <tr>
                                <th>Название продукта</th>
                                <th>Единица измерения</th>
                                <th>Кол-во продукта</th>
                            </tr>
                            </thead>
                            <tbody class="tbody">
                            @if(isset($recipe->structures))
                                @foreach ($recipe->structures as $data)
                                    <tr>
                                        <td>
                                            <input type="text" name="product_name[]" placeholder="Название продукта"
                                                   value="{{$data->product->name}}">
                                        </td>
                                        <td>
                                            <input type="hidden" name="units_id[]" value="{{$data->units->id}}">
                                            {{$data->units->name}}
                                        </td>
                                        <td>
                                            <input type="number" name="quantity[]" placeholder="КОЛИЧЕСТВО"
                                                   value="{{$data->quantity}}">
                                        </td>
                                    </tr>

                                @endforeach
                            @endif


                            </tbody>
                        </table>
                        <button class="button admin__button addRow" type="submit"
                                value="addRow">
                            Добавить строку
                        </button>
                        <button class="button admin__button" type="submit"
                                value="save">
                            Сохранить
                        </button>
                    </form>

                    <a class="button admin__button" href="{{route('admin.recipe')}}">
                        <span class="transition-button__text">Назад</span>
                    </a>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
