<script setup>
import Card from "../../components/shared/Card.vue";
import { ref, inject, onMounted } from "vue";
import Table from "../../components/shared/table/Table.vue";
import TableHead from "../../components/shared/table/TableHead.vue";
import TableCell from "../../components/shared/table/TableCell.vue";
import TableRow from "../../components/shared/table/TableRow.vue";
import Spinner from "../../components/Spinner/Spinner.vue";
import Modal from "../../components/commission/Modal.vue";
import { useStore } from "vuex";
import { frontUrl } from "../../config/config";

const axios = inject("axios");
const store = useStore();

const rate = ref();
const commisionData = ref([]);
const loading = ref(true);
const showPopup = ref(false);
const hotels = ref([]);
const selectedHotelId = ref("");
const specialRate = ref(0);


onMounted(async () => {
    await getCommissionRate();
    await fetchCommissionData();
    await fetchHotels();
});

async function fetchHotels() {
    try {
        const { data } = await axios.get(`/api/hotel/get/all`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(data);
        hotels.value = data;
    } catch (error) {
        console.log(error);
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

async function fetchCommissionData() {
    try {
        loading.value = true;

        const { data } = await axios.get(`/api/commission`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log(data);
        commisionData.value = data;
        loading.value = false;
    } catch (error) {
        loading.value = false;
        next(error);
    }
}

const togglePopup = () => {
    showPopup.value = !showPopup.value;
};

const handleSave = async () => {
    const hId = selectedHotelId.value
    const sRate = specialRate.value
    console.log(hId);
    console.log(sRate)
    try {
        const data = await axios.patch(
            `/api/hotel/specialCommissionHotel/${hId}`,
            {
                special_commission:sRate,
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
            console.log(data)

    } catch (error) {
        console.log(error);
    }
};

const updateRate = async (rate) => {
    try {
        const data = await axios.post(
            `/api/commission/update`,
            {
                rate,
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        getCommissionRate();

        togglePopup();
    } catch (error) {
        console.log(error);
    }
};

const dateConvert = (dateStr) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
</script>

<template>
    <Card :title="`Commission Rate ${rate}%`">
        <button @click="togglePopup" class="absolute right-6 top-10 text-2xl text-blue-600 hover:text-gray-700">
            <font-awesome-icon icon="fa-solid fa-gear" />
        </button>

        <!-- <div 
        v-if="!loading && commisionData.length > 0"
        class="w-full flex mt-4">
           <input type="text" class="w-2/5 px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none">
        </div> -->

        <Table v-if="!loading && commisionData.length > 0" class="mt-6">
            <template #thead>
                <TableHead> Property Name </TableHead>

                <TableHead> Contact Name </TableHead>

                <!-- <TableHead>
                    email
                </TableHead>

                <TableHead>
                    Booking Id
                </TableHead> -->

                <TableHead> Booking Amount </TableHead>

                <TableHead empty> Commission Rate </TableHead>

                <TableHead empty> Commision </TableHead>

                <TableHead empty> Date </TableHead>
            </template>

            <template #tbody>
                <TableRow v-for="(data, index) in commisionData" :key="index">
                    <TableCell>
                        {{ data.hotel_id.property_name }}
                    </TableCell>

                    <!-- <TableCell>
                    {{ `${data.user?.firstName} ${data.user?.lastName}` }}
                </TableCell> -->

                    <!-- <TableCell>
                    {{ data.user?.email }}
                </TableCell> -->

                    <TableCell>
                        {{ data.booking_id }}
                    </TableCell>

                    <TableCell>
                        {{ `USD ${data.booking_amount}` }}
                    </TableCell>

                    <TableCell>
                        {{ `${data.commission_rate} %` }}
                    </TableCell>

                    <TableCell> USD {{ data.commission }} </TableCell>

                    <TableCell>
                        {{ dateConvert(data.createdAt) }}
                    </TableCell>
                </TableRow>
            </template>
        </Table>

        <div v-if="!loading && commisionData.length == 0" class="w-full h-96 flex items-center justify-center flex-col">
            <font-awesome-icon icon="fa-solid fa-coins" class="text-6xl text-gray-400" />
            <p class="mt-4 text-base text-gray-500 font-light">
                No commission recoreds
            </p>
        </div>

        <Spinner v-if="loading" class="mx-auto" />

        <Modal v-if="showPopup" @onClose="togglePopup" @onSubmit="updateRate" />
    </Card>

    <div class="w-full px-6 py-10 bg-white shadow-md relative mt-2">
        <div class="flex justify-between">
            <div class="flex gap-8">
                <h3 class="text-lg font-semibold text-gray-800">
                    Special Commission Rate:
                </h3>
                <input type="number" v-model="specialRate"
                    class="px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none" />
            </div>
            <div class="flex gap-8">
                <select id="dropdown"
                    class="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                    v-model="selectedHotelId" @input="$emit('update:selectedHotelId', $event.target.value)">
                    <option value="" disabled selected class="text-sm font-semibold text-gray-500 appearance-none">
                        Select a hotel
                    </option>
                    <option v-for="hotel in hotels" :value="hotel._id" :key="hotel.hotel_id"
                        class="text-sm font-semibold text-gray-500 appearance-none">
                        {{ hotel.property_name }}
                    </option>
                </select>
                <button @click="handleSave" class="bg-blue-500 rounded-sm text-white py-2 px-4 hover:bg-blue-700">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
