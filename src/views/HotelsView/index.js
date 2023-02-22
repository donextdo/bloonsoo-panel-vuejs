import HotelList from './HotelList/index.vue'
import HotelsView from './HotelsView.vue'
import HotelDetails from './HotelDetails/index.vue'
import BasicInformation from './HotelDetails/BasicInformation.vue'
import Facilities from './HotelDetails/Facilities.vue'
import Images from './HotelDetails/Images.vue'
import Policies from './HotelDetails/Policies.vue'
import Payments from './HotelDetails/Payments.vue'
import RoomListByHotel from './RoomListByHotel/index.vue'

const hotelRoutes = [
    {
        path: '/hotels',
        name: 'hotels',
        component: HotelsView,
        redirect: {
            name: 'hotelList'
        },
        children: [
            {
                path: '',
                name: 'hotelList',
                component: HotelList
            },
            {
                path: ':id',
                name: 'hotelDetails',
                component: HotelDetails,
                redirect: {
                    name: 'basicInformation'
                },
                children: [
                    {
                        path: 'basic-information',
                        name: 'basicInformation',
                        component: BasicInformation
                    },
                    {
                        path: 'facilities',
                        name: 'facilities',
                        component: Facilities
                    },
                    {
                        path: 'images',
                        name: 'images',
                        component: Images
                    },
                    {
                        path: 'policies',
                        name: 'policies',
                        component: Policies
                    },
                    {
                        path: 'payments',
                        name: 'payments',
                        component: Payments
                    }
                ]
            },
            {
                path: 'rooms/:id',
                name: 'roomListByHotel',
                component: RoomListByHotel
            }
        ]
    }
]

export default hotelRoutes