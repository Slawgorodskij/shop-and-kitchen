<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Продукты') }}
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
                        </tr>
                        </thead>
                        <tbody>

                        @foreach ($array_data as $data)
                            <tr>
                                <td>{{ $data->name??$data->description}}</td>
                                <td class="admin-table__block-button">

                                    {{--                                    <a class="button admin-table__button" href="{{route($action_button, $data)}}">--}}
                                    {{--                                        {{$button_name}}--}}
                                    {{--                                    </a>              --}}
                                    <a class="button admin-table__button" href="#}">
                                        button_name
                                    </a>

                                    {{--                                    <form action="{{route($delete_button, $data)}}" method="POST">--}}
                                    {{--                                        @csrf--}}
                                    {{--                                        @method('DELETE')--}}
                                    {{--                                        <button class="button admin-table__button" type="submit">Удалить</button>--}}
                                    {{--                                    </form>    --}}
                                    <form action="#" method="POST">
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
                        <a class="admin__button_text" href="{{route('product.create')}}">
                            Внести продукт
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
