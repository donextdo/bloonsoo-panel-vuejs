<script setup>


</script>

<template>
    
    <nav class="nav h-20 px-4 fixed top-0 right-0 left-0 ml-56 bg-white z-40 shadow-md">
        <slot></slot>
    </nav>

</template>

<style scoped>

.nav {
    min-width: calc(100% - 14rem);
}

</style>