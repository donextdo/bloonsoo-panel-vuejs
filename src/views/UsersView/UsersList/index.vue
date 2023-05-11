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
import TextInput from '../../../components/shared/TextInput.vue';
import AssignHotel from '../../../components/Users/AssignHotel.vue';

const axios = inject('axios')
const store = useStore()
const { user } = store.state

const users = ref([])
const loading = ref(false)
const searchQuery = ref('')
const userId = ref('')
const showAssignHotel = ref(false)

onMounted( async () => {

    await fetchUsers()
    
})

async function fetchUsers() {
    try {
        loading.value = true

        const {data} = await axios.get('api/user/get-all-users', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        users.value = data
        loading.value = false

    } catch (error) {
        console.log(error)
    }
}

const triggerSearch = async () => {
    try {
        
        loading.value = true

        const {data} = await axios.post('api/user/search-user', { query: searchQuery.value}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        users.value = data
        loading.value = false

    } catch (error) {
        console.log(error)
    }
}

const triggerReset = async () => {
    try {
        await fetchUsers()
        searchQuery.value = ''
    } catch (error) {
        console.log(error)
    }
}

const toggleAssignHotel = (id) => {
    userId.value = id
    showAssignHotel.value = !showAssignHotel.value
}

const closeAssignHotel = () => {
    showAssignHotel.value = false
}

</script>

<template>

    <div class="w-full flex flex-col">

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

        <Spinner v-if="loading" class="mx-auto"/>

        <Table v-else>

            <template #thead>
                <TableHead>
                    Username
                </TableHead>

                <TableHead>
                    Email
                </TableHead>

                <TableHead>
                    Role
                </TableHead>

                <TableHead>
                    Status
                </TableHead>

                <TableHead>
                    Actions
                </TableHead>
            </template>

            <template #tbody>

                <TableRow v-for="(user, index) in users" :key="index">
                
                    <TableCell>
                        {{ user.username }}
                    </TableCell>

                    <TableCell>
                        {{ user.email }}
                    </TableCell>

                    <TableCell>
                        {{ user.role }}
                    </TableCell>

                    <TableCell>
                        {{ user.status }}
                    </TableCell>

                    <TableCell>
                        <button 
                        @click="toggleAssignHotel(user._id)"
                        class="px-4 py-1 text-xs font-semibold bg-green-600 text-white rounded-md">
                            Assign Hotel
                        </button>
                    </TableCell>
                    
                </TableRow>

            </template>

        </Table>

        <AssignHotel v-if="showAssignHotel" @close="toggleAssignHotel" :userId="userId" @onClose="closeAssignHotel" @onSubmit="closeAssignHotel"/>

    </div>
    
</template>