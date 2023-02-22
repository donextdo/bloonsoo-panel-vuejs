<script setup>

import TextInput from '../shared/TextInput.vue';
import { ref } from 'vue'
import ButtonSpinner from '../Spinner/ButtonSpinner.vue';

const emits = defineEmits(['onClose', 'onSubmit'])

const rate = ref()
const rateError = ref(false)
const loading = ref(false)

const handleClose = () => {
    emits('onClose')
}

const handleSave = () => {

    setTimeout(() => {
        rateError.value = false
    }, 5000)

    if(!rate.value) return rateError.value = true

    loading.value = true

    emits('onSubmit', rate.value)
}

</script>

<template>

    <div class="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm grid place-items-center z-20">
        
        <div class="w-96 py-8 px-6 bg-white shadow-lg flex flex-col gap-6 rounded-md relative">

            <TextInput 
            v-model="rate"
            label="Change Commision Rate"
            placeholder="enter your new rate"
            :error="rateError"
            error-message="Rate cannot be empty"
            type="number"/>

            <button 
            @click="handleSave"
            class="bg-blue-500 rounded-sm text-white py-2 px-4 hover:bg-blue-700">
                <span
                    v-if="!loading"
                >
                    Save
                </span> 
                <ButtonSpinner 
                    v-if="loading"
                />
            </button>

            <button 
            @click="handleClose"
            class="absolute right-6 top-6 text-red-800 text-lg">
                <font-awesome-icon icon="fa-solid fa-times"/>
            </button>

        </div>

    </div>

</template>