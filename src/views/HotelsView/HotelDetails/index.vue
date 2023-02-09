<script setup>

import { onMounted, ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const axios = inject('axios')

// onMounted( async () => {
//     const id = route.params.id

//     try {
//         // const { data } = await axios.get(`/api/hotel/${id}`)

//         // console.log(data)
//         // store.commit('setCurrentHotel', data)

//         // await store.dispatch('getCurrentHotel', id)

//         // console.log(store.state.currentHotel._id)
//     }
//     catch (error) {
//         console.log(error)
//     }
// })

</script>

<template>
    
    <router-view></router-view>

</template>