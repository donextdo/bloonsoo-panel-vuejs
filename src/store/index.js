import { createStore } from 'vuex'
import { inject } from 'vue'
import axios from 'axios'

let development = process.env.NODE_ENV !== 'production'

const baseUrl = development ? 'http://localhost:9000' :' http://api.marriextransfer.com'

export default createStore({
  state: {
    user: null,
  },
  getters: {
    getToken() {
      const token = localStorage.getItem('token')
      return token
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async getAuthUser({commit}) {
      try {
        
        const {data} = await axios.get(`${baseUrl}/api/auth/user`, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        commit('setUser', data)

      } catch (error) {
        commit('setUser', null)
      }
    }
  },
  modules: {
  }
})
