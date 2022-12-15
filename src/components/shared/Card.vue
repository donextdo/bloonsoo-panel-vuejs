<script setup>

defineProps({
    title: {
        type: [String, Boolean],
        default: false
    }
})

</script>


<template>
    
    <div class="w-full px-6 py-10 bg-white shadow-md">

        <h3 v-if="title" class="text-lg font-semibold text-gray-800">
            {{ title }}
        </h3>

        <slot></slot>

    </div>

</template>