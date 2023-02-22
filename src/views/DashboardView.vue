<script setup>

import { ref, inject, onMounted } from 'vue'
import { useStore } from 'vuex';
import Spinner from '../components/Spinner/Spinner.vue'
import Card from '../components/shared/Card.vue';

const axios = inject('axios')
const store = useStore()

const { user } = store.state

const totalCommission = ref()
const activeHotelCount = ref()

onMounted(async () => {
    await getTotalCommission()
    await getActiveHotelCount()
})

async function getTotalCommission() {
    try {
        const {data} = await axios.get('/api/commission/total', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        totalCommission.value = data[0].total
    }
    catch(error) {
        console.log(error)
    }
}

async function getActiveHotelCount() {
    try {
        const {data} = await axios.get('/api/hotel/get/active/count', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        activeHotelCount.value = data
    }
    catch(error) {
        console.log(error)
    }
}

</script>

<template>
    
    <Card>

        <div class="w-full grid grid-cols-3 gap-8">
            
            <div 
            v-if="user.role == 'admin'"
            class="w-full rounded-md bg-slate-400 shadow-md h-48 flex flex-col gap-4 p-6">
                <h4 class="text-white text-base font-semibold">Total Commission</h4>

                <h1 class="text-green-300 font-bold text-5xl">USD {{totalCommission}}</h1>

            </div>

            <div 
            class="w-full rounded-md bg-slate-400 shadow-md h-48 flex flex-col gap-4 p-6">
                <h4 class="text-white text-base font-semibold">Active Hotels</h4>

                <h1 class="text-green-300 font-bold text-8xl">{{activeHotelCount}}</h1>

            </div>

        </div>

    </Card>

</template>
