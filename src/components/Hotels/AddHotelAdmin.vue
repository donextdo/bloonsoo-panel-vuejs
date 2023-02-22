<script setup>
import { ref, inject, onMounted } from 'vue'
import ButtonSpinner from '../Spinner/ButtonSpinner.vue';
import TextInput from '../shared/TextInput.vue';
import Password from '../shared/Password.vue';
const emits = defineEmits(['onClose', 'onSubmit'])
const axios = inject('axios')

const approveLoading = ref(false)
const rejectLoading = ref(false)
const hotelList = ref([])
const hotelIds = ref([])
const hotelIdsError = ref(false)
const username = ref()
const usernameError = ref(false)
const email = ref()
const emailError = ref(false)
const emailErrorMessage = ref()
const password = ref()
const passwordError = ref(false)
const confirmPassword = ref()

onMounted(async () => {
    await fetchHotelList()
})

async function fetchHotelList() {
    try {
        const {data} = await axios.get('/api/hotel/get/user-not-exist/list', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        hotelList.value = data
    }
    catch (error) {
        console.log(error)
    }
}

const handleClose = () => {
    emits('onClose')
}

const addHotelAdmin = async () => {
    try {
        setTimeout(() => {
            hotelIdsError.value = false 
            usernameError.value = false 
            emailError.value = false 
            passwordError.value = false
        }, 3000)

        if(hotelIds.value.length == 0) return hotelIdsError.value = true
        if(password.value !== confirmPassword.value) return passwordError.value = true

        approveLoading.value = true

        const userDto = {
            username: username.value,
            email: email.value,
            password: password.value,
            hotelIds: hotelIds.value
        }

        const {data} = await axios.post('/api/user/create-hotel-admin', userDto, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        username.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        hotelIds.value = []

        approveLoading.value = false
    }
    catch (error) {
        approveLoading.value = false
        if(error.response && error.response.data) {
            if(error.response.data.duplicate) {
                if(error.response.data.duplicate[0] == 'username') {
                    usernameError.value = true
                }
                else if(error.response.data.duplicate[0] == 'email') {
                    emailError.value = true
                    emailErrorMessage.value = 'Email already registered'
                }
            }
        }
        console.log(error)
    }
}


</script>

<template>
  
    <div class="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">

        <div class="w-[65vw] max-h-full bg-white rounded-lg relative shadow-md overflow-hidden flex flex-col gap-6 px-8 py-10">

            <div class="w-full grid grid-cols-2 gap-6">

                <div class="flex flex-col gap-6 h-[24rem]">

                    <h4 class="text-lg text-gray-700 font-medium">User Information</h4>

                    <TextInput 
                        placeholder="Username"
                        v-model="username"
                        :error="usernameError"
                        error-message="username already exists"
                    />

                    <TextInput 
                        placeholder="Email"
                        v-model="email"
                        :error="emailError"
                        :error-message="emailErrorMessage"
                    />

                    <Password 
                        placeholder="Password"
                        v-model="password"
                    />

                    <Password 
                        placeholder="Confirm Password"
                        v-model="confirmPassword"
                        :error="passwordError"
                        error-message="Passwords doesn't match"
                    />

                    <button 
                    @click="addHotelAdmin"
                    class="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold mt-auto">
                        <ButtonSpinner v-if="approveLoading" />
                        <span v-else>Create User</span>
                    </button>

                </div>


                <div class="flex flex-col gap-6 overflow-y-hidden h-[24rem]">

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

                

            </div>
            

            <button @click="handleClose" class="absolute right-4 top-4 w-6 h-6 z-50">
                <font-awesome-icon icon="fa-solid fa-times" class="text-red-600 text-xl"/>
            </button>

        </div>


    </div>

</template>