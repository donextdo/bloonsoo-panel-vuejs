<script setup>

import RouteNavigationBar from '../../../components/navbar/RouteNavigationBar.vue';
import { ref } from 'vue'
import FormCard from '../../../components/shared/FormCard.vue';
import TextInput from '../../../components/shared/FormControls/TextInput.vue';
import DropDown from '../../../components/shared/FormControls/DropDown.vue';
import RadioGroup from '../../../components/shared/FormControls/RadioGroup.vue';
import CheckboxGroup from '../../../components/shared/FormControls/CheckboxGroup.vue';

const facilitiesData = [
    {data: 'Non-smoking rooms', label: 'Non-smoking rooms'}, 
    {data: 'Restaurant', label: 'Restaurant'}, 
    {data: 'Free WiFi', label: 'Free WiFi'}, 
    {data: 'Airport shuttle', label: 'Airport shuttle'},
    {data: 'Hot tub', label: 'Hot tub'},
    {data: 'Water park', label: 'Water park'},

    {data: 'Non-smoking rooms', label: 'Non-smoking rooms'}, 
    {data: 'Restauran', label: 'Restauran'}, 
    {data: 'Free WiFi', label: 'Free WiFi'}, 
    {data: 'Airport shuttle', label: 'Airport shuttle'},
    {data: 'Hot tub', label: 'Hot tub'},
    {data: 'Water park', label: 'Water park'},

    {data: 'Non-smoking rooms', label: 'Non-smoking rooms'}, 
    {data: 'Restauran', label: 'Restauran'}, 
    {data: 'Free WiFi', label: 'Free WiFi'}, 
    {data: 'Airport shuttle', label: 'Airport shuttle'},
    {data: 'Hot tub', label: 'Hot tub'},
    {data: 'Water park', label: 'Water park'},

    {data: 'Non-smoking rooms', label: 'Non-smoking rooms'}, 
    {data: 'Restauran', label: 'Restauran'}, 
    {data: 'Free WiFi', label: 'Free WiFi'}, 
    {data: 'Airport shuttle', label: 'Airport shuttle'},
    {data: 'Hot tub', label: 'Hot tub'},
    {data: 'Water park', label: 'Water park'}
]

const amenitiesData = [
    {data: 'A/C', label: 'A/C'}, 
    {data: 'Spa bath', label: 'Spa bath'}, 
    {data: 'Bath', label: 'Bath'}, 
    {data: 'Flat-screen TV', label: 'Flat-screen TV'},
    {data: 'Electric kettle', label: 'Electric kettle'},
    {data: 'Balcony', label: 'Balcony'},

    {data: 'A/C', label: 'A/C'}, 
    {data: 'Spa bath', label: 'Spa bath'}, 
    {data: 'Bath', label: 'Bath'}, 
    {data: 'Flat-screen TV', label: 'Flat-screen TV'},
    {data: 'Electric kettle', label: 'Electric kettle'},
    {data: 'Balcony', label: 'Balcony'},

    {data: 'A/C', label: 'A/C'}, 
    {data: 'Spa bath', label: 'Spa bath'}, 
    {data: 'Bath', label: 'Bath'}, 
    {data: 'Flat-screen TV', label: 'Flat-screen TV'},
    {data: 'Electric kettle', label: 'Electric kettle'},
    {data: 'Balcony', label: 'Balcony'},

    {data: 'A/C', label: 'A/C'}, 
    {data: 'Spa bath', label: 'Spa bath'}, 
    {data: 'Bath', label: 'Bath'}, 
    {data: 'Flat-screen TV', label: 'Flat-screen TV'},
    {data: 'Electric kettle', label: 'Electric kettle'},
    {data: 'Balcony', label: 'Balcony'}

]

const parkingType = ref('paid')
const parkingType2 = ref('Private')
const parkingType3 = ref('On site')

const reservation = ref('no')

const priceUnit = ref('USD')
const parkingPrice = ref()
const parkingPriceError = ref(false)

const breakpastOption = ref()
const breakpastOptionError = ref(false)

const languages = ref([])

const facilities = ref([])
const facilitiesError = ref(false)

const extraBedOpt = ref()
const noOfBeds = ref('1')
const accommodateGuests = ref([])

const amenities = ref([])
const amenitiesError = ref(false)

const editMode = ref(false) 

const setDefaults = () => {
    parkingType.value = currentHotel?.parking_details.parking_type
    
}




</script>


<template>
    <div class="w-full flex flex-col gap-6">
        <RouteNavigationBar
            previous="Basic information"
            prevRoute="basicInformation"
            current="Facilities and Amenities"
            next="Images"
            nextRoute="images"
        />

        <section class="w-full flex flex-col gap-10">

            <FormCard label="Parking" >

                <div class="grid grid-cols-3 gap-x-8 gap-y-6 px-4 items-end">

                    <DropDown 
                        label="Is parking available to the guests?" 
                        v-model="parkingType" 
                        :options="[{value: 'paid', label: 'Yes, paid'}, {value: 'free', label: 'Yes, free'}, {value: 'no', label: 'No'}]" 
                        />

                    <DropDown 
                        v-if="(parkingType == 'paid' || parkingType == 'free')"
                        v-model="parkingType2" 
                        :options="['Public', 'Private']" 
                        />

                    <DropDown 
                        v-if="(parkingType == 'paid' || parkingType == 'free')"
                        v-model="parkingType3"
                        :options="['On site', 'Off site']" 
                        />

                    <DropDown 
                        v-if="(parkingType == 'paid' || parkingType == 'free')"
                        label="Do guests need to reserve a parking space ?" 
                        v-model="reservation" 
                        :options="[{value: 'no', label: 'No reservation needed'}, {value: 'yes', label: 'Yes, reservation needed'}]" 
                        :readonly="!editMode"
                        />

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
                            type="number" class="col-span-2" :readonly="!editMode" />

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

        </section>
    </div>
</template>