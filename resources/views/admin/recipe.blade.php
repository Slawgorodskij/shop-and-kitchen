<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{--            {{ __('Рецеты') }}--}}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    <table class="admin-table">
                        <thead>
                        <tr>
                            <th class="admin-table__content">Название</th>
                            <th>Описание</th>
                            <th>Состав</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>

                        @foreach ($array_data as $data)
                            <tr>
                                <td>{{ $data->name}}</td>
                                <td>{{ $data->description}}</td>

                                <td>
                                    @foreach ($data->structures as $item)
                                        <p> {{$item->product->name}}</p>
                                    @endforeach
                                </td>

                                <td class="admin-table__block-button">

                                    <a class="button admin-table__button" href="{{route('recipe.edit', $data)}}">
                                        Изменить рецепт
                                    </a>


                                    <form action="{{route('recipe.destroy', $data)}}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button class="button admin-table__button" type="submit">Удалить</button>
                                    </form>

                                </td>
                            </tr>
                        @endforeach

                        </tbody>
                    </table>

                    <div class="button admin__button">
                        <a class="admin__button_text" href="{{route('recipe.create')}}">
                            Добавить рецепт
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
