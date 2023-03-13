<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ isset($product) ? ('Изменение продукта:' . ' ' . $product->name) :  ('Добавление продукта') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    <form method="POST" enctype="multipart/form-data"
                          action="{{ isset($product) ? route('product.update', $product) : route('product.store') }}">
                        @csrf

                        @if(isset($product))
                            @method('PUT')
                        @endif



                        <input name="title" type="text"
                               class="block-form__input @error('name') block-form__input_error @enderror"
                               placeholder="Название продукта" value="{{ $product->name ?? '' }}"/>

                        @error('name')
                        <p class="block-form__text-error">{{ $message }}</p>
                        @enderror

                        <input name="description" type="text"
                               class="block-form__input @error('description') block-form__input_error @enderror"
                               placeholder="Короткое описание продукта"
                               value="{{ $article->description ?? '' }}"/>

                        @error('description')
                        <p class="block-form__text-error">{{ $message }}</p>
                        @enderror


                        <button class="button admin__button" type="submit"
                                value="save">
                            Сохранить
                        </button>
                    </form>

                    <a class="button admin__button" href="{{route('admin.product')}}">
                        <span class="transition-button__text">Назад</span>
                    </a>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
