<script setup>

import Sort from './Sort.vue'

defineProps({
    empty: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <th scope="col" class="relative px-6 py-3 font-medium tracking-wider cursor-pointer hover:bg-gray-300">
        <slot />
        <Sort v-if="!empty" class="w-3 h-3 fill-gray-500 absolute right-6 top-0 bottom-0 my-auto"/>
    </th>
</template>