<script setup>
    import { ref } from 'vue'

    defineProps({
        label: {
            type: [String, Boolean],
            default: false,
        },
        placeholder: {
            type: String
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
        editMode: {
            type: Boolean,
            default: false
        }
    })

    const showPassword = ref(false)

    const togglePassword = () => {
        showPassword.value = !showPassword.value
    }


</script>

<template>

    <div class="relative w-full mb-2">

        <input 
        :type="showPassword ? 'text' : 'password'" 
        :placeholder="placeholder" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full px-6 pr-8 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none">

        <!-- <font-awesome-icon icon="fa-solid fa-lock" class="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"/> -->

        <button
        @click="togglePassword"
        class="absolute right-4 text-gray-700 text-base top-0 bottom-0 my-auto">
            <font-awesome-icon v-if="showPassword" icon="fa-solid fa-eye" />
            <font-awesome-icon v-if="!showPassword" icon="fa-solid fa-eye-slash" />
        </button>

        <small v-if="error"
            class="text-xs font-semibold text-red-700 absolute left-0 -bottom-5">
            {{ errorMessage }}
        </small>

    </div>

</template>