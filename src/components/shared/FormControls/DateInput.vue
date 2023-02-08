<script setup>
    defineProps({
        label: {
            type: [String, Boolean],
            default: false,
        },
        modelValue: {
            type: String,
            default: "",
        },
        error: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String
        }
    })
</script>

<template>
    <div class="flex flex-col gap-2 items-start">
        <label :class="error ? 'text-red-600' : 'text-gray-600' " v-if="label" class="text-sm font-bold">{{ label }}</label>

        <div class="w-full relative h-max">
            <input
            type="date"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-full px-12 py-2 border border-slate-400 rounded-lg text-slate-700 font-semibold text-sm focus:border-blue-500 focus:border focus:outline-none appearance-none"
            v-bind="$attrs"
            />

            <font-awesome-icon icon="fa-solid fa-calendar" class="absolute left-4 top-0 bottom-0 my-auto text-slate-700 text-lg" />
        </div>
        

        <small v-if="error" class="text-xs text-red-600">
            {{ errorMessage }}
        </small>

    </div>
</template>

<style scoped>

input[type="date"] {
    appearance: none;
    -webkit-appearance: none;
    position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
</style>