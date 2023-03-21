<script setup>

import { ref, inject, onMounted } from 'vue'
import { useStore } from 'vuex';
import Spinner from '../components/Spinner/Spinner.vue'
import Card from '../components/shared/Card.vue';
import DashboardCard from '../components/dashboard/DashboardCard.vue';
import { Bar, Pie, Doughnut, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

const axios = inject('axios')
const store = useStore()

const { user } = store.state

const totalCommission = ref()
const activeHotelCount = ref()
const totalBookings = ref()
const activeUsers = ref()

const chartData = ref({
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        datasets: [ {
            label: 'Commission',
            backgroundColor: '#10b981',
            data: [80, 60, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        } ]
      })
const chartOptions = ({
        responsive: true
      })

const lineData = ref({
    labels: ['January', 'February', 'March'],
    datasets: [
        {
            label: 'New Users',
            backgroundColor: '#fca5a5',
            data: [40, 39, 10]
        },
        {
            label: 'New Hotels',
            backgroundColor: '#fcd34d',
            data: [5, 20, 23]
        }
    ]
})

const lineOptions = ref({
    responsive: true,
    maintainAspectRatio: true
})

const dNutData = ref({
    labels: ['Hotels', 'Villas', 'Flats', 'Rooms'],
    datasets: [
        {
        backgroundColor: ['#e879f9', '#fcd34d', '#10b981', '#fca5a5'],
        data: [80, 3, 2, 15]
        }
    ]
})

const dNutOptions = ref({
  responsive: true,
  maintainAspectRatio: true
})

onMounted(async () => {
    await getTotalCommission()
    await getActiveHotelCount()
    await getTotalBookings()
    await getActiveUsers()
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

async function getTotalBookings() {
    try {
        const {data} = await axios.get('/api/booking/get/booking-count', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        totalBookings.value = data
    }
    catch(error) {
        console.log(error)
    }
}

async function getActiveUsers() {
    try {
        const {data} = await axios.get('/api/user/active-users', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        activeUsers.value = data
    }
    catch(error) {
        console.log(error)
    }
}

</script>

<template>

    <div class="w-full flex flex-col gap-10">

        <h3 class="text-2xl font-light text-gray-600">
            Dashboard
        </h3>

        <div class="w-full grid grid-cols-4 gap-6">
            <DashboardCard icon="fa-solid fa-hotel" color="cyan-600" title="Active Hotels" class="bg-cyan-600" value="50"/>
            <DashboardCard icon="fa-solid fa-bell-concierge" color="orange-300" class="bg-orange-300" title="Total Bookings" :value="totalBookings"/>
            <DashboardCard 
            v-if="user.role == 'admin'"
            icon="fa-solid fa-dollar-sign" color="fuchsia-500" class="bg-fuchsia-500" title="Total Income" :value="totalCommission"/>
            <DashboardCard icon="fa-solid fa-users" color="emerald-500" class="bg-emerald-500" title="Active Users" :value="activeUsers"/>
        </div>

        <div class="w-full grid grid-cols-2 gap-6">

            <Card title="Properties">
                <Doughnut :data="dNutData" :options="dNutOptions" />
            </Card>

            <!-- <Card title="Impressions">
                <Line :data="lineData" :options="lineOptions" />
            </Card> -->

            <Card title="Impressions" class="max-h-full">
                <Bar :data="lineData" :options="lineOptions" />
            </Card>

        </div>

        <Card title="Earnings">
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            />
        </Card>

    </div>
    
    <!-- <Card>

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

    </Card> -->

</template>
