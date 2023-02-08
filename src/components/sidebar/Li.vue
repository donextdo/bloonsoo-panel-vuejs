<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const props = defineProps({
  title: {
    type: String
  },
  routeName: {
    type: String
  },
  icon: {
    type: [String, Boolean],
    default: false
  }
})

const highLight = computed(() => {
  if(props.routeName === route.matched[1].name) return true

  return false
})

</script>

<template>
  <li
    :class="highLight ? 'bg-slate-600' : 'bg-slate-900'"
    class="
      py-4
      px-6
      w-full
      text-white
      hover:bg-slate-700
      text-sm
      font-normal
      cursor-pointer
    "
  >

  <router-link :to="{name: routeName}" class="w-full h-full flex items-center gap-3">
    <font-awesome-icon
    v-if="icon"
    :icon="icon" class="text-base w-6"/>

    <span>{{ title }}</span> 
  </router-link>  
  </li>
</template>