<script setup>

import Sort from './Sort.vue'

defineProps({
    empty: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['onSort'])

const handleClick = () => {
    emits('onSort')
}

</script>

<template>
    <th 
    @click="handleClick"
    :class="!empty && 'hover:bg-gray-300 cursor-pointer'"
    scope="col" class="relative px-6 py-3 pr-8 font-medium tracking-normal whitespace-nowrap">
        <slot />
        <Sort v-if="!empty" class="w-3 h-3 fill-gray-500 absolute right-4 top-0 bottom-0 my-auto"/>
    </th>
</template>