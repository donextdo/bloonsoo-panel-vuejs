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
        },
        options: {
            type: [Array, Boolean],
            default: false
        },
        selectedOption: {
            type: [Object, Boolean],
            default: false
        },
        slot: {
            type: Boolean,
            default: false
        }
    })
</script>

<template>
    <div class="flex flex-col gap-2 items-start">
        <label :class="error ? 'text-red-600' : 'text-gray-600' " v-if="label" class="text-sm font-semibold">{{ label }}</label>

        <div class="w-full h-max relative">

            <select
            id="dropdown"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :class="error ? 'border-red-600' : 'border-slate-400'" 
            class="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
            >

                <option v-if="selectedOption" 
                :value="selectedOption.value" 
                class="text-sm font-semibold text-gray-500 appearance-none">
                    {{ selectedOption.label }}
                </option>

                <option v-if="options" 
                v-for="(option, index) in options" :key="index"
                :value="option.value ? option.value : option" 
                class="text-sm font-semibold text-gray-500 appearance-none">
                    {{ option.label ? option.label : option }}
                </option>

                <slot v-if="slot"></slot>

            </select>

            <font-awesome-icon icon="fa-solid fa-caret-down" class="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none"/>

        </div>

        <small v-if="error" class="text-xs text-red-600">
            {{ errorMessage }}
        </small>

    </div>
</template>