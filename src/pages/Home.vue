<script setup lang='ts'>
    import { reactive, toRefs, computed } from 'vue';
    import { Pokemon } from '../model/PokemonApi';
    import NavBar from '../components/NavBar.vue';
    import { url } from '../constant';

    const state = reactive({
        pokemons: [] as Pokemon[],
        name: "" as string,
        filterPokemon: computed(() => searchPokemon()),
    });

    function searchPokemon(): Pokemon[] {
        return state.pokemons.filter((pokemon: Pokemon) => {
            return pokemon.name.toLowerCase().includes(state.name.toLowerCase());
        });
    }

    const { name, filterPokemon } = toRefs(state);

    fetch(`${url}pokemon?limit=151`)
    .then(res => res.json())
    .then(response => {
        response.results.forEach((item: Pokemon, id: number) => {
            const pokemon:Pokemon = {
                ...item,
                id: id + 1
            };
            state.pokemons.push(pokemon)
        });
    });
</script>

<template>
    <div>
        <div class="grid grid-cols-6 gap-1">
            <div class="overflow-y-auto col-span-1 max-h-screen">
                <input type="text"
                v-model="name"
                class="mt-3 ml-3 mb-3 p-2 border-black-500 border-2 w-100 rounded-md" placeholder="Nombre del pokemon">
                <ul>
                    <li class="ml-3 mr-3 p-2 rounded text-red-300 hover:text-white hover:bg-red-300 hover:cursor-pointer" v-for="pokemon in filterPokemon" :key="pokemon.id">
                        
                        <router-link :to="`/detail/${pokemon.id}`">
                        <span class="text-sm font-normal text-gray-300 mr-3"># {{pokemon.id}}</span>{{pokemon.name}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-span-5">
                <nav-bar></nav-bar>
                <router-view/>
            </div>
        </div>
    </div>
</template>