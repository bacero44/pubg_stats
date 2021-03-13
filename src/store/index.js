import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = "http://192.168.2.160:4567/player/"
Vue.use(Vuex)



export default new Vuex.Store({
    state: {
        
        main_player: {
            nametag: "",
            data: {},
        }
    },
  mutations: {
        setPlayer(state, payload) {
        state.main_player.nametag = payload.nametag;
        state.main_player.data = payload.data;
         
    },
  },
    actions: {
        async fetch_player({ commit }, nametag) {
            let fetched = false
            await axios.get("/" + nametag)
                .then((response) => {
                    commit("setPlayer", { "nametag": nametag, "data": response.data });
                    fetched = true
                }, (err) => {
                    console.log(err);
                    fetched = false
                })
            return fetched
        }
    },
  getters: {
    stats: state => {
      return state.main_player.nametag
    }
  },
  modules: {
  }
})