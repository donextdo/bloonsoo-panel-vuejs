<script setup>

import { ref, onMounted, inject } from 'vue'
import RouteNavigationBar from '../../../components/navbar/RouteNavigationBar.vue';
import FormCard from '../../../components/shared/FormCard.vue';
import ButtonSpinner from '../../../components/Spinner/ButtonSpinner.vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const store = useStore()
const axios = inject('axios')
const toast = useToast()
const { currentHotel } = store.state

const image = ref(null)
const imageValue = ref('')
const preview = ref('')

const images = ref(null)
const previews = ref([])

const editMode = ref(false)
const loading = ref(false)

const setDefaults = () => {
    preview.value = currentHotel?.cover_image
    image.value = currentHotel?.cover_image
    previews.value = currentHotel?.gallery_images
    images.value = currentHotel?.gallery_images
}

onMounted(() => {
    console.log(currentHotel)
    if(currentHotel) setDefaults()
})

const onChange = async (event) => {
    var input = event.target;
    if (input.files) {

        image.value = input.files[0];

        let formData = new FormData()

        formData.append('cover_img', image.value)

        try {
            const {data} = await axios.patch( `/api/hotel/coverphoto/${currentHotel._id}`, formData, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            } )

            preview.value = data.cover_image
            toast.success('Successfully Updated!', {
                position: 'top-right',
                duration: 5000,
                dismissible: true
            })
        }
        catch (error) {
            console.log(error)
            toast.error('Something went wrong!', {
                position: 'top-right',
                duration: 5000,
                dismissible: true
            })
        }    
    }
    
}

const onMultipleChange = async (event) => {
    var input = event.target;
    if (input.files) {

        images.value = input.files;

        try {
            for(let i = 0; i < images.value.length; i++){
                let formData = new FormData()
                formData.append('gallery_img', images.value[i])

                const {data} = await axios.patch( `/api/hotel/gallery/${currentHotel._id}`, formData, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                } )

                previews.value.push(data)
            }

            toast.success('Successfully Updated!', {
                position: 'top-right',
                duration: 5000,
                dismissible: true
            })
        }
        catch (error) {
            console.log(error)
            toast.error('Something went wrong!', {
                position: 'top-right',
                duration: 5000,
                dismissible: true
            })
        }
        
    }
    
}

const clear = () => {
    image.value = null
}

const clearGallery = async (imglink) => {
    previews.value = previews.value.filter(path => {
        return path !== imglink
    })

    try {
        const {data} = await axios.patch(`/api/hotel/update-hotel/${currentHotel._id}`,
            {
                gallery_images: previews.value
            },
            {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
        })

        await store.dispatch('getCurrentHotel', currentHotel._id)
        toast.success('Successfully Deleted!', {
            position: 'top-right',
            duration: 5000,
            dismissible: true
        })
    }
    catch (error) {
        toast.error('Something went wrong!', {
            position: 'top-right',
            duration: 5000,
            dismissible: true
        })
        console.log(error)
    }
    
}

const toggleEditMode = () => {
    editMode.value = !editMode.value
}

const handleUpdate = () => {
    loading.value = true

    if(!image.value) {
        return toast.error('Please add an image!', {
            position: 'top-right',
            duration: 5000,
            dismissible: true
        })
    }

    if(images.value.length == 0) {
        return toast.error('Please add an image!', {
            position: 'top-right',
            duration: 5000,
            dismissible: true
        })
    }

    setTimeout(() => {
        editMode.value = false
        loading.value = false
    }, 3000)
}

</script>


<template>
    <div class="w-full flex flex-col gap-6">
        <RouteNavigationBar
            previous="Facilities and Amenities"
            prevRoute="facilities"
            current="Images"
            next="Policies"
            nextRoute="policies"
            :editMode="editMode"
            @onEdit="toggleEditMode"
            @onSave="handleUpdate"
        />

        <section class="w-full flex flex-col gap-10">

            <FormCard label="Add Cover photo" >

                <div class="px-4 flex flex-col gap-6">

                    <div class="w-full h-[70vh] border rounded-lg border-slate-500 border-dashed">

                        <div v-show="!image" class="w-full h-full py-24 flex flex-col items-center justify-between">

                            <div class="w-32 h-32">
                                <img src="../../../assets/image.png" class="w-full h-full object-contain" alt="">
                            </div>

                            <p class="text-base text-gray-400 text-center">
                                Upload your cover photo here 
                            </p>

                            <label for="cover-img" class="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer">
                                <font-awesome-icon icon="fa-solid fa-camera" class="text-blue-500 text-base "/>
                                Upload photo
                            </label>

                            <input class="hidden" id="cover-img" type="file" @change="onChange" accept="image/*" ref="imageValue">

                        </div>

                        <div v-show="image" class="relative w-full h-full bg-slate-300">
                            <img :src="preview" loading="lazy" class="w-full h-full object-contain" alt="">

                            <button v-if="editMode" @click="clear" class="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2">
                                <font-awesome-icon icon="fa-solid fa-trash" class="text-white text-sm "/>
                            </button>
                        </div>

                    </div>

                </div>

            </FormCard>

            <FormCard label="What does your place look like?" >

                <div class="px-4 flex flex-col gap-6">

                    <div class="w-full border rounded-lg border-slate-500 border-dashed">

                        <div v-show="!images" class="w-full h-full py-24 flex flex-col items-center gap-8">

                            <div class="w-32 h-32">
                                <img src="../../../assets/image.png" class="w-full h-full object-contain" alt="">
                            </div>

                            <p class="text-base text-gray-400 text-center">
                                Upload your gallery photos here 
                            </p>

                            <label for="gallery-img" class="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer">
                                <font-awesome-icon icon="fa-solid fa-camera" class="text-blue-500 text-base "/>
                                Upload photo
                            </label>

                            <input class="hidden" id="gallery-img" type="file" multiple @change="onMultipleChange" accept="image/*">

                        </div>

                        <div v-show="images" class="w-full grid grid-cols-4 bg-slate-300">

                            <div v-for="(preview, index) in previews" :key="index" class="w-full aspect-square relative">
                                <img :src="preview" loading="lazy" class="w-full h-full object-cover" alt="">

                                <button v-if="editMode" @click="clearGallery(preview)" class="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2">
                                    <font-awesome-icon icon="fa-solid fa-trash" class="text-white text-sm "/>
                                </button>
                            </div>

                            <div class="w-full aspect-square grid place-items-center">

                                <label v-if="editMode" for="gallery-img" class="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer">
                                    <font-awesome-icon icon="fa-solid fa-camera" class="text-blue-500 text-base "/>
                                    Add more
                                </label>

                                <input class="hidden" id="gallery-img" type="file" multiple @change="onMultipleChange" accept="image/*">

                            </div>
                        
                            
                        </div>

                    </div>

                </div>

            </FormCard>

            <button
                v-if="editMode"
                @click="handleUpdate"
                class="w-full py-4 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900"
            >
                <ButtonSpinner v-if="loading"/>
                <span v-else>Save</span>
            </button>

        </section>
    </div>
</template>