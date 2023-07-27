<script setup>
import RouteNavigationBar from "../../../components/navbar/RouteNavigationBar.vue";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { ref, onMounted, inject } from "vue";
import "../../../assets/css/phoneNumberInput.css";
import FormCard from "../../../components/shared/FormCard.vue";
import TextInput from "../../../components/shared/FormControls/TextInput.vue";
import DropDown from "../../../components/shared/FormControls/DropDown.vue";
import RadioGroup from "../../../components/shared/FormControls/RadioGroup.vue";
import TextArea from "../../../components/shared/FormControls/TextArea.vue";
import ButtonSpinner from "../../../components/Spinner/ButtonSpinner.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { GmapMap, GmapMarker } from "vue2-google-maps";
import Places from "vue-places";
import {
    ref,
    onMounted,
    inject,
    watch
} from "vue";

const store = useStore();
const axios = inject("axios");
const toast = useToast();
const { currentHotel } = store.state;

const propertyName = ref("");
const propertyNameError = ref(false);

const startRating = ref("N/A");

const contactName = ref("");
const contactNameError = ref(false);

const phoneNumber = ref();
const phoneNumberRes = ref();
const phoneNumberError = ref(false);

const phoneNumberAlt = ref();
const phoneNumberAltRes = ref();

const ownMultipleHotels = ref();
const ownMultipleHotelsError = ref(false);

const ownMultipleHotelChekedval = ref();

const channelManager = ref();
const channelManagerError = ref(false);

const channelManagerChekedVal = ref();

const streetAddress = ref();
const streetAddressError = ref(false);

const country = ref();
const countryError = ref(false);

const postalCode = ref("");
const postalCodeError = ref(false);

const about = ref("");
const aboutError = ref(false);

const editMode = ref(false);
const loading = ref(false);

// const predictions = ref([]);
// const location = ref("");
// const city = ref("");
// const hide = ref(false);
// const lat = ref(null);
// const lng = ref(null);
// const defaultCoordinates = ref({ lat: 0, lng: 0 });
// const map = ref(null);

const setDefaults = () => {
    propertyName.value = currentHotel?.property_name;
    startRating.value = currentHotel?.star_rating;
    contactName.value = currentHotel?.contact_name;
    phoneNumber.value = currentHotel?.contact_phone_number;
    phoneNumberAlt.value = currentHotel?.contact_phone_number_alternative || "";
    ownMultipleHotels.value = currentHotel?.is_own_multiple_hotels ? "yes" : "no";
    ownMultipleHotelChekedval.value = currentHotel?.is_own_multiple_hotels
        ? "yes"
        : "no";
    channelManager.value = currentHotel?.use_channel_manager ? "yes" : "no";
    channelManagerChekedVal.value = currentHotel?.use_channel_manager
        ? "yes"
        : "no";
    streetAddress.value = currentHotel?.property_address.street_address;
    country.value = currentHotel?.property_address.country;
    postalCode.value = currentHotel?.property_address.postal_code;
    about.value = currentHotel.about;
};

onMounted(() => {
    console.log(currentHotel);
    if (currentHotel) setDefaults();
});

const toggleEditMode = () => {
    editMode.value = !editMode.value;
};

// const handleLocationChange = (event) => {
//     location.value = event.target.value;

//     const autocompleteService = new google.maps.places.AutocompleteService();
//     autocompleteService.getPlacePredictions(
//         {
//             input: location,
//             types: ["geocode"],
//         },
//         handleAutocompleteResults()
//     );
// };

// const handleAutocompleteResults = (predictions, status) => {
//     hide.value = false;
//     if (status === "OK") {
//         predictions.value = predictions;
//         console.log(predictions)
//     }
// };

const handleUpdate = async () => {
    setTimeout(() => {
        propertyNameError.value = false;
        contactNameError.value = false;
        phoneNumberError.value = false;
        streetAddressError.value = false;
        postalCodeError.value = false;
        aboutError.value = false;
    }, 10000);

    if (!propertyName.value) return (propertyNameError.value = true);
    if (!contactName.value) return (contactNameError.value = true);
    if (!phoneNumber.value) return (phoneNumberError.value = true);
    if (!streetAddress.value) return (streetAddressError.value = true);
    if (!postalCode.value) return (postalCodeError.value = true);
    if (!about.value.length > 1200) return (aboutError.value = true);

    loading.value = true;

    const hotelDto = {
        property_name: propertyName.value,
        star_rating: startRating.value,
        contact_name: contactName.value,
        contact_phone_number: phoneNumber.value,
        contact_phone_number_alternative: phoneNumberAlt.value || null,
        is_own_multiple_hotels: ownMultipleHotels.value === "yes" ? true : false,
        use_channel_manager: channelManager.value === "yes" ? true : false,
        property_address: {
            street_address: streetAddress.value,
            country: country.value,
            postal_code: postalCode.value,
        },
        about: about.value,
    };

    try {
        const { data } = await axios.patch(
            `/api/hotel/update-hotel/${currentHotel._id}`,
            hotelDto,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        await store.dispatch("getCurrentHotel", currentHotel._id);
        editMode.value = false;
        loading.value = false;
        toast.success("Successfully Updated!", {
            position: "top-right",
            duration: 5000,
            dismissible: true,
        });
    } catch (error) {
        editMode.value = false;
        loading.value = false;
        toast.error("Something went wrong!", {
            position: "top-right",
            duration: 5000,
            dismissible: true,
        });
        console.log(error);
    }
};

//map


// Initialize the data properties
const showMap = ref(false);
const mapCenter = ref({
    lat: 0,
    lng: 0
});
const mapZoom = ref(15);
const markerPosition = ref(null);

// Watch the streetAddress and update the map accordingly
watch(streetAddress, async (newAddress) => {
    if (newAddress) {
        showMap.value = true;

        // Use Google Maps Geocoding API to get the latLng from the streetAddress
        // Make sure you have a Google Maps API key set up and properly authorized
        // Here, you need to replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: newAddress
        }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                mapCenter.value = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };
                markerPosition.value = mapCenter.value;
            }
        });
    } else {
        showMap.value = false;
    }
});

