<template>
  <div id="single_player">
    <div id="seraching" v-if="serching">Searching...</div>
    <div id="playernotfound" v-if="notfound">No se econtro</div>
    <div v-if="!serching && !notfound">
      <div id="player_title">
        <small>Player</small>
        <h1>{{ main_player.nametag }}</h1>
      </div>

      <div id="player_stats">
        <h2>Stats</h2>
        <Stats
          :stat="value"
          v-for="(value, index) in main_player.data.stats"
          :key="index + 'stast'"
        ></Stats>
      </div>
      <div id="mastery_header">
        <h2>Mastery</h2>
        <div id="orders">
          <button @click="order_mastery_characteres('name', orders['name'])">
            Name
          </button>
          <button @click="order_mastery_numbers('kills', orders['kills'])">
            Kills
          </button>
          <button @click="order_mastery_numbers('level', orders['level'])">
            Level
          </button>
          <button
            @click="order_mastery_numbers('head_shots', orders['head_shots'])"
          >
            Headshots
          </button>
        </div>
      </div>

      <div id="player_mastery">
        <Mastery
          :mastery="value"
          v-for="(value, index) in main_player.data.mastery"
          :key="index + 'mastery'"
        ></Mastery>
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
  },
  data() {
    return {
      serching: true,
      notfound: false,
      orders: {
        kills: false,
        level: false,
        head_shots: false,
        name: false,
      },
    };
  },
  methods: {
    search(gametag) {
      if (gametag.length > 4) {
        this.fetch_player(gametag).then((response) => {
          if (response) {
            this.serching = false;
          } else {
            this.serching = false;
            this.notfound = true;
          }
        });
      }
    },

    ...mapActions(["fetch_player"]),

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
  },

  created: function () {
    if (this.$route.params.player && this.main_player.nametag == "") {
      this.search(this.$route.params.player);
    } else {
      this.serching = false;
    }
  },
};
</script>

<style lang="scss">
#single_player {
  #player_title {
    small {
      font-family: "Teko", sans-serif;
      color: $light_color;
      font-size: 1.5em;
    }
    h1 {
      font-family: "Pubg";
      font-size: 5em;
      font-weight: 500;
      color: $light_color;
    }
  }
  h2 {
    font-family: "Teko", sans-serif;
    color: $light_color;
    font-weight: 400;
  }

  #mastery_header {
    display: grid;
    grid-template-columns: auto auto;
    #orders {
      text-align: right;
      margin-bottom: 5px;
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
}
</style>
