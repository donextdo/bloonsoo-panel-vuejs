<script setup>

import { ref } from 'vue'

import "../../assets/css/phoneNumberInput.css";
import FormCard from "../shared/FormCard.vue";
import TextInput from "../shared/TextInput.vue";
import DropDown from "../shared/DropDown.vue";
import RadioGroup from "../shared/RadioGroup.vue";
import Row from "../shared/Row.vue";
import Table from "../shared/Table.vue";
import CheckboxGroup from "../shared/CheckboxGroup.vue";

const facilitiesData = 
ref([ 
{label:'Non-smoking rooms'},{label:'Restaurant'},{label:'Free WiFi'},{label:'Airport shuttle'},{label:'Hot tub'},{label:'Water park'},
{label:'Non-smoking rooms'},{label:'Restaurant'},{label:'Free WiFi'},{label:'Airport shuttle'},{label:'Hot tub'},{label:'Water park'},
{label:'Non-smoking rooms'},{label:'Restaurant'},{label:'Free WiFi'},{label:'Airport shuttle'},{label:'Hot tub'},{label:'Water park'},
{label:'Non-smoking rooms'},{label:'Restaurant'},{label:'Free WiFi'},{label:'Airport shuttle'},{label:'Hot tub'},{label:'Water park'}
]);

const amenitiesData = ref([
    {label: 'A/C'}, {label: 'Spa bath'}, {label: 'Bath'}, {label: 'Flat-screen TV'},{label: 'Electric kettle'},{label: 'Balcony'},
    {label: 'A/C'}, {label: 'Spa bath'}, {label: 'Bath'}, {label: 'Flat-screen TV'},{label: 'Electric kettle'},{label: 'Balcony'},
    {label: 'A/C'}, {label: 'Spa bath'}, {label: 'Bath'}, {label: 'Flat-screen TV'},{label: 'Electric kettle'},{label: 'Balcony'},
    {label: 'A/C'}, {label: 'Spa bath'}, {label: 'Bath'}, {label: 'Flat-screen TV'},{label: 'Electric kettle'},{label: 'Balcony'}]);

</script>

