<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

onMounted( async () => {
  try {
    await store.dispatch('getAuthUser')
  }
  catch(error) {
    console.log(error)
  }
})

</script>

<template>
  <router-view />
</template>


