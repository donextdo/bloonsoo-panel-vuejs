<script setup>
import { ref, inject, onMounted } from 'vue'
import Table from '../../../components/shared/table/Table.vue'
import TableHead from '../../../components/shared/table/TableHead.vue'
import TableCell from "../../../components/shared/table/TableCell.vue";
import TableRow from "../../../components/shared/table/TableRow.vue";
import Spinner from '../../../components/Spinner/Spinner.vue'
import AddHotelAdmin from '../../../components/Hotels/AddHotelAdmin.vue';
import { useStore } from 'vuex'
import { frontUrl } from '../../../config/config'

const axios = inject('axios')
const store = useStore()
const { user } = store.state

const hotels = ref([])
const loading = ref(false)  
const showAddHotelAdmin = ref(false)
const rate = ref();


onMounted( async () => {

    await fetchHotels()
    await  getCommissionRate()
    
})


async function fetchHotels() {
    try {
        loading.value = true

        const endpoint = user.role === 'admin' ? 'get/all' : 'get/my'

        const {data} = await axios.get(`/api/hotel/${endpoint}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(data)
        hotels.value = data
        loading.value = false
    } catch (error) {
        console.log(error)
    }
}


const handleHotelStatus = async (id, type) => {
    try {

        const {data} = await axios.patch(`/api/hotel/${type}/${id}`, {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(data)
        await fetchHotels()

    }
    catch (error) {
        console.log(error)
    }
} 

const handleHotelStatusInactive = async (id, type) => {
    try {

        const {data} = await axios.patch(`/api/hotel/${type}/${id}`, {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(data)
        await fetchHotels()

    }
    catch (error) {
        console.log(error)
    }
} 

const handleHotelStatusActive = async (id, type) => {
    try {

        const {data} = await axios.patch(`/api/hotel/${type}/${id}`, {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(data)
        await fetchHotels()

    }
    catch (error) {
        console.log(error)
    }
} 
 


const getStatusColor = (status) => {
    if(status === 'active'){
        return 'bg-green-400'
    }
    else if(status === 'pending'){
        return 'bg-yellow-500'
    }
    else {
        return 'bg-red-500'
    }
}

async function getCommissionRate() {
    try {
        const res = await axios.get(`/api/commission/rate`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        rate.value = res.data.rate;
    } catch (error) {
        console.log(error);
    }
}


const toggleAddHotelAdmin = () => {
    showAddHotelAdmin.value = !showAddHotelAdmin.value
}

</script>

<template>
    
    <div class="w-full flex flex-col">

        <button 
        v-if="user.role == 'admin'"
        @click="toggleAddHotelAdmin"
        class="py-2 px-6 mb-6 w-max bg-gray-800 text-white text-sm font-semibold rounded-md">
          Create Hotel Manager
        </button>

        <Spinner v-if="loading" class="mx-auto"/>

        <Table v-else>

            <template #thead>
                <TableHead>
                    Property Name
                </TableHead>

                <TableHead>
                    Contact Name
                </TableHead>

                <TableHead>
                    Contact Mobile
                </TableHead>

                <TableHead>
                    Address
                </TableHead>

                <TableHead>
                    User
                </TableHead>

                <TableHead empty>
                    Hotel Commission
                </TableHead>

                <TableHead empty>
                    Status
                </TableHead>

                <TableHead empty>
                    Actions
                </TableHead>
            </template>

            <template #tbody>
            
            <TableRow v-for="(hotel, index) in hotels" :key="index">

                <TableCell>
                    <a :href="`${frontUrl}/hotels/${hotel._id}`" target="_blank" 
                    rel="noopener noreferrer" 
                    class="text-blue-900 font-semibold">
                        {{ hotel.property_name }}
                    </a>
                </TableCell>

                <TableCell>
                    {{ hotel.contact_name }}
                </TableCell>

                <TableCell>
                    {{ hotel.contact_phone_number }}
                </TableCell>

                <TableCell>
                    <p>{{hotel.property_address.street_address}},</p>
                    <p>{{hotel.property_address.country}}</p>
                    <!-- {{ `${hotel.property_address.street_address}, ${hotel.property_address.country}` }} -->
                </TableCell>

                <TableCell>
                    {{ hotel.user?.username }}
                </TableCell>

                <TableCell>
                    {{ hotel.special_commission ?  hotel.special_commission : rate}}
                </TableCell>

                <TableCell>
                    <span 
                    :class="getStatusColor(hotel.status)"
                    class="px-2 py-[2px] rounded-full  text-black">
                        {{ hotel.status }}
                    </span>
                </TableCell>

                <TableCell>
                    <div class="w-full flex items-center gap-3">
                        <router-link 
                        :to="{name: 'hotelDetails', params: {id: hotel._id}}"
                        class="px-4 py-1 text-xs font-semibold bg-gray-800 text-white rounded-md">
                            View
                        </router-link>

                        <router-link 
                        :to="{name: 'roomListByHotel', params: {id: hotel._id}}"
                        class="px-4 py-1 text-xs font-semibold bg-gray-600 text-white rounded-md">
                            Rooms
                        </router-link>

                        <button 
                        @click="handleHotelStatus(hotel._id, 'approve')"
                        v-if="(hotel.status === 'pending' || hotel.status === 'inactive') && user.role === 'admin'"
                        class="px-4 py-1 text-xs font-semibold bg-green-600 text-white rounded-md">
                            Approve
                        </button>

                        <button 
                        @click="handleHotelStatus(hotel._id, 'reject')"
                        v-if="hotel.status === 'pending' && user.role === 'admin'"
                        class="px-4 py-1 text-xs font-semibold bg-red-600 text-white rounded-md">
                            Reject
                        </button>

                        <button
                        @click="handleHotelStatus(hotel._id, 'publish')"
                        v-if="!hotel.is_open_to_bookings && user.role === 'hotel-admin'"
                        class="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md">
                            Publish
                        </button>

                        <button 
                        @click="handleHotelStatus(hotel._id, 'unpublish')"
                        v-if="hotel.is_open_to_bookings && user.role === 'hotel-admin'"
                        class="px-4 py-1 text-xs font-semibold bg-red-500 text-white rounded-md">
                            Unpublish
                        </button>

                        <button 
                        @click="handleHotelStatus(hotel._id, 'inactive')"
                        class="px-4 py-1 text-xs font-semibold bg-red-800 text-white rounded-md">
                            Delete
                        </button>

                        <button 
                        @click="handleHotelStatusInactive(hotel._id, 'inactive')"
                        v-if="hotel.status === 'active' && user.role === 'admin'"
                        class="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md">
                            Inactive
                        </button>

                        <!-- <button 
                        @click="handleHotelStatusActive(hotel._id, 'active')"
                        v-if="hotel.status === 'inactive' && user.role === 'admin'"
                        class="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md">
                            Active
                        </button> -->
                    </div>
                </TableCell>

            </TableRow>

            </template>

        </Table>

        <AddHotelAdmin v-if="showAddHotelAdmin" @onClose="toggleAddHotelAdmin"/>

    </div>
    
</template>
