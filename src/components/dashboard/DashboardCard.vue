<script setup>

const props = defineProps({
    icon: {
        type: [String, Boolean],
        default: false
    },
    color: {
        type: String,
        default: '#000'
    },
    title: {
        type: String,
        default: 'Title'
    },
    value: {
        type: [String, Number],
        default: 'Value'
    }
})

</script>


<template>

    <div class="w-full flex items-center gap-6 rounded-lg h-40 p-4 text-white hover:scale-110 transition-all duration-300" :class="`bg-${color}`">

        <div class="w-20 h-20 rounded-full bg-black bg-opacity-20 text-2xl flex items-center justify-center">

            <font-awesome-icon
                v-if="icon"
                :icon="icon"/>

        </div>

        <div class="flex flex-col gap-2">
            <h4 class="text-base font-light">
                {{title}}
            </h4>

            <h2 class="text-2xl font-bold">
                {{value}}
            </h2>
        </div>

    </div>

</template>