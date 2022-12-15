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
        <label :class="error ? 'text-red-600' : 'text-gray-600' " v-if="label" class="text-sm font-semibold">{{ label }}</label>

        <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="error ? 'border-red-600' : 'border-slate-400'" 
        class="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
        v-bind="$attrs"
        />

        <small v-if="error" class="text-xs text-red-600">
            {{ errorMessage }}
        </small>

    </div>
</template>