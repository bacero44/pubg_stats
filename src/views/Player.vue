<template>
  <div id="single_player">
    <div id="seraching" class="center" v-if="serching">Searching...</div>
    <div id="playernotfound" class="center" v-if="notfound">
      <p>The player was not found</p>
      <router-link to="/">Search again</router-link>
    </div>
    <div v-if="!serching && !notfound">
      <div id="player_data">
        <div class="stats_group">
          <div id="stats_header" class="group_header">
            <h2>Stats</h2>
          </div>
          <div id="player_stats" class="group_content">
            <Stats
              :stat="value"
              v-for="(value, index) in main_player.data.stats"
              :key="index + 'stast'"
            ></Stats>
          </div>
        </div>
        <div class="stats_group">
          <div id="mastery_header" class="group_header">
            <h2>Mastery</h2>
            <div id="orders">
              <button
                @click="order_mastery_characteres('name', orders['name'])"
              >
                Name
              </button>
              <button @click="order_mastery_numbers('kills', orders['kills'])">
                Kills
              </button>
              <button @click="order_mastery_numbers('level', orders['level'])">
                Level
              </button>
              <button
                @click="
                  order_mastery_numbers('head_shots', orders['head_shots'])
                "
              >
                Headshots
              </button>
            </div>
          </div>

          <div id="player_mastery" class="group_content">
            <Mastery
              :mastery="value"
              v-for="(value, index) in main_player.data.mastery"
              :key="index + 'mastery'"
            ></Mastery>
          </div>
        </div>
        <div class="stats_group" id="player_last_matches">
          <div id="matches_header" class="group_header">
            <h2>Last 5 Matches</h2>
            <router-link
              :to="{ name: 'Matches', params: { player: main_player.nametag } }"
              >all</router-link
            >
          </div>
          <div class="group_content">
            <div class="" v-if="getting_matches">Loading...</div>
            <div class="" v-if="notfound_matches">Matches was not fund</div>
            <div v-if="matchesExist">
              <Match
                :match="match"
                :main_player="main_player.nametag"
                v-for="(match, index) in main_player.matches.slice(0, 5)"
                :key="index + 'match'"
              ></Match>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Player",
  components: {
    Stats: () => import("@/components/single_player/Stats.vue"),
    Mastery: () => import("@/components/single_player/Mastery.vue"),
    Match: () => import("@/components/matches/Match.vue"),
  },
  data() {
    return {
      serching: true,
      notfound: false,

      orders: {
        kills: true,
        level: true,
        head_shots: true,
        name: true,
      },
      getting_matches: false,
      notfound_matches: false,
    };
  },
  methods: {
    search(nametag) {
      if (nametag.length > 4) {
        this.fetch_main_player(nametag).then((response) => {
          if (response) {
            this.serching = false;
          } else {
            this.serching = false;
            this.notfound = true;
          }
        });
      }
    },

    scrolling() {
      this.handleScroll();
      this.matches();
    },

    matches() {
      const p = document.getElementById("player_last_matches").offsetTop;
      const w = window.pageYOffset + window.innerHeight;

      if (w > p && !this.getting_matches && !this.matchesExist) {
        this.getting_matches = true;
        this.fetch_matches(this.main_player.nametag).then((response) => {
          if (response) {
            this.getting_matches = false;
          } else {
            this.notfound_matches = true;
          }
        });
      }
    },

    ...mapActions(["fetch_main_player", "fetch_matches", "handleScroll"]),

    order_mastery_numbers(attribute, invert) {
      this.main_player.data.mastery.sort(function (a, b) {
        if (invert) [a, b] = [b, a];
        return a[attribute] - b[attribute];
      });
      this.orders[attribute] = !invert;
    },
    order_mastery_characteres(attribute, invert) {
      this.main_player.data.mastery.sort(function (a, b) {
        if (invert) [a, b] = [b, a];
        if (a[attribute] < b[attribute]) return -1;
        if (a[attribute] > b[attribute]) return 1;
        return 0;
      });
      this.orders[attribute] = !invert;
    },
  },
  computed: {
    ...mapState(["main_player"]),
    ...mapGetters(["stats"]),
    matchesExist: function () {
      return Object.keys(this.main_player.matches).length > 0 ? true : false;
    },
  },
  watch: {},

  created: function () {
    if (
      (this.$route.params.player && this.main_player.nametag == "") ||
      this.$route.params.player != this.main_player.nametag ||
      Object.keys(this.main_player.data).length == 0
    ) {
      this.search(this.$route.params.player);
    } else {
      this.serching = false;
    }

    window.addEventListener("scroll", this.scrolling);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrolling);
  },
};
</script>

<style lang="scss">
#single_player {
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Teko", sans-serif;
  }
  #seraching {
    color: $light_color;
    font-size: 2.5em;
  }
  #playernotfound {
    color: $main_color;
    font-size: 2.5em;
    text-align: center;
    a {
      text-decoration: none;
      color: $light_color;
    }
  }

  h2 {
    font-family: "Teko", sans-serif;
    color: $light_color;
    font-weight: 400;
  }

  #player_data {
    padding-top: 0px;

    .stats_group {
      &:not(:last-child) {
        margin-bottom: 30px;
      }

      #mastery_header {
        display: grid;
        grid-template-columns: auto auto;

        #orders {
          display: flex;
          align-items: center;
          margin-left: auto;

          button {
            font-family: "Teko";
            font-weight: 400;
            font-size: 0.9em;
            padding: 2px 5px 2px 5px;
            background-color: transparent;
            color: $light_color;
            border: solid 2px $second_color;
            cursor: pointer;
            outline: inherit;
            &:not(:first-child) {
              margin-left: 5px;
            }
          }
        }
      }

      #matches_header {
        display: grid;
        grid-template-columns: 1fr auto;
        padding-bottom: 2px;
        a {
          font-family: "Teko";
          padding: 5px 8px 5px 8px;
          color: $light_color;
          border: solid 2px $second_color;
          cursor: pointer;
          text-decoration: none;
          text-transform: capitalize;
        }
      }

      .group_header {
        padding-top: 8px;

        &.fixed_head {
          position: fixed;
          top: 50px;
          right: 0;
          background-color: $dark;
          width: 100%;
          padding-right: 2vw;
          padding-left: 2vw;
        }
      }
      .group_content {
        &.fixed_head {
          padding-top: 50px;
        }
      }
    }
  }
}
</style>
