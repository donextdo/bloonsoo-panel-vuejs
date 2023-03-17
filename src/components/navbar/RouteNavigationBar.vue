<script setup>

const emits = defineEmits(['onEdit', 'onSave'])

const props = defineProps({
    previous: {
        type: [String, Boolean],
        default: false
    },
    current: {
        type: [String, Boolean],
        default: false
    },
    next: {
        type: [String, Boolean],
        default: false
    },
    prevRoute: {
        type: String
    },
    nextRoute: {
        type: String
    },
    editMode: {
        type: Boolean,
        default: false
    }
})

</script>


<template>
    
    <div class="w-full py-3 bg-gray-50 shadow-md px-4 grid grid-cols-3">
        <div 
        class="w-full flex itmes-center justify-start">
            <router-link :to="{name: prevRoute}" 
            v-if="previous && !editMode"
            class="text-gray-600 text-sm font-normal flex items-center gap-1">
                <font-awesome-icon icon="fa-solid fa-arrow-left"/>
                <span>
                    {{ previous }}
                </span>
            </router-link>
        </div>

        <div 
        class="w-full flex itmes-center justify-center">
            <div
            v-if="current"
            class="text-gray-800 text-lg font-bold flex items-center gap-3">
                <span>{{ current }}</span>
                <button v-if="!editMode" @click="() => emits('onEdit')">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-blue-600"/>
                </button>

                <button v-if="editMode" @click="() => emits('onEdit')">
                    <font-awesome-icon icon="fa-solid fa-times" class="text-red-600 text-lg"/>
                </button>

                <button v-if="editMode" @click="() => emits('onSave')" 
                    class="px-4 py-2 bg-blue-700 text-white font-semibold text-sm rounded-lg hover:bg-blue-900">
                    Save
                </button>
            </div>
        </div>

        <div 
        class="w-full flex itmes-center justify-end">
            <router-link :to="{name: nextRoute}" 
            v-if="next && !editMode"
            class="text-gray-600 text-sm font-normal flex items-center gap-1">
                <span>
                    {{ next }}
                </span>
                <font-awesome-icon icon="fa-solid fa-arrow-right"/>
            </router-link>
        </div>
    </div>

</template>