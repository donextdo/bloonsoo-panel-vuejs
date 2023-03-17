<script setup>

import { ref, onMounted, inject } from 'vue'
import RouteNavigationBar from '../../../components/navbar/RouteNavigationBar.vue';
import FormCard from '../../../components/shared/FormCard.vue';
import TextInput from '../../../components/shared/FormControls/TextInput.vue';
import DropDown from '../../../components/shared/FormControls/DropDown.vue';
import RadioGroup from '../../../components/shared/FormControls/RadioGroup.vue';
import TextArea from '../../../components/shared/FormControls/TextArea.vue';
import ButtonSpinner from '../../../components/Spinner/ButtonSpinner.vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const store = useStore()
const axios = inject('axios')
const toast = useToast()
const { currentHotel } = store.state

const creditCardOption = ref();
const creditCardOptionError = ref(false);

const commissionPayments = ref("John");

const editMode = ref(false)
const loading = ref(false)

const setDefaults = () => {
    creditCardOption.value = currentHotel?.credit_card_options ? 'yes' : 'no'
}

onMounted(() => {
    if(currentHotel) setDefaults()
})

const toggleEditMode = () => {
    editMode.value = !editMode.value
}

const handleUpdate = async () => {
    loading.value = true

    const dto = {
        credit_card_options: creditCardOption.value === "yes" ? true : false
    }

    try {
        const {data} = await axios.patch(`/api/hotel/update-hotel/${currentHotel._id}`,
            dto,
            {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
        })
        await store.dispatch('getCurrentHotel', currentHotel._id)
        editMode.value = false
        loading.value = false
        toast.success('Successfully Updated!', {
            position: 'top-right',
            duration: 5000,
            dismissible: true
        })
    }
    catch (error) {
        editMode.value = false
        loading.value = false
        toast.error('Something went wrong!', {
            position: 'top-right',
            duration: 5000,
            dismissible: true
        })
        console.log(error)
    }
}

</script>


<template>
    <div class="w-full flex flex-col gap-6">

        <RouteNavigationBar
            previous="Policies"
            prevRoute="policies"
            current="Payments"
            :editMode="editMode"
            @onEdit="toggleEditMode"
            @onSave="handleUpdate"
        />

        <section class="w-full flex flex-col gap-10">

            <FormCard label="Guest payment options">
                <div class="px-4 flex flex-col gap-6">
                    <RadioGroup
                    title="Can you charge credit cards at the property?"
                    :options="[
                        { data: 'yes', label: 'yes' },
                        { data: 'no', label: 'no' },
                    ]"
                    name="group3"
                    :checkedVal="creditCardOption"
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

                
            <div
            class="bg-gray-100 rounded-md w-full flex flex-col gap-6 py-8 px-6 font-montserrat"
            >
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