</script>

<template>
    <div class="w-full flex flex-col gap-6">
        <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyALJN3bDbGEk8ppXieiWNnwHVYM_8ntKng&libraries=places">
        </Script>
        <RouteNavigationBar current="Basic information" next="Facilities and Amenities" nextRoute="facilities"
            :editMode="editMode" @onEdit="toggleEditMode" @onSave="handleUpdate" />

        <section class="w-full flex flex-col gap-10">
            <FormCard label="Name and Ratings">
                <div class="grid grid-cols-2 gap-x-8 gap-y-2 px-4">
                    <TextInput label="Name of your Property" v-model="propertyName" :error="propertyNameError"
                        errorMessage="Property name cannot be empty" :readonly="!editMode" />

                    <DropDown label="Star Rating" v-model="startRating" :readonly="!editMode" slot>
                        <option value="N/A" class="text-sm font-semibold text-gray-500 appearance-none">
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
                    <TextInput label="Contact name" v-model="contactName" :error="contactNameError"
                        errorMessage="Contact name cannot be empty" :readonly="!editMode" />

                    <TextInput label="Phone Number" v-model="phoneNumber" :error="phoneNumberError"
                        errorMessage="Please enter a mobile number" :readonly="!editMode" />

                    <TextInput label="Alternative Phone Number" v-model="phoneNumberAlt" :readonly="!editMode" />

                    <!-- <div class="flex flex-col gap-2 items-start col-start-1">

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

                    </div> -->

                    <RadioGroup title="Do you own multiple hotels, or are you a part of a property management company?"
                        class="col-span-2" v-model="ownMultipleHotels" :options="[
                            { data: 'yes', label: 'yes' },
                            { data: 'no', label: 'no' },
                        ]" :error="ownMultipleHotelsError" :checkedVal="ownMultipleHotelChekedval" name="group1"
                        :readonly="!editMode" errorMessage="Please select an option" />
                </div>
            </FormCard>

            <FormCard label="Do you use a channel manager?">
                <div class="px-4">
                    <p class="text-sm text-gray-600 font-semibold mb-4 text-justify">
                        A channel manager is a tool that lets you choose what you sell
                        across all the different sites you might list your place on. You can
                        then set your prices and open and close dates in your calendar on
                        all of these sites in one place.
                        <br />
                        <br />
                        If you use a channel manager, tell us below. Well use this
                        information to help you connect it to Bloonsoo.com in the future. It
                        also helps if you tell us the brand name of your channel manager.
                    </p>

                    <RadioGroup v-model="channelManager" :options="[
                        { data: 'yes', label: 'yes' },
                        { data: 'no', label: 'no' },
                    ]" :error="channelManagerError" :checkedVal="channelManagerChekedVal" name="group2"
                        :readonly="!editMode" errorMessage="Please select an option" />
                </div>
            </FormCard>

            <FormCard label="Where is your property located?">
                <div class="px-4 flex flex-col gap-6">
                    <p class="text-sm text-gray-600 font-semibold mb-4 text-justify">
                        Please make sure you enter the full address of your property,
                        including your building name, number, etc. Based on the information
                        you provide, we might send a letter to verify this address,
                    </p>

                    <div class="w-full grid grid-cols-2 gap-6">
                        <TextInput label="Street Address" v-model="streetAddress" :error="streetAddressError"
                            errorMessage="Please enter street address" class="col-start-1" :readonly="!editMode" />


                        <DropDown label="Country/Region" v-model="country" :error="countryError"
                            errorMessage="Please select a country" :options="['Sri Lanka', 'Australia', 'India']"
                            class="col-start-1" :readonly="!editMode" />

                        <TextInput label="Post Code" v-model="postalCode" :error="postalCodeError"
                            errorMessage="please enter post code" class="col-start-1" :readonly="!editMode" />

                        <div class="flex flex-col gap-2 items-start row-span-3 col-start-2 row-start-1">
                            <h4 class="text-sm font-semibold text-gray-600">
                                Select Your Location (Move the pin)
                            </h4>
                            <GmapMap v-if="showMap" :center="mapCenter" :zoom="mapZoom" style="width: 100%; height: 400px;"
                                @click="onMapClick">
                                <GmapMarker :position="markerPosition" :draggable="editMode" @dragend="onMarkerDragend" />
                            </GmapMap>
                            <!-- <img src="../../../assets/map.jpg" class="w-full h-full object-cover" alt="" /> -->
                        </div>
                    </div>
                </div>
            </FormCard>

            <FormCard label="Add descripion about your property">
                <div class="px-4">
                    <TextArea label="Add description (up to 1200 characters)" rows="8" :maxChars="1200" v-model="about"
                        :error="aboutError" :readonly="!editMode" error-message="content too long" />
                </div>
            </FormCard>

            <button v-if="editMode" @click="handleUpdate"
                class="w-full py-4 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900">
                <ButtonSpinner v-if="loading" />
                <span v-else>Save</span>
            </button>
        </section>
    </div>
</template>
