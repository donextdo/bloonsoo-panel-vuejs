<script setup>

    import { computed, ref } from  'vue'

    const props = defineProps({
        title: {
            type: [String, Boolean],
            default: false,
        },
        modelValue: {
            type: Array,
            default: [],
        },
        error: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String
        },
        options: {
            type: Array
        },
        orientation: {
            type: String,
            default: 'col'
        },
        row_6: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const value = computed({
        get() {
            return props.modelValue
        },
        set(value) {
            emit('update:modelValue', value)
        }
    })

</script>

<template>
    <div class="flex flex-col gap-4 items-start">
        <h4 :class="error ? 'text-red-600' : 'text-gray-600' " v-if="title" class="text-sm font-semibold">{{ title }}</h4>

        <div 
        class="grid gap-6 w-full grid-flow-col grid-cols-4 grid-rows-4"
        :class="row_6 ? 'grid-rows-6': ''">


            <div 
            v-for="(option, index) in options" :key="index"
            class="flex gap-2 items-center">
                <input
                type="checkbox"
                :id="option.data"
                :value="option.data"
                v-model="value"
                name="check"
                class="w-3 h-3 cursor-pointer"
                /> 

                <label :for="option.data" class="text-gray-600 text-sm h-max w-max font-semibold"> {{ option.label }}</label>
            </div>
            
        </div>
        
        <small v-if="error" class="text-xs text-red-600">
            {{ errorMessage }}
        </small>

    </div>
</template>