<template>
  <section class="text-black font-montserrat md:container mx-auto px-2 flex flex-col gap-14 py-6">

    <!--   Basic Info   -->

    <FormCard label="Name and Ratings">

        <div class="grid grid-cols-2 gap-x-8 gap-y-2 px-4">

            <TextInput label="Name of your Property" v-model="propertyName" :error="propertyNameError" errorMessage="Property name cannot be empty" />

            <DropDown label="Star Rating" v-model="startRating" slot>
            
                <option value="N/A" 
                class="text-sm font-semibold text-gray-500 appearance-none">
                    N/A
                </option>

                <option value="1" 
                class="text-sm font-semibold text-gray-500 flex gap-2 items-center appearance-none">                       
                    1 &starf;
                </option>

                <option value="2" 
                class="text-sm font-semibold text-gray-500 flex gap-2 items-center appearance-none">                       
                    2 &starf;&starf;
                </option>

                <option value="3" 
                class="text-sm font-semibold text-gray-500 flex gap-2 items-center appearance-none">                       
                    3 &starf;&starf;&starf;
                </option>

                <option value="4" 
                class="text-sm font-semibold text-gray-500 flex gap-2 items-center appearance-none">                       
                    4 &starf;&starf;&starf;&starf;
                </option>

                <option value="5" 
                class="text-sm font-semibold text-gray-500 flex gap-2 items-center appearance-none">                       
                    5 &starf;&starf;&starf;&starf;&starf;
                </option>

                <option value="6" 
                class="text-sm font-semibold text-gray-500 flex gap-2 items-center appearance-none">                       
                    6 &starf;&starf;&starf;&starf;&starf;&starf;
                </option>

                <option value="7" 
                class="text-sm font-semibold text-gray-500 flex gap-2 items-center appearance-none">                       
                    7 &starf;&starf;&starf;&starf;&starf;&starf;&starf;
                </option>
            
            </DropDown>

            <p class="text-sm text-gray-500">
                This name will be seen to guests
            </p>

        </div>

    </FormCard>

    <FormCard label="Contact Details">

      <div class="grid grid-cols-2 gap-x-8 gap-y-6 px-4">

          <TextInput label="Contact name" v-model="contactName" :error="contactNameError" errorMessage="Contact name cannot be empty" />

          <div class="flex flex-col gap-2 items-start col-start-1">

              <label :class="phoneNumberError ? 'text-red-600' : 'text-gray-600' " class="text-sm font-semibold">Phone Number</label>


              
              <MazPhoneNumberInput
                  v-model="phoneNumber"
                  show-code-on-list
                  :preferred-countries="['LK', 'FR', 'BE', 'DE', 'US', 'GB']"
                  no-example size="sm"
                  @update="phoneNumberRes = $event"
                  :success="phoneNumberRes?.isValid"
              />
             

              <small v-if="phoneNumberError" class="text-xs text-red-600">
                  Please enter a mobile number
              </small>

          </div>

          <div class="flex flex-col gap-2 items-start col-start-2">

              <label class="text-gray-600 text-sm font-semibold">Alternative Phone Number</label>


              <ClientOnly>
              <MazPhoneNumberInput
                  v-model="phoneNumberAlt"
                  show-code-on-list
                  :preferred-countries="['LK', 'FR', 'BE', 'DE', 'US', 'GB']"
                  no-example size="sm"
                  @update="phoneNumberAltRes = $event"
                  :success="phoneNumberAltRes?.isValid"
              />
              </ClientOnly>

          </div>

          <RadioGroup 
          title="Do you own multiple hotels, or are you a part of a property management company?"
          class="col-span-2" 
          v-model="ownMultipleHotels" 
          :options="[{data: 'yes', label: 'yes'}, {data: 'no', label: 'no'}]"
          :error="ownMultipleHotelsError"
          name="group1"
          errorMessage="Please select an option"
          />

      </div>

    </FormCard>
      
    <FormCard label="Do you use a channel manager?">

        <div class="px-4">
            <p class="text-sm text-gray-600 font-semibold mb-4 text-justify">
                A channel manager is a tool that lets you choose what you sell across all the different sites you might list your place on. You can then set your prices and open and close dates in your calendar on all of these sites in one place. 
                <br> <br>
                If you use a channel manager, tell us below. Well use this information to help you connect it to Bloonsoo.com in the future. It also helps if you tell us the brand name of your channel manager. 
            </p>

            <RadioGroup 
            v-model="channelManager" 
            :options="[{data: 'yes', label: 'yes'}, {data: 'no', label: 'no'}]"
            :error="channelManagerError"
            name="group2"
            errorMessage="Please select an option"/>
        </div>

    </FormCard>

    <FormCard label="Where is your property located?">

        <div class="px-4 flex flex-col gap-6">
            <p class="text-sm text-gray-600 font-semibold mb-4 text-justify">
                Please make sure you enter the full address of your property, including your building name, number, etc. Based on the information you provide, we might send a letter to verify this address,
            </p>

            <div class="w-full grid grid-cols-2 gap-6">

                <TextInput 
                label="Street Address" 
                v-model="streetAddress" :error="streetAddressError" errorMessage="Please enter street address" 
                class="col-start-1" />

                <DropDown 
                label="Country/Region" 
                v-model="country" :error="countryError" errorMessage="Please select a country" 
                :options="['Sri Lanka', 'Australia', 'India']" 
                class="col-start-1" />

                <TextInput 
                label="Post Code" 
                v-model="postalCode" :error="postalCodeError" errorMessage="please enter post code" 
                class="col-start-1" />

                <div class="flex flex-col gap-2 items-start row-span-3 col-start-2 row-start-1">

                    <h4 class="text-sm font-semibold text-gray-600">
                        Select Your Location (Move the pin)
                    </h4>

                    <img src="../../assets/map/map.jpg" class="w-full h-full object-cover" alt="">

                </div>

            </div>
        </div>

    </FormCard>


    <!--   Listing and Pricing   -->

    <Table :headers="[
                'Room Type',
                'Sleeps',
                'Price for one night',
                'Your Choices',
                'Rooms',
                'Actions'
            ]"> 
            
                <Row v-for="dto in rooms" :key="dto._id" :dto="dto">
                
                    <template v-slot:rooms>
                        <h4 class="text-base text-gray-800 font-semibold">
                            {{ dto.nbr_of_rooms }}
                        </h4>
                    </template>

                    <template v-slot:actions>

                        <button class="w-8 h-8 rounded-full bg-blue-500">
                            <font-awesome-icon icon="fa-solid fa-pen-square" class="text-white text-base"/>
                        </button>

                        <button class="w-8 h-8 rounded-full bg-red-500">
                            <font-awesome-icon icon="fa-solid fa-trash" class="text-white text-base"/>
                        </button>

                    </template>

                </Row>
                <button class="py-3 px-10 w-max rounded-lg text-sm text-white font-semibold cursor-pointer bg-blue-700 hover:bg-blue-900  justify-center">
                            Add Room
                        </button>
    </Table>

    <FormCard label="Please select " >

        <div class="grid grid-cols-2 gap-x-8 gap-y-6 px-4">

            <DropDown 
                label="Room Type" 
                v-model="roomType" 
                :error="roomTypeError"
                errorMessage="Please select room type" 
                :selected-option="{value: '0', label: 'Please select'}"
                :options="[
                    'Single Room', 
                    'Double Room', 
                    'Twin Room',
                    'Twin/double Room',
                    'Triple Room',
                    'Quadruple Room',
                    'Family Room',
                    'Suite Room',
                    'Apartment Room',
                    'Dormitory room',
                    'Bed in dormitor'
                ]" />


            <TextInput 
                label="Room Name" 
                v-model="roomName" 
                :error="roomNameError"
                errorMessage="please enter room name" />

            <DropDown 
                label="Smoking policy " 
                v-model="smokingPolicy" errorMessage="please enter country" 
                :options="['Non-smoking', 'Smoking', 'Both options']" />

            <TextInput 
                label="Number of rooms (of this type) " 
                v-model="nbrOfRooms" 
                :error="nbrOfRoomsError"
                errorMessage="Please enter numbr rooms" 
                type="number" />

        </div>   

    </FormCard>

    <FormCard label="Bed options" >

        <div class="flex flex-col gap-y-6 px-4">

            <h4 class="text-sm font-semibold text-gray-600">
                Tell us only about the existing beds in a room. Do not include extra beds. 
            </h4>

            <div class="flex flex-col gap-2">

                <h4 :class="bedsError ? 'text-red-500': 'text-gray-600'" class="text-sm font-semibold">
                    What kind of beds are available in this room? 
                </h4>

                <div  v-for="(bed, index) in beds" :key="index" class="grid grid-cols-12 gap-x-8 items-end">

                    <DropDown 
                    class="col-span-6"
                    v-model="bed.bed_type"
                    :options="[
                        'Single bed / 90-130 cm wide', 
                        'Double bed / 90-130 cm wide', 
                        'Large bed (king size) / 151-180 cm wide', 
                        'Extra-large double bed (Super-king size) / 181-210 cm wide',
                        'Bunk bed / variable Size',
                        'Sofa bed / variable Size',
                        'Futon Mat / variable Size'
                    ]" />

                    <DropDown 
                    class="col-span-4"
                    v-model="bed.no_of_beds" 
                    :options="['1', '2', '3', '4', '5']" />

                    <button 
                    @click="removeBed(bed.bed_type)"
                    class="w-full h-9 col-span-2 bg-red-500 text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-red-700">

                        <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-white text-base "/>
                        <span>Remove</span>

                    </button>

                </div>

                <div  class="grid grid-cols-12 gap-x-8 items-end">

                    <DropDown 
                    class="col-span-6"
                    v-model="bedType"
                    :error="bedTypeError"
                    errorMessage="Please select bed type" 
                    :selected-option="{value: '0', label: 'Please select a bed type'}"
                    :options="[
                        'Single bed / 90-130 cm wide', 
                        'Double bed / 90-130 cm wide', 
                        'Large bed (king size) / 151-180 cm wide', 
                        'Extra-large double bed (Super-king size) / 181-210 cm wide',
                        'Bunk bed / variable Size',
                        'Sofa bed / variable Size',
                        'Futon Mat / variable Size'
                    ]" />

                    <DropDown 
                    class="col-span-4"
                    v-model="noOfBeds" 
                    :error="noOfBedsError"
                    errorMessage="please enter number of beds" 
                    :selected-option="{value: '0', label: 'Select the number of beds'}"
                    :options="['1', '2', '3', '4', '5']" />

                    <button 
                    @click="addBed" 
                    class="w-full h-9 col-span-2 bg-blue-500 text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-blue-700">

                         <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-white text-base "/>
                        <span>Add</span>

                    </button>

                </div>

                <small v-if="bedsError" class="text-xs text-red-600">
                    Please add room(s)
                </small>



            </div>

            <div class="grid grid-cols-2 gap-x-8 items-end">

                <DropDown 
                label="How many guests can stay in this room? " 
                v-model="guests" errorMessage="please enter country" 
                :options="['1', '2', '3', '4', '5', '6', '7', '8']" />

                <!-- <SharedDropDown 
                v-model="noOfBeds" errorMessage="please enter country" 
                :options="['Select the number of beds', '1', '2', '3']" /> -->

            </div>

        </div>       

    </FormCard>

    <FormCard label="Breakfast">

        <div class="px-4 w-full grid grid-cols-2 gap-x-8">

            <RadioGroup 
            title="Do you provide breakfast ?"
            v-model="breakfastOption"
            :options="[{data: 'yes', label: 'yes'}, {data: 'no', label: 'no'}]
            "/>


            <div v-if="breakfastOption === 'yes'" class="flex flex-col gap-2 w-full">

                <label :class="priceError ? 'text-red-600' : 'text-gray-600'" class="text-sm font-semibold">
                    Price for Breakfast
                </label>

                <div class="w-full grid grid-cols-6 items-start">

                    <DropDown 
                    v-model="breakfastPriceUnit" errorMessage="please enter price unit" 
                    :options="['USD', 'LKR', 'AUD']" />

                    <TextInput 
                    v-model="breakfastPrice" 
                    errorMessage="please enter a price" 
                    type="number" class="col-span-3" />

                </div>

            </div>

        </div>

    </FormCard>

    <FormCard label="Room Size (Optional)">

        <div class="grid grid-cols-2 gap-x-8 px-4">

            <div class="w-full grid grid-cols-3 items-end">
                <TextInput 
                label="How big is the room?" 
                v-model="roomSize"
                type="number" class="col-span-2" />

                <DropDown 
                v-model="roomSizeUnit"
                :options="['Square meter', 'Squeare feet']" />
            </div>

        </div>

    </FormCard>

    <FormCard label="Base price per night">

        <div class="flex flex-col gap-y-6 px-4">

            <p class="text-sm font-semibold text-gray-600">
                This is the lowest price that we automatically apply to this room for all dates. Before your property goes live, you can set seasonal pricing in your property dashboard.  
            </p>

            <div class="grid grid-cols-2 gap-x-8">

                <div class="flex flex-col gap-2 w-full">

                    <label :class="priceError ? 'text-red-600' : 'text-gray-600'" class="text-sm font-semibold">
                        Price for 1 person ( 1 night)
                    </label>

                    <div class="w-full grid grid-cols-3 items-start">

                        <DropDown 
                        v-model="priceUnit" errorMessage="please enter country" 
                        :options="['USD', 'LKR', 'AUD']" />

                        <TextInput 
                        v-model="price" 
                        :error="priceError"
                        errorMessage="please enter a price" 
                        type="number" class="col-span-2" />

                    </div>

                </div>

            </div>

        </div>

    </FormCard>

    <FormCard label="Facilities that are popular with guests ">

        <div class="px-4">

            <CheckboxGroup
            v-model="facilities"
            row_6
            :error="facilitiesError"
            error-message="Please select facilities"
            
            :options="facilitiesData"
            />

        </div>

    </FormCard>

    <FormCard label="What does your room look like?" >

        <div class="px-4 flex flex-col gap-6">

            <h4 class="text-sm font-semibold text-gray-600">
                Add at least 3 photos now. You can always add more later.
            </h4>

            <div class="w-full border rounded-lg border-slate-500 border-dashed">

                <div v-show="!images" class="w-full h-full py-24 flex flex-col items-center gap-8">

                    <div class="w-32 h-32">
                        <img src="../../assets/icons/image.png" class="w-full h-full object-contain" alt="">
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

                    <div v-for="(preview, index) in galleryImages" :key="index" class="w-full aspect-square relative">
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


    <!--  Facilities  -->


    <FormCard label="Parking" >

        <div class="grid grid-cols-2 gap-x-8 gap-y-6 px-4 items-end">

            <DropDown 
                label="Is parking available to the guests?" 
                v-model="parkingType" 
                :options="[{value: 'paid', label: 'Yes, paid'}, {value: 'free', label: 'Yes, free'}, {value: 'no', label: 'No'}]" />

            <DropDown 
                v-if="(parkingType == 'paid' || parkingType == 'free')"
                v-model="parkingType2" 
                :options="['Public', 'Private']" />

            <DropDown 
                v-if="(parkingType == 'paid' || parkingType == 'free')"
                v-model="parkingType3"
                :options="['On site', 'Off site']" />

            <DropDown 
                v-if="(parkingType == 'paid' || parkingType == 'free')"
                label="Do guests need to reserve a parking space ?" 
                v-model="reservation" 
                :options="[{value: 'no', label: 'No reservation needed'}, {value: 'yes', label: 'Yes, reservation needed'}]" />

            <div 
            v-if="parkingType == 'paid'"
            class="flex flex-col gap-2 w-full">

                <label :class="parkingPriceError ? 'text-red-600' : 'text-gray-600'" class="text-sm font-semibold">
                    Price for parking (per day)
                </label>

                <div class="w-full grid grid-cols-3 items-end">

                    <DropDown 
                    v-model="priceUnit"
                    :options="['USD', 'LKR', 'AUD']" />

                    <TextInput 
                    v-model="parkingPrice" 
                    type="number" class="col-span-2" />

                </div>

            </div>

        </div>   

    </FormCard>

    <div class="flex gap-6">

      <FormCard label="Breakfast" >

            <div class="px-4">

                <RadioGroup 
                title="Do you serve Breakfast ?"
                v-model="breakpastOption" 
                vertical
                name="breakfastOpt"
                :error="breakpastOptionError"
                error-message="Please select an option"
                :options="[{data: 'yes', label: 'yes'}, {data: 'no', label: 'no'}]
                "/>

            </div>

      </FormCard>

      <FormCard label="Languages spoken" >

            <div class="px-4 flex flex-col gap-6">

                <CheckboxGroup
                title="What languages do you or your staff speak ?"
                v-model="languages"
                :options="[
                    {data: 'English', label: 'English'}, 
                    {data: 'Sinhala', label: 'Sinhala'}, 
                    {data: 'Tamil', label: 'Tamil'}, 
                    {data: 'French', label: 'French'}]"
                    />

                <button class="w-max text-blue-500 font-semibold text-xs">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-blue-500 text-base "/>
                    Add More 
                </button>

            </div>

      </FormCard>
    </div>

    <FormCard label="Facilities that are popular with guests ">

        <div class="px-4">

            <CheckboxGroup
            v-model="facilities"
            row_6
            :error="facilitiesError"
            error-message="Please select facilities"
            :options="facilitiesData"
            />

        </div>

    </FormCard>

    <FormCard label="Extra bed options">

        <div class="px-4 flex flex-col gap-6">

            <RadioGroup 
            title="Do you provide extra beds ?"
            v-model="extraBedOpt" 
            :options="[{data: 'yes', label: 'yes'}, {data: 'no', label: 'no'}]
            "/>

            <div v-if="extraBedOpt === 'yes'" class="w-full grid grid-cols-2 gap-x-8">

                <DropDown 
                label="Select the number of extra beds that can be provided" 
                v-model="noOfBeds" errorMessage="please enter country" 
                :options="['1', '2', '3']" />

            </div>

            <div v-if="extraBedOpt === 'yes'" class="w-full flex flex-col gap-4">

                <h4 class="text-gray-600 text-sm font-semibold">
                    Tick the box if you can accommodate the following guests in extra beds
                </h4>

                <div class="flex gap-2 items-center">
                    <input
                    type="checkbox"
                    v-model="accommodateGuests"
                    id="box-1"
                    value="Children up to 2 years old in cots"
                    class="w-3 h-3 cursor-pointer"
                    /> 

                    <label for="box-1" class="text-gray-600 text-sm h-max w-max font-semibold"> Children up to 2 years old in cots </label>
                </div>

                <div class="flex gap-2 items-center">
                    <input
                    type="checkbox"
                    v-model="accommodateGuests"
                    id="box-2"
                    value="Children"
                    class="w-3 h-3 cursor-pointer"
                    /> 

                    <label for="box-2" class="text-gray-600 text-sm h-max w-max font-semibold"> Children</label>
                </div>

                <div class="flex gap-2 items-center">
                    <input
                    type="checkbox"
                    v-model="accommodateGuests"
                    id="box-3"
                    value="Adults"
                    class="w-3 h-3 cursor-pointer"
                    /> 

                    <label for="box-3" class="text-gray-600 text-sm h-max w-max font-semibold"> Adults</label>
                </div>

            </div>

        </div>

    </FormCard>

    <FormCard label="Amenities">

        <div class="px-4">

            <CheckboxGroup
            v-model="amenities"
            row_6
            :error="amenitiesError"
            error-message="Please choose amenities"
            :options="amenitiesData"
            />

        </div>

    </FormCard>


    <!--  Images  -->


    <FormCard label="Add Cover photo" >

        <div class="px-4 flex flex-col gap-6">

            <h4 class="text-sm font-semibold text-gray-600">
                Add at least cover photo now. You can always add more later.
            </h4>

            <div class="w-full h-70vh border rounded-lg border-slate-500 border-dashed">

                <div v-show="!image" class="w-full h-full py-24 flex flex-col items-center justify-between">

                    <div class="w-32 h-32">
                        <img src="../../assets/icons/image.png" class="w-full h-full object-contain" alt="">
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

            <h4 class="text-sm font-semibold text-gray-600">
                Add at least 3 photos now. You can always add more later.
            </h4>

            <div class="w-full border rounded-lg border-slate-500 border-dashed">

                <div v-show="!images" class="w-full h-full py-24 flex flex-col items-center gap-8">

                    <div class="w-32 h-32">
                        <img src="../../assets/icons/image.png" class="w-full h-full object-contain" alt="">
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


    <!-- Policies -->


    <FormCard label="Cancellations">
      <div class="grid grid-cols-2 gap-x-8 gap-y-6 px-4">
        <DropDown
          label="How many days in advance can guests cancel free of charge?"
          v-model="cancellationDuration"
          errorMessage="Please select a days"
          :options="[1, 2, 3, 4, 5, 6, 7, 8]"
        />

        <DropDown
          class="pl-3"
          label="Or guests will pay 100%"
          v-model="payTime"
          :options="['Of the first night', 'Of the full stay']"
        />
      </div>

      <div class="flex flex-col gap-2 px-4">
        <p class="text-sm font-semibold text-gray-600">
          The guest must cancel by 18:00 on the day of arrival or pay 100% of
          the price for the fit st night.
        </p>
        <p class="text-sm font-semibold text-gray-500">
          Please note. You'll be able to make changes to your policies later on.
          this is just to get you started.
        </p>
      </div>
    </FormCard>

    <FormCard label="Protect against accidental bookings">
      <div class="grid grid-cols-2 gap-x-8 gap-y-6 px-4">
        <div class="flex items-center gap-4">

          <span class="text-sm font-semibold text-gray-600">Yes</span>

          <label class="relative cursor-pointer ml-5">

            <input type="checkbox" v-model="preventAccidentalBookings" class="sr-only peer" />

            <div
              class="w-11 h-6 bg-gray-400 focus:outline-none peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>

          </label>
        </div>
      </div>

      <div class="px-4">
        <p class="text-sm text-gray-600 font-semibold">
          To save your time handling accidental bookings, we automatically wave
          the cancellation fees for the guests who cancel the booking
          <br />
          within the first 2 hours after made the booking. You can change this
          period of time later in your property management platform.
        </p>
      </div>
    </FormCard>

    <div class="grid md:grid-cols-2 gap-6">
      <FormCard label="Check in">
        <div class="px-4 flex flex-col gap-6">
          <DropDown
            label="From"
            v-model="checkInForm"
            errorMessage="Please select a time"
            :options="['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']"
          />

          <DropDown
            label="Untill"
            v-model="checkInUntill"
            errorMessage="Please select a time"
            :options="['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']"
          />
        </div>
      </FormCard>

      <FormCard label="Check out">
        <div class="px-4 flex flex-col gap-6">
          <DropDown
            label="From"
            v-model="checkOutForm"
            errorMessage="Please select a time"
            :options="['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']"
          />

          <DropDown
            label="Untill"
            v-model="checkOutUntill"
            errorMessage="Please select a time"
            :options="['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']"
          />
  
        </div>
      </FormCard>
    </div>

    <FormCard label="Children and Pets">
      <div class="px-4">
        <RadioGroup
          title="Children Can you accommodate children? (You can specify the ages and
          prices later)"
          :options="[
            { data: 'yes', label: 'yes' },
            { data: 'no', label: 'no' },
          ]"
          name="children"
          v-model="accommodateChildren"
          :error="accommodateChildrenError"
          errorMessage="Please select an option"
        />

        <DropDown
          class="pt-7 w-1/2"
          label="Pets"
          v-model="pets"
          errorMessage="Please select a option"
          :options="['yes', 'no']"
        />
      </div>
    </FormCard>


    <!--  Payments  -->


    <FormCard label="Guest payment options">
      <div class="px-4 flex flex-col gap-6">
        <RadioGroup
          title="Can you charge credit cards at the property?"
          :options="[
            { data: 'yes', label: 'yes' },
            { data: 'no', label: 'no' },
          ]"
          name="group3"
          errorMessage="Please select an option"
          v-model="creditCardOption"
          :error="creditCardOptionError"
        />

        <div class="flex flex-col gap-2">
          <p class="text-base font-semibold text-gray-600">
            How do guests book and how do they pay?
          </p>
          <p class="text-sm font-semibold text-gray-600">
            To initially secure a reservation we allow guests In use all major
            credit cards, However. when it comes to collecting payment, you can
            specify the
            <br />
            payment methods you accept at your property.
          </p>
        </div>
      </div>
    </FormCard>
    
    <div class="bg-gray-100 rounded-md w-full flex flex-col gap-6 py-8 px-6 font-montserrat">
      <div class="grid md:grid-cols-2">
        <h4 class="text-lg text-gray-600 font-semibold">Commission payments</h4>
        <p class="text-end text-md text-gray-600 font-semibold">
          Commission percentage :<span class="text-lg text-black block"
            >15%</span
          >
        </p>
      </div>

      <div class="grid gap-6 pl-3 md:grid-cols-2">
        <div class="flex flex-col gap-6">
          <DropDown
            class="w-11/12"
            label="What name should be placed on the invoice (e.g. legal/company name)?"
           
            errorMessage="please enter"
            :options="['John', 'John']"
          />

          <RadioGroup
            title="Does this recipient have the same address as your property?"
            :options="[
              { data: 'yes', label: 'yes' },
              { data: 'no', label: 'no' },
            ]"
            name="group4"
            errorMessage="Please select an option"
          />
        </div>

        <div class="flex flex-col gap-6">
          <h4 class="font-semibold text-base text-gray-600">
            How your commission works for you
          </h4>

          <div class="flex flex-col gap-4 text-sm font-normal">
            <div class="flex items-center gap-2">
              <font-awesome-icon
                icon="fa-circle-check"
                class="text-green-700 text-md"
              />
              <p>No hidden fees—one flat commission rate</p>
            </div>

            <div class="flex items-center gap-2">
              <font-awesome-icon
                icon="fa-circle-check"
                class="text-green-700 text-md"
              />
              <p>Pay only for bookings that stay</p>
            </div>

            <div class="flex items-center gap-2">
              <font-awesome-icon
                icon="fa-circle-check"
                class="text-green-700 text-md"
              />

              <p>24/7 personal support by phone or e-mail</p>
            </div>

            <div class="flex items-center gap-2">
              <font-awesome-icon
                icon="fa-circle-check"
                class="text-green-700 text-md"
              />
              <p>Strong search engine presence for more bookings</p>
            </div>

            <div class="flex items-center gap-2">
              <font-awesome-icon
                icon="fa-circle-check"
                class="text-green-700 text-md"
              />
              <p>Property advice and analytics to increase performance</p>
            </div>

            <div class="flex items-center gap-2">
              <font-awesome-icon
                icon="fa-circle-check"
                class="text-green-700 text-md"
              />
              <p>Instant confirmations to save you time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <FormCard label="Your availability to guests">

      <div class="px-4">
        <p class="py-4 text-base font-semibold text-gray-600">
          When is the first date that guests can check in?
        </p>
        <p class="text-sm text-justify">
          To help you start earning, we automatically make your property open
          for bookings for the next 18 months. If you would like to make changes
          to your availability before opening, you can choose 'complete
          registration and open later'. Your availability can also be adjusted
          after you open for bookings.
        </p>
        <p class="py-5 pt-8 text-base font-semibold text-gray-600">
          To complete your registration, please tick the boxes below
        </p>

        <div class="flex mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />

          <label for="default-checkbox" class="ml-2 text-sm"
            >I certify that this is a legitimate accommodation business with all
            necessary licenses and permits, which can be shown upon first
            request. Booking.com B.V. reserves the right to verify and
            investigate any details provided in this registration.
          </label>
        </div>
        <div class="flex mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />
          <label for="default-checkbox" class="ml-2 text-sm"
            >I have react accepted and agreed to the General Delivery Terms and
            Privacy Statement. Booking.com enables accommodations and guests to
            communicate through Etooking.com, which receives and processes
            communications in accordance with the Booking.com Privacy Statement
            and General Delivery Terms.
          </label>
        </div>
        <p class="py-5 text-base font-semibold text-gray-600">
          Almost done! You can always change the information even after you
          completed the registration!
        </p>
      </div>
    </FormCard>

  </section>

</template>

