<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
    stats:Array
})
const chartOptions = {
    chart: {
        height: 350,
        type: "radar",
    },
    dataLabels: {
        enabled: true,
    },
    plotOptions: {
        radar: {
        size: 140,
        polygons: {
            strokeColors: "#e9e9e9",
            fill: {
            colors: ["#f8f8f8", "#fff"],
            },
        },
        },
    },
    title: {
        text: "Estadisticas pokemon",
    },
    colors: ["#FF4560"],
    markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#FF4560",
        strokeWidth: 2,
    },
    tooltip: {
        y: {
        formatter: function (val: string) {
            return val;
        },
        },
    },
    xaxis: {
        categories: [
        "Puntos de vida",
        "Ataque",
        "Defensa",
        "Ataque especial",
        "Defensa especial",
        "Velocidad"
        ],
    },
    yaxis: {
        tickAmount: 5,
        labels: {
        formatter: function (val: string, i: number): string {
            if (i % 2 === 0) {
            return val;
            } else {
            return "";
            }
        },
        },
    },
};

const series = computed(() => {
    return [
        {
            name: 'Estadisticas',
            data: props.stats
        }
    ]
})
</script>
<template>
    <div id="chart">
        <apexchart
        type="radar"
        height="350"
        :options="chartOptions"
        :series="series"
        ></apexchart>
    </div>
</template>
