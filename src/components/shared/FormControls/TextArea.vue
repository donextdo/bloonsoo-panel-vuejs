<script setup>

    import { ref, onMounted } from 'vue'

    const props = defineProps({
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
        rows: {
            type: String,
            default: '6'
        },
        maxChars: {
            type: Number,
            default: 600
        }
    })

    const contentError = ref(false)
    const remain = ref(0)

    onMounted(() => {
        remain.value = props.maxChars
    })

    const countRemain = () => {
        remain.value = props.maxChars
        const len = props.modelValue.length
        remain.value = remain.value - len

        if(remain.value < 0) return contentError.value = true
         
        contentError.value = false
    }

</script>

<template>
    <div class="flex flex-col gap-2 items-start">
        <label :class="error ? 'text-red-600' : 'text-gray-600' " v-if="label" class="text-sm font-semibold">{{ label }}</label>

        <div class="w-full relative h-max">

            <textarea
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :class="error || contentError ? 'border-red-600' : 'border-slate-400'" 
            class="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
            :rows="rows"
            @keyup="countRemain()"
            v-bind="$attrs"
            />

            <p :class="contentError ? 'text-red-600' : 'text-gray-500'" class="absolute bottom-4 right-2 text-sm font-bold">
                {{ remain }}
            </p>

        </div>

        <small v-if="error" class="text-xs text-red-600">
            {{ errorMessage }}
        </small>

    </div>
</template>