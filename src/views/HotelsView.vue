<script setup>
import { ref, inject, onMounted } from 'vue'
import Card from '../components/shared/Card.vue'
import Table from '../components/shared/table/Table.vue'
import TableHead from '../components/shared/table/TableHead.vue'
import TableCell from "../components/shared/table/TableCell.vue";
import TableRow from "../components/shared/table/TableRow.vue";

const axios = inject('axios')

const hotels = ref([])

onMounted( async () => {
    const {data} = await axios.get('/api/hotel')

    console.log(data)
    hotels.value = data
})

</script>

<template>
    <Card>
        <div class="w-full flex flex-col">

            <Table>

                <template #thead>
                <TableHead>ID</TableHead>
                <TableHead>Property Name</TableHead>
                <TableHead>Contact Name</TableHead>
                <TableHead>Contact Mobile</TableHead>
                <TableHead>Address</TableHead>
                </template>

                <template #tbody>
                
                <TableRow v-for="(hotel, index) in hotels" :key="index">
                
                    <TableCell>
                        {{ hotel._id }}
                    </TableCell>

                    <TableCell>
                        {{ hotel.property_name }}
                    </TableCell>

                    <TableCell>
                        {{ hotel.contact_name }}
                    </TableCell>

                    <TableCell>
                        {{ hotel.contact_phone_number }}
                    </TableCell>

                    <TableCell>
                        {{ `${hotel.property_address.street_address}, ${hotel.property_address.country}` }}
                    </TableCell>

                </TableRow>

                </template>

            </Table>

            </div>
    </Card>
</template>