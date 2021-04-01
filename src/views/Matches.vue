<template>
  <div id="player_matches">
    <div id="seraching" class="center" v-if="serching">Searching...</div>
    <div id="playernotfound" class="center" v-if="notfound">
      <p>Matches or Player were not found</p>
      <router-link to="/">Search again</router-link>
    </div>
    <div v-if="!serching && !notfound">
      <div class="stats_group" id="matches">
        <div id="header" class="group_header">
          <h2>Matches</h2>
          <div id="orders">
            <button @click="order_date('date', orders['date'])">date</button>
            <button @click="order_matches('place', orders['place'])">
              place
            </button>
            <button @click="order_matches('kills', orders['kills'])">
              kills
            </button>
          </div>
        </div>
        <div class="group_content">
          <Match
            :match="match"
            :main_player="main_player.nametag"
            v-for="(match, index) in main_player.matches"
            :key="index + 'match'"
          ></Match>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Matches",
  components: {
    Match: () => import("@/components/matches/Match.vue"),
  },
  data() {
    return {
      serching: true,
      notfound: false,

      orders: {
        date: true,
        place: true,
        kills: true,
      },
    };
  },
  methods: {
    search(gametag) {
      if (gametag.length > 4) {
        this.fetch_matches(gametag).then((response) => {
          if (response) {
            this.serching = false;
          } else {
            this.serching = false;
            this.notfound = true;
          }
        });
      }
    },
    ...mapActions(["fetch_matches", "handleScroll"]),

    order_matches(attribute, invert) {
      this.main_player.matches.sort(function (a, b) {
        if (invert) [a, b] = [b, a];
        return a[attribute] - b[attribute];
      });
      this.orders[attribute] = !invert;
    },

    order_date(attribute, invert) {
      this.main_player.matches.sort(function (a, b) {
        if (invert) [a, b] = [b, a];
        return new Date(b.date) - new Date(a.date);
      });
      this.orders[attribute] = !invert;
    },
  },
  computed: {
    ...mapState(["main_player"]),
  },

  created: function () {
    if (
      (this.$route.params.player && this.main_player.nametag == "") ||
      this.$route.params.player != this.main_player.nametag
    ) {
      this.search(this.$route.params.player);
    } else {
      this.serching = false;
    }
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss">
#player_matches {
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Teko", sans-serif;
  }
  h2 {
    font-family: "Teko", sans-serif;
    color: $light_color;
    font-weight: 400;
  }
  #seraching {
    color: $light_color;
    font-size: 2.5em;
  }
  #matches {
    margin-bottom: 35px;
    #header {
      display: grid;
      grid-template-columns: auto auto;
      padding-top: 5px;
      padding-bottom: 5px;
      #orders {
        text-align: right;
        margin-bottom: 5px;
        button {
          text-transform: capitalize;
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
</style>