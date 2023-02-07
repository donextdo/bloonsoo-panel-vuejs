<script setup>

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const axios = inject('axios')
const router = useRouter()
const store = useStore()

const username = ref()
const password = ref()
const keepMeLoogedIn = ref(false)
const usernameNotFoundError = ref(false)
const passwordInvalidError = ref(false)
const notAnAdminError = ref(false)

const handleClick = async () => {
    try {

        const loginDto = {
            email: username.value,
            password: password.value
        }

        const {data} = await axios.post('/api/auth/admin/login', loginDto, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        console.log(data)

        localStorage.setItem('token', data.token)
        localStorage.setItem('keepLoggedIn', keepMeLoogedIn.value)
        
        // localStorage.setItem('user', JSON.stringify(user.userInfo))

        await store.dispatch('getAuthUser')

        router.push({name: 'home'})

    } catch (error) {

        if (error.response) {
            if(error.response.data.code){
                if(error.response.data.code === 'USER_NOT_FOUND') {
                    setTimeout(() => {
                        usernameNotFoundError.value = false
                    },5000)
                    return usernameNotFoundError.value = true
                }
                else if(error.response.data.code === 'INVALID_PASSWORD') {
                    setTimeout(() => {
                        passwordInvalidError.value = false
                    },5000)
                    return passwordInvalidError.value = true
                }
                else if(error.response.data.code === 'NOT_AN_ADMIN') {
                    setTimeout(() => {
                        notAnAdminError.value = false
                    },5000)
                    return notAnAdminError.value = true
                }
            }
            else {
                console.log(error.response.data.message)
            }
        } else {
            console.error(error)
        }
    }
}

</script>

<template>
    <section class="login-section">

        <div class="w-full h-full px-12 col-start-2 bg-white bg-opacity-60 backdrop-blur-sm flex flex-col justify-center gap-6">

            <h3 class="text-4xl font-semibold mb-6">Login</h3>

            <div class="relative w-full mb-2">

                <input type="email" placeholder="Email or Username" 
                v-model="username"
                class="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent">

                <font-awesome-icon icon="fa-solid fa-user" class="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"/>

                <small v-if="usernameNotFoundError"
                    class="text-xs font-semibold text-red-700 absolute left-0 -bottom-5">
                        Cannot find username or email
                </small>

            </div>

            <div class="relative w-full mb-2">

                <input type="password" placeholder="Password" 
                v-model="password"
                class="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent">

                <font-awesome-icon icon="fa-solid fa-lock" class="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"/>

                <small v-if="passwordInvalidError"
                    class="text-xs font-semibold text-red-700 absolute left-0 -bottom-5">
                        Invalid Password
                </small>

            </div>

            <div class="flex items-center mb-2">

                <input type="checkbox"
                id="checkbox-1"
                v-model="keepMeLoogedIn"
                class="w-4 h-4 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent">

                <label for="checkbox-1" class="ml-2 text-sm text-gray-600">
                    Keep me logged in
                </label>

            </div>

            <button
            @click="handleClick"
            class="w-full py-3 bg-[#3A1C61] text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
            >
            Login
            </button>

            <small v-if="notAnAdminError"
                class="text-xs font-semibold text-red-700">
                    You are not an admin
            </small>

            <a to="#" class="ml-auto text-sm font-semibold">
                Forgot Password ?
            </a>

        </div>

    </section>
</template>


<style scoped>

    

</style>