<template>
    
<div class="content ml-56 mt-20 p-6 flex flex-col">

    <!-- <div class="w-full flex items-center justify-between mb-4">

        <h4 class="font-semibold text-base text-gray-800">
            Dashboard
        </h4>

        <h4 class="font-normal text-sm text-gray-500">
            dashboard > dashboard
        </h4>

    </div> -->

    <slot></slot>
</div>

</template>


<style scoped>

.content {
  min-width: calc(100% - 14rem);
  min-height: calc(100vh - 5rem);
}

</style>