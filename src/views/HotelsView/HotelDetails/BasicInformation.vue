<script setup>

import RouteNavigationBar from '../../../components/navbar/RouteNavigationBar.vue';
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import { ref } from 'vue'
import '../../../assets/css/phoneNumberInput.css'
import FormCard from '../../../components/shared/FormCard.vue';
import TextInput from '../../../components/shared/FormControls/TextInput.vue';
import DropDown from '../../../components/shared/FormControls/DropDown.vue';
import RadioGroup from '../../../components/shared/FormControls/RadioGroup.vue';
import TextArea from '../../../components/shared/FormControls/TextArea.vue';

const propertyName = ref('')
const propertyNameError = ref(false)

const startRating = ref('N/A')

const contactName = ref('')
const contactNameError = ref(false)

const phoneNumber = ref()
const phoneNumberRes = ref()
const phoneNumberError = ref(false)

const phoneNumberAlt = ref()
const phoneNumberAltRes = ref()

const ownMultipleHotels = ref()
const ownMultipleHotelsError = ref(false)

const channelManager = ref()
const channelManagerError = ref(false)

const streetAddress = ref()
const streetAddressError = ref(false)

const country = ref('Sri Lanka')
const countryError = ref(false)

const postalCode = ref('')
const postalCodeError = ref(false)

const about = ref('')
const aboutError = ref(false)


</script>


<template>
    <div class="w-full flex flex-col gap-6">
        <RouteNavigationBar
            current="Basic information"
            next="Facilities and Amenities"
            nextRoute="facilities"
        />

        <section class="w-full flex flex-col gap-10">

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


                        <MazPhoneNumberInput
                            v-model="phoneNumberAlt"
                            show-code-on-list
                            :preferred-countries="['LK', 'FR', 'BE', 'DE', 'US', 'GB']"
                            no-example size="sm"
                            @update="phoneNumberAltRes = $event"
                            :success="phoneNumberAltRes?.isValid"
                        />

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

                            <img src="../../../assets/map.jpg" class="w-full h-full object-cover" alt="">

                        </div>

                    </div>
                </div>

            </FormCard>

            <FormCard label="Add descripion about your property">

                <div class="px-4">
                    <TextArea 
                    label="Add description (up to 1200 characters)"
                    rows="8" 
                    :maxChars="1200"
                    v-model="about"
                    :error="aboutError"
                    error-message="content too long"   
                />
                </div>

            </FormCard>

        </section>
    </div>
</template>


