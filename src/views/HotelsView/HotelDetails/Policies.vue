<script setup>

import { ref, onMounted, inject } from 'vue'
import RouteNavigationBar from '../../../components/navbar/RouteNavigationBar.vue';
import FormCard from '../../../components/shared/FormCard.vue';
import DropDown from '../../../components/shared/FormControls/DropDown.vue';
import RadioGroup from '../../../components/shared/FormControls/RadioGroup.vue';
import ButtonSpinner from '../../../components/Spinner/ButtonSpinner.vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const store = useStore()
const axios = inject('axios')
const toast = useToast()
const { currentHotel } = store.state

const cancellationDuration = ref('1')
const payTime = ref('Of the first night')

const preventAccidentalBookings = ref(true)

const checkInForm = ref("6:00");
const checkInUntill = ref("18:00");
const checkOutForm = ref("6:00");
const checkOutUntill = ref("18:00");  

const accommodateChildren = ref();
const accommodateChildrenError = ref(false);

const pets = ref("yes");

const editMode = ref(false)
const loading = ref(false)

const setDefaults = () => {
    cancellationDuration.value = currentHotel?.policies.cancellation_duration.toString()
    payTime.value = currentHotel?.policies.pay_time
    checkInForm.value = currentHotel?.policies.check_in_form
    checkInUntill.value = currentHotel?.policies.check_in_untill
    checkOutForm.value = currentHotel?.policies.check_out_form
    checkOutUntill.value = currentHotel?.policies.check_out_untill
    accommodateChildren.value = currentHotel?.policies.accommodate_children ? 'yes' : 'no'
    pets.value = currentHotel?.policies.pets ? 'yes' : 'no'
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

        cancellation_duration: cancellationDuration.value,
        pay_time: payTime.value,

        preventAccidental_bookings: preventAccidentalBookings.value,

        check_in_form: checkInForm.value,
        check_in_untill: checkInUntill.value,
        check_out_form: checkOutForm.value,
        check_out_untill: checkOutUntill.value,

        accommodate_children: accommodateChildren.value === "yes" ? true : false,
        pets: pets.value === "yes" ? true : false

    }

    try {
        const {data} = await axios.patch(`/api/hotel/update-hotel/${currentHotel._id}`,
            {
                policies: dto
            },
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
            previous="Images"
            prevRoute="images"
            current="Policies"
            next="Payments"
            nextRoute="payments"
            :editMode="editMode"
            @onEdit="toggleEditMode"
            @onSave="handleUpdate"
        />

        <section class="w-full flex flex-col gap-10">

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
                    :checkedVal="accommodateChildren"
                    errorMessage="Please select an option"
                    />

                    <DropDown
                    class="pt-7 w-96"
                    label="Pets"
                    v-model="pets"
                    errorMessage="Please select a option"
                    :options="['yes', 'no']"
                    />
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