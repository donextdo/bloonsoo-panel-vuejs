<script setup>

const props = defineProps({
    dto: {
        type: Object
    }
})

const emits = defineEmits(['onClick'])

const handleClick = () => {
    emits('onClick', 
        props.dto._id
    )
}

</script>


<template>

    <div class="w-full gap-2 grid grid-cols-12 items-center">

    <div class="w-full bg-gray-200 col-span-4 pl-6 p-4 h-full flex flex-col gap-4">

        <div class="text-base text-blue-700 font-semibold">
            <h4 class="cursor-pointer" @click="handleClick">
                {{ dto.room_type }}
            </h4>

            <h4 class="cursor-pointer" @click="handleClick">
                {{ dto.room_name }}
            </h4>
        </div>

        <div class="flex flex-col gap-2">

            <div v-for="(bed, index) in dto.beds" :key="index" class="flex gap-2 items-center">
                <SharedLogosBed />
                <span class="text-sm font-semibold text-gray-800">
                    {{ bed.no_of_beds }}  {{ bed.bed_type }}
                </span>
            </div>
            <!-- <div class="flex gap-2 items-center">
                <SharedLogosBed />
                <span class="text-sm font-semibold text-gray-800">
                    2 Double beds
                </span>
            </div> -->

        </div>

        <div class="text-sm text-gray-800">
            <p class="text-justify">
                {{ dto.room_size }}
                {{ dto.facilities.join(" ")}}
            </p>
        </div>
        

    </div>

    <div class="w-full bg-gray-200 col-span-1 p-4 h-full flex items-center justify-center">
        
        <div class="flex justify-center flex-wrap gap-2">
            <font-awesome-icon v-for="n in dto.guests" :key="n" icon="fa-solid fa-user" class="text-sm text-gray-800"/>
        </div>

    </div>

    <div class="w-full bg-gray-200 col-span-2 p-6 h-full flex flex-col justify-center gap-4">
        
        <h4 class="text-base text-gray-800 font-semibold">
           {{ dto.price_for_one_night }}
        </h4>

        <p class="text-sm text-gray-600">
            +LKR 179,407 taxes and charges
        </p>

        <p class="text-sm font-semibold text-green-500">
            Limited-time Deal
        </p>

    </div>

    <div class="w-full bg-gray-200 col-span-2 p-6 h-full flex flex-col justify-center gap-4">
        
        <div class="flex items-center gap-3">

            <font-awesome-icon icon="fa-solid fa-coffee" class="text-gray-800 text-lg"/>

            <h4 class="text-base text-gray-800 font-semibold">

                {{ dto.is_breakfast_available ? `Breakfast Available ${dto.breakfast_price}` : 'Breakfast not available' }}
            </h4>

        </div>

        <div class="flex items-center gap-3">

            <font-awesome-icon icon="fa-solid fa-check" class="text-green-500 text-lg"/>

            <h4 class="text-xs text-green-500 font-semibold">
                Free cancellation until 23:59 on 25 November 2022
            </h4>

        </div>

    </div>

    <div class="w-full bg-gray-200 col-span-1 p-6 h-full flex items-center justify-center">
        
        <slot name="rooms"></slot>

    </div>

    <div class="w-full bg-gray-200 col-span-2 p-6 h-full flex items-center flex-col gap-4 justify-center">
        
        <slot name="actions"></slot>

    </div>

    </div>

</template>