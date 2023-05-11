<script setup>

import { ref, inject, onMounted } from 'vue'
import TextInput from '../shared/TextInput.vue';
import ButtonSpinner from '../Spinner/ButtonSpinner.vue';

const props = defineProps({
    userId: {
        type: String
    }
})
const emits = defineEmits(['onClose', 'onSubmit'])
const axios = inject('axios')
const searchQuery = ref('')
const hotelList = ref([])
const hotelIds = ref([])
const hotelIdsError = ref(false)
const loading = ref(false)

onMounted( async () => {
    await fetchHotels()
})

async function fetchHotels() {
    try {

        const {data} = await axios.get(`/api/hotel/get/all`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        hotelList.value = data
    } catch (error) {
        console.log(error)
    }
}

const handleClose = () => {
    emits('onClose')
}

const triggerSearch = async () => {
    try {
        const {data} = await axios.post('api/hotel/search-by-name', { query: searchQuery.value}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        hotelList.value = data
    } catch (error) {
        console.log(error)
    }
}

const triggerReset = () => {
    searchQuery.value = ''
    fetchHotels()
}

const assignHotel = async () => {
    try {

        setTimeout(() => {
            hotelIdsError.value = false
        }, 3000)

        if(hotelIds.value.length == 0) return hotelIdsError.value = true

        loading.value = true

        const dto = {
            userId: props.userId,
            hotelIds: hotelIds.value
        }

        console.log(dto)

        const { data } = await axios.patch('/api/user/hotels/assign-hotels', dto, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        hotelIds.value = []

        loading.value = false
        emits('onSubmit')
    } catch (error) {
        console.log(error)
    }
}

</script>


<template>

    <div class="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">

        <div class="w-[40vw] max-h-full bg-white rounded-lg relative shadow-md overflow-hidden flex flex-col gap-6 px-8 py-10">

            <div class="w-full flex gap-4 mb-6">
                <TextInput 
                    placeholder="Search" 
                    v-model="searchQuery"
                />

                <button 
                    @click="triggerSearch"
                    :disabled="!searchQuery"
                    class="py-2 px-6 w-max bg-gray-800 text-white text-sm font-semibold">
                    Search
                </button>

                <button 
                    @click="triggerReset"
                    class="py-2 px-6 w-max bg-blue-800 text-white text-sm font-semibold">
                    Reset
                </button>
            </div>

            <div class="flex flex-col gap-6 overflow-y-hidden h-[24rem]">

                <h5 
                v-if="hotelIdsError"
                class="text-sm text-red-500 font-semibold">
                    Please select at least one property
                </h5>

                <h4 class="text-lg text-gray-700 font-medium">Select Property</h4>

                <p v-if="hotelIdsError" class="text-sm text-red-500 font-medium">
                    Please select property
                </p>

                <div class="w-full flex flex-col border border-gray-300 h-full relative overflow-visible overflow-y-scroll !scrollbar-default !scrollbar-track-transparent !scrollbar-thumb-gray-500">

                    <div 
                    v-for="(hotel, index) in hotelList" :key="index"
                    class="p-3 flex items-center gap-4 border-b border-gray-200">
                        <input type="checkbox"
                        :value="hotel._id"
                        v-model="hotelIds"
                        class="w-4 h-4 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent">

                        <label for="" class="text-base text-gray-600 font-semibold">
                            {{hotel.property_name}}
                        </label>
                    </div>

                </div>

            </div>

            <button 
            @click="assignHotel"
            class="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold mt-auto">
                <ButtonSpinner v-if="loading" />
                <span v-else>Assign Hotel(s)</span>
            </button>

            <button @click="handleClose" class="absolute right-4 top-4 w-6 h-6 z-50">
                <font-awesome-icon icon="fa-solid fa-times" class="text-red-600 text-xl"/>
            </button>

        </div>

    </div>

</template>