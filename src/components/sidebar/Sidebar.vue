<script setup>
</script>


<template>
  <div class="fixed left-0 top-0 bottom-0 h-screen w-56 bg-slate-900 flex flex-col gap-10 text-white">
    
    <div class="w-full h-20 border-b border-slate-700 flex items-center pl-4">
      <slot name="logo"></slot>
    </div>

    <ul class="w-full h-max flex flex-col gap-2">
      <slot name="links"></slot>
    </ul>

    <div class="w-full h-max flex flex-col px-4 self-baseline">
      <slot name="buttons"></slot>
    </div>
    
  </div>
</template>