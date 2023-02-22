<script setup>
import { ref, inject, onMounted } from 'vue'
import { useStore } from 'vuex'
import Card from '../components/shared/Card.vue'
import Table from '../components/shared/table/Table.vue'
import TableHead from '../components/shared/table/TableHead.vue'
import TableCell from "../components/shared/table/TableCell.vue";
import TableRow from "../components/shared/table/TableRow.vue";
import Details from '../components/bookig/Details.vue'

const axios = inject('axios')
const store = useStore()

const bookings = ref([])
const currentBooking = ref()
const showDetails = ref(false)

onMounted( async () => {
    fetchBookings()
})

async function fetchBookings() {
    try {
        const {data} = await axios.get('/api/booking', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(data)
        bookings.value = data
    }
    catch(error) {
        console.log(error)
    }
}

const getPaymentMethod = (type) => {
    if(type == 0) {
        return 'Credit/Debit Card'
    }
    else if(type == 1) {
        return 'Crypto Currency'
    }
    else {
        return 'On Site'
    }
}

const toggleDetails = (book) => {
    currentBooking.value = book
    console.log(currentBooking.value)
    showDetails.value = true
}

const closeDatails = () => {
    showDetails.value = false
}

const onSubmit = () => {
    fetchBookings()
    showDetails.value = false
}

const getStatusColor = (status) => {
    if(status == 0) {
        return 'bg-yellow-500'
    }
    else if(status == 1) {
        return 'bg-green-500'
    }
    else {
        return 'bg-red-500'
    }
}

const getStatusText = (status) => {
    if(status == 0) {
        return 'PENDING'
    }
    else if(status == 1) {
        return 'APPROVED'
    }
    else {
        return 'CANCELLED'
    }
}

</script>

<template>
    <Card>
        <div class="w-full flex flex-col">

            <Table>

                <template #thead>
                <TableHead>ID</TableHead>
                <TableHead>Hotel</TableHead>
                <!-- <TableHead>User</TableHead> -->
                <TableHead>Full Name</TableHead>
                <!-- <TableHead>Country</TableHead> -->
                <!-- <TableHead>Mobile</TableHead> -->
                <TableHead>Email</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <!-- <TableHead>Arrival</TableHead> -->
                <!-- <TableHead>Date</TableHead> -->
                <TableHead empty>Actions</TableHead>
                </template>

                <template #tbody>
                
                <TableRow v-for="(book, index) in bookings" :key="index">
                
                    <TableCell>
                        {{ book._id }}
                    </TableCell>

                    <TableCell>
                        {{ book.hotel_id.property_name }}
                    </TableCell>

                    <!-- <TableCell>
                        {{ book.user_id.username }}
                    </TableCell> -->

                    <TableCell>
                        {{ book.full_name }}
                    </TableCell>

                    <!-- <TableCell>
                        {{ book.country }}
                    </TableCell> -->

                    <!-- <TableCell>
                        {{ book.mobile }}
                    </TableCell> -->

                    <TableCell>
                        {{ book.email }}
                    </TableCell>

                    <TableCell>
                        {{ book.total }}
                    </TableCell>

                    <TableCell>
                        {{ book.commission_rate }}%
                    </TableCell>

                    <TableCell>
                        USD {{ book.commission }}
                    </TableCell>

                    <TableCell>
                        {{ getPaymentMethod(book.payment_method) }}
                    </TableCell>

                    <TableCell>
                        <span 
                        :class="getStatusColor(book.status)"
                        class="px-2 py-[2px] rounded-full  text-black">
                            {{ getStatusText(book.status) }}
                        </span>
                    </TableCell>

                    <!-- <TableCell>
                        {{ book.arrival_time }}
                    </TableCell> -->

                    <!-- <TableCell>
                        {{ book.createdAt }}
                    </TableCell> -->

                    <TableCell>
                        <button
                        @click="toggleDetails(book)"
                        class="px-4 py-1 text-xs font-semibold bg-gray-600 text-white rounded-md">
                            View
                        </button>
                    </TableCell>

                </TableRow>

                </template>

            </Table>

            </div>

            <Details v-if="showDetails" :bookingObj="currentBooking" @onClose="closeDatails" @onSubmit="onSubmit"/>
    </Card>
</template>