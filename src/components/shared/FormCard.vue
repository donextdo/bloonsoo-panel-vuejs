<script setup>

defineProps({
    label: {
        type: [String, Boolean],
        default: false,
    },
})

</script>


<template>
    
    <div class="bg-gray-100 rounded-md w-full flex flex-col gap-6 py-8 px-6 font-montserrat">
        
        <h4 v-if="label" class="text-lg text-gray-600 font-semibold">
            {{ label }}
        </h4>

        <slot/>
        
    </div>

</template>