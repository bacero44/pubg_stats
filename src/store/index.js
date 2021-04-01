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
        matches: {},
      },
      players: []
    },
  mutations: {
    setPlayer(state, payload) {
      state.main_player.nametag = payload.nametag;
      state.main_player.data = payload.data;
    },
    setMatches(state, payload) {
      
      state.main_player.nametag = payload.nametag;
      state.main_player.matches = payload.matches;
    },
    setVersus(state, payload) {
      let stats = {
        "wins": 0,
        "kills": 0,
        "assists": 0
      }
      for (let index in payload.data.stats) {
        stats = { 
          "wins": payload.data.stats[index].wins + stats.wins,
          "kills": payload.data.stats[index].kills + stats.kills,
          "assists": payload.data.stats[index].assists + stats.assists
        }
        
      }
      let mastery = {}
      for (let index in payload.data.mastery) {
        mastery[payload.data.mastery[index].name] = {
          "level": payload.data.mastery[index].level,
          "kills": payload.data.mastery[index].kills,
        }
        
      }
      state.players.push({ "nametag": payload.nametag, "stats": stats ,"mastery":mastery})
    }
  },
    actions: {
      async fetch_main_player({ commit }, nametag) {
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
      },
      async fetch_matches({ commit},nametag ) {
        let fetched = false
        await axios.get("/" +nametag+"/matches")
          .then((response) => {
            commit("setMatches", { "nametag": nametag, "matches": response.data.matches });
            fetched = true
            }, (err) => {
              console.log(err);
              fetched = false
            })
        return fetched
      },
      async fetch_player({ commit }, nametag) {
        axios.get("/" + nametag)
          .then((response) => {
          commit("setVersus", { "nametag": nametag, "data": response.data });
        }, (err) => {
          console.log(err);
        })
      },

      handleScroll() {
        
        const title = document.getElementById("player_title");
        const pt = title.offsetHeight;
        const sg = document.querySelectorAll(".stats_group");

        sg.forEach((g) => {
          
          const gTop = g.getBoundingClientRect().top;
          const gBottom = g.getBoundingClientRect().bottom;

          if (gTop >= pt || gBottom <= pt || !title.classList.contains("small")) {
            g.querySelector(".group_header").classList.remove("fixed_head");
            g.querySelector(".group_content").classList.remove("fixed_head");
          }
          if (gTop <= pt && gBottom >= pt && title.classList.contains("small")) {
            g.querySelector(".group_header").classList.add("fixed_head");
            g.querySelector(".group_content").classList.add("fixed_head");
            }
        });
      },
  },
    
    
  getters: {
    stats: state => {
      return state.main_player.nametag
    }

  },
  modules: {
  }
})