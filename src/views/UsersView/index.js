import UsersView from './UsersView.vue'
import UsersList from './UsersList/index.vue'

const usersRoutes = [
    {
        path: '/users',
        name: 'users',
        component: UsersView,
        redirect: {
            name: 'userList'
        },
        children: [
            {
                path: '',
                name: 'userList',
                component: UsersList
            }
        ]
    }
]

export default usersRoutes