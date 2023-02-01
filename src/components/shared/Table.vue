<script setup>

defineProps({
    headers: {
        type: Array
    },
    bookings: {
        type: Boolean,
        default: false
    },
    total: {
        type: String,
        default: 'LKR 000000'
    }
})

const emits = defineEmits(['onResAllClick'])

const handleResAllClick = () => {
    emits('onResAllClick')
}

</script>


<template>
    
    <div class="w-full flex flex-col gap-3">

        <div class="w-full bg-blue-700 gap-2 grid grid-cols-12 items-center text-white text-base font-semibold">

            <div class="w-full col-span-4 px-6 h-24 flex items-center">
                <h3>
                    {{ headers[0] ? headers[0] : ''}}
                </h3>
            </div>

            <div class="w-full col-span-1 px-6 h-24 flex items-center">
                <h3>
                    {{ headers[1] ? headers[1] : ''}}
                </h3>
            </div>

            <div class="w-full col-span-2 px-6 h-24 flex items-center">
                <h3>
                    {{ headers[2] ? headers[2] : ''}}
                </h3>
            </div>

            <div class="w-full col-span-2 px-6 h-24 flex items-center">
                <h3>
                    {{ headers[3] ? headers[3] : ''}}
                </h3>
            </div>

            <div class="w-full col-span-1 px-6 h-24 flex items-center">
                <h3>
                    {{ headers[4] ? headers[4] : ''}}
                </h3>
            </div>

            <div 
            :class="bookings && 'bg-green-700'"
            class="w-full col-span-2 px-6 h-24 flex items-center relative">
                <div v-if="bookings" class="w-2 bg-gray-100 h-24 absolute top-0 bottom-0 -left-2"></div>

                <h3 v-if="!bookings">
                    {{ headers[5] ? headers[5] : ''}}
                </h3>

                <div v-if="bookings" class="flex flex-col items-center gap-3 mx-auto">
                    <h3 class="text-sm">
                        TOTAL: {{ total }}
                    </h3>

                    <button
                    @click="handleResAllClick"
                    class="px-6 py-1 gradient-btn rounded-full">
                        Reserve All
                    </button>
                </div>
            </div>

        </div>

        <slot></slot>
        <!-- <SharedRow v-for="dto in payload" :key="dto._id" :dto="dto"/> -->

    </div>

</template>