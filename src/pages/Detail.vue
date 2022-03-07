<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { url } from '../constant';
import { reactive, toRefs, computed, onMounted, watch } from 'vue';
import { RespPokemon, Stat, Type } from '../model/PokemonApi';
import StastChart from '../components/StastChart.vue';

const state = reactive({
    pokemon: null as RespPokemon | null,
    stats: computed(() => filterStats()),
    types: computed(() => filterTypes()),
});

function filterStats(): number[]  {
    if(state.pokemon) {
        return state.pokemon.stats.map((stat: Stat) => stat.base_stat);
    } else {
        return [];
    }
}

function filterTypes(): string[] {
    if(state.pokemon) {
        return state.pokemon.types.map((type: Type) => type.type.name);
    } else {
        return [];
    }
}

const { pokemon, stats, types } = toRefs(state);

const route = useRoute();

const getData = async () => {
    await fetch(`${url}pokemon/${route.params.id}`)
    .then(res => res.json())
    .then(pokemon => {
        state.pokemon = pokemon;
    });
};

watch(route, () => {
    getData();
});

onMounted(getData);
</script>
<template>
    <div>
        <div v-if="pokemon">
            <div class="w-4/6 mx-auto rounded-xl p-10 shadow-lg">
                <h1 class="font-black md:text-3xl text-xl text-red-800">{{pokemon.name}}</h1>
                <div class="mr-1 shadow-md text-xs inline-flex items-center leading-sm px-2 py-0.5 text-white rounded-full bg-slate-500" v-for="type in types" :key="type">
                    {{type}}
                    <img class="ml-3 w-4 h-4 border-white border-2 rounded-full" :src="`/src/assets/types/${type}.svg`" :alt="`tipo ${type}`">
                </div>
                <div class="flex">
                    <div class="flex-2 grid place-item-center">
                        <img class="w-48 h-48" :src="pokemon.sprites.front_default" :alt="`imagen de ${pokemon.name}`">
                    </div>
                    <div class="flex-1">
                        <stast-chart :stats="stats"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No hay datos disponibles</p>
        </div>
    </div>
</template>