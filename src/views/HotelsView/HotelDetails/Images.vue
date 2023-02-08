<script setup>

import { ref } from 'vue'
import RouteNavigationBar from '../../../components/navbar/RouteNavigationBar.vue';
import FormCard from '../../../components/shared/FormCard.vue';

const image = ref(null)
const imageValue = ref('')
const preview = ref('')

const images = ref(null)
const previews = ref([])

// const onChange = async (event) => {
//     var input = event.target;
//     if (input.files) {

//         image.value = input.files[0];

//         let formData = new FormData()

//         formData.append('cover_img', image.value)

//         const hotel = await $fetch( `${baseUrl}/api/hotel/coverphoto/${hotelId.value}`, {
//             method: 'PATCH',
//             body: formData,
//             headers: {
//                 authorization: `Bearer ${token}`
//             }
//         } )

//         console.log(hotel)

//         preview.value = hotel.cover_image
        
//     }
    
// }

// const onMultipleChange = async (event) => {
//     var input = event.target;
//     if (input.files) {

//         images.value = input.files;

//         console.log(images.value.length)

//         for(let i = 0; i < images.value.length; i++){
//             let formData = new FormData()
//             formData.append('gallery_img', images.value[i])

//             const path = await $fetch( `${baseUrl}/api/hotel/gallery/${hotelId.value}`, {
//                 method: 'PATCH',
//                 body: formData,
//                 headers: {
//                     authorization: `Bearer ${token}`
//                 }
//             } )

//             console.log(path)
//             previews.value.push(path)
//         }
        
//     }
    
// }

const clear = () => {
    image.value = null
}

const clearGallery = (imglink) => {
    previews.value = previews.value.filter(path => {
        return path !== imglink
    })
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
        />

        <section class="w-full flex flex-col gap-10">

            <FormCard label="Add Cover photo" >

                <div class="px-4 flex flex-col gap-6">

                    <div class="w-full h-70vh border rounded-lg border-slate-500 border-dashed">

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

                            <button @click="clear" class="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2">
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

                                <button @click="clearGallery(preview)" class="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2">
                                    <font-awesome-icon icon="fa-solid fa-trash" class="text-white text-sm "/>
                                </button>
                            </div>

                            <div class="w-full aspect-square grid place-items-center">

                                <label for="gallery-img" class="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer">
                                    <font-awesome-icon icon="fa-solid fa-camera" class="text-blue-500 text-base "/>
                                    Add more
                                </label>

                                <input class="hidden" id="gallery-img" type="file" multiple @change="onMultipleChange" accept="image/*">

                            </div>
                        
                            
                        </div>

                    </div>

                </div>

            </FormCard>

        </section>
    </div>
</template>