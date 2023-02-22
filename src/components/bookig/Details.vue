<script setup>
import { ref, inject, onMounted } from 'vue'
import ButtonSpinner from '../Spinner/ButtonSpinner.vue';
const emits = defineEmits(['onClose', 'onSubmit'])
const axios = inject('axios')

const approveLoading = ref(false)
const rejectLoading = ref(false)

const props = defineProps({
    bookingObj: {
        type: Object
    }
})


const handleClose = () => {
    emits('onClose')
}


const handleApprove = async (id) => {
    try {
        approveLoading.value = true
        const {data} = await axios.patch(`/api/booking/approve/${id}`, {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        approveLoading.value = false
        emits('onSubmit')
    }
    catch (error) {
        console.log(error)
    }    
}


const handleReject = async (id) => {
    try {
        rejectLoading.value = true
        const {data} = await axios.patch(`/api/booking/cancel/${id}`, {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        rejectLoading.value = false
        emits('onSubmit')
    }
    catch (error) {
        console.log(error)
    } 
}

const dateConvert = (dateStr) => {
    const date = new Date(dateStr)

    return date.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })
}

</script>

<template>
  
    <div class="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">

        <div class="w-[60vw] max-h-full bg-white rounded-lg relative shadow-md overflow-visible flex flex-col gap-6 px-8 py-10 overflow-y-scroll !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-gray-500">

            <div class="flex flex-col pb-5 gap-2 border-b border-gray-400">

                <h3 class="text-xl font-semibold"> 
                    {{ bookingObj.hotel_id.property_name }}
                </h3>

            </div>

            <div class="flex flex-col pb-5 gap-2 border-b border-gray-400">
                <h3 class="text-base font-medium"> 
                    {{ bookingObj.full_name }}
                </h3>    
                <h3 class="text-base font-medium"> 
                    {{ bookingObj.country }}
                </h3> 
                <h3 class="text-base font-medium"> 
                    {{ bookingObj.email }}
                </h3> 
                <h3 class="text-base font-medium"> 
                    {{ bookingObj.mobile }}
                </h3> 
            </div>

            <section v-for="(book, index) in bookingObj.booked_rooms" :key="index" class="flex flex-col gap-6">
                <div class="flex flex-col pb-5 gap-4 border-b border-gray-400">

                <h4 class="text-base font-semibold text-gray-900">
                    Total length of stay: 
                    <span class="font-medium"> 
                        {{ `${book.nights} nights` }} {{ `${book.adults} adults` }} {{ book.children > 0 ? `${book.children} children` : '' }}
                    </span> 
                </h4>

                <div class="w-2/5 grid grid-cols-2 gap-4 text-sm text-gray-900">
                    <div class="flex flex-col gap-2">
                        <span class="font-medium">
                            Check In
                        </span>
                        <span class="font-semibold">
                            {{ dateConvert(book.check_in) }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-2">
                        <span class="font-medium">
                            Check Out
                        </span>
                        <span class="font-semibold">
                            {{ dateConvert(book.check_out) }}
                        </span>
                    </div>
                </div>

                </div>

                <div class="flex flex-col pb-5 gap-2 border-b border-gray-400">

                    <h4 class="text-base font-semibold">
                        {{ book.rooms }} x {{ book.room_name }} {{ book.room_type }} 
                    </h4>
                    <!-- <h4 class="text-base font-semibold">
                        1 x Deluxe Lake View King Total cost to cancel 
                    </h4> -->

                </div>

                <div class="flex items-center justify-between pb-5 gap-2 border-b border-gray-400">
                    <h3 class="text-lg font-bold">
                        Price
                    </h3>

                    <h3 class="text-lg font-bold">
                        {{ book.total }}
                    </h3>
                </div>

            </section>

            <div class="flex flex-col gap-2">

                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-medium">
                        Commission Rate
                    </h3>

                    <h3 class="text-lg font-medium">
                        {{ bookingObj.commission_rate }}%
                    </h3>
                </div>

                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-medium">
                        Commission
                    </h3>

                    <h3 class="text-lg font-medium">
                        USD {{ bookingObj.commission }}
                    </h3>
                </div>

                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold">
                        Total Price
                    </h3>

                    <h3 class="text-lg font-bold">
                        {{ bookingObj.total }}
                    </h3>
                </div>

                <div class="flex items-center gap-4 mt-6 justify-end">
                    <button 
                    @click="handleApprove(bookingObj._id)"
                    class="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold">
                        <ButtonSpinner v-if="approveLoading" />
                        <span v-else>Approve</span>
                    </button>

                    <button 
                    @click="handleReject(bookingObj._id)"
                    class="py-2 px-6 bg-red-500 rounded-sm text-white font-semibold">
                        <ButtonSpinner v-if="rejectLoading" />
                        <span v-else>Reject</span>
                    </button>
                </div>
                

                </div>

            <button @click="handleClose" class="absolute right-4 top-4 w-6 h-6 z-50">
                <font-awesome-icon icon="fa-solid fa-times" class="text-red-600 text-xl"/>
            </button>

        </div>


    </div>

</template>