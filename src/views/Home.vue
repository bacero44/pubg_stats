<template>
  <div id="app">
    <div id="getting" v-if="is_getting">Getting user</div>
    <div id="notice" v-if="!player_fund && player.fetched && !is_getting">
      <b>{{ player.nametag }}</b> was not fund
    </div>
    <Search
      :fetch_player="fetch_player"
      v-if="!is_getting && !player_fund"
    ></Search>
    <Player v-if="player_fund" :player="player.nametag"></Player>
    <div id="player_stats" v-if="player_fund">
      <Stats
        :stat="value"
        v-for="(value, index) in player.data.stats"
        :key="index + 'stast'"
      ></Stats>
    </div>
    <div id="orders" v-if="player_fund">
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
    <div id="player_mastery" v-if="player_fund">
      <Mastery
        :mastery="value"
        v-for="(value, index) in player.data.mastery"
        :key="index + 'mastery'"
      ></Mastery>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {
    Search: () => import("@/components/Search.vue"),
    Player: () => import("@/components/Player.vue"),
    Stats: () => import("@/components/Stats.vue"),
    Mastery: () => import("@/components/Mastery.vue"),
  },
  data() {
    return {
      is_getting: false,
      player: {
        nametag: "",
        data: {},
        fetched: false,
      },
      orders: {
        kills: false,
        level: false,
        head_shots: false,
        name: false,
      },
    };
  },
  methods: {
    fetch_player(nametag) {
      this.player.nametag = nametag;
      this.is_getting = true;
      axios
        .get("http://192.168.2.160:4567/player/" + nametag)
        .then((response) => {
          this.player.data = response.data;
          this.is_getting = false;
          this.$router.push(`/${nametag}`);
        })
        .catch((error) => {
          console.log(error);
          this.is_getting = false;
        });
      this.player.fetched = true;
    },
    order_mastery_numbers(attribute, invert) {
      this.player.data.mastery.sort(function (a, b) {
        if (invert) [a, b] = [b, a];
        return a[attribute] - b[attribute];
      });
      this.orders[attribute] = !invert;
    },
    order_mastery_characteres(attribute, invert) {
      this.player.data.mastery.sort(function (a, b) {
        if (invert) [a, b] = [b, a];
        if (a[attribute] < b[attribute]) return -1;
        if (a[attribute] > b[attribute]) return 1;
        return 0;
      });
      this.orders[attribute] = !invert;
    },
  },
  computed: {
    player_fund: function () {
      if (this.player.fetched && Object.keys(this.player.data).length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },

  created: function () {
    if (this.$route.params.player) {
      this.fetch_player(this.$route.params.player);
    }
  },
};
</script>

<style lang="scss">
#app {
  #notice {
    color: $second_color;
  }
  #getting {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }
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
</style>
