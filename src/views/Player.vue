<template>
  <div id="single_player">
    <div id="seraching" v-if="serching">Searching...</div>
    <div id="playernotfound" v-if="notfound">No se econtro</div>
    <div v-if="!serching && !notfound">
      <div id="player_title" v-bind:class="{ small: isScroll }">
        <small>Player</small>
        <h1>{{ main_player.nametag }}</h1>
      </div>
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
        <div class="stats_group">
          <div id="stats_header" class="group_header">
            <h2>Another</h2>
          </div>
          <div class="group_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            tempora nihil dolorem incidunt illum veniam quidem omnis laboriosam
            assumenda. Labore eveniet perspiciatis ipsa ipsum id. Modi
            consectetur totam id mollitia!
            <br />
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
  },
  data() {
    return {
      serching: true,
      notfound: false,
      isScroll: false,

      orders: {
        kills: true,
        level: true,
        head_shots: true,
        name: true,
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
    handleScroll() {
      // TITLE
     
      if (
        document.getElementById("player_data").getBoundingClientRect().top < 0
      ) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }

      const pt = document.getElementById("player_title").offsetHeight;

      //STATS GROUP
      const sg = document.querySelectorAll(".stats_group");
      sg.forEach((g) => {
        const gTop = g.getBoundingClientRect().top;
        const gBottom = g.getBoundingClientRect().bottom;

        if (gTop >= pt || gBottom <= pt) {
          g.querySelector(".group_header").classList.remove("fixed_head");
          g.querySelector(".group_content").classList.remove("fixed_head");
        }
        if (gTop <= pt && gBottom >= pt) {
          g.querySelector(".group_header").classList.add("fixed_head");
          g.querySelector(".group_content").classList.add("fixed_head");
        }
      });

      // //STAST

      // const sh = document.getElementById("stats_header");
      // const ps = document.getElementById("player_stats");
      // const pre1 = pt.offsetHeight + sh.offsetHeight;

      // if (
      //   ps.getBoundingClientRect().top < pre1 &&
      //   ps.getBoundingClientRect().bottom > pre1
      // ) {
      //   this.isOnStats = true;
      // } else {
      //   this.isOnStats = false;
      // }
      // // MASTERY

      // const mh = document.getElementById("mastery_header");
      // const pm = document.getElementById("player_mastery");
      // const pre = pt.offsetHeight + mh.offsetHeight;
      // if (
      //   pm.getBoundingClientRect().top < pre &&
      //   pm.getBoundingClientRect().bottom > pre
      // ) {
      //   this.isOnMastery = true;
      // } else {
      //   this.isOnMastery = false;
      // }
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
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
#single_player {
  #player_title {
    position: fixed;
    background-color: $dark;
    width: 100%;
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
    &.small {
      font-size: 0.5em;
    }
  }
  h2 {
    font-family: "Teko", sans-serif;
    color: $light_color;
    font-weight: 400;
  }

  #player_data {
    padding-top: 120px;
    #stats_header {
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
    .stats_group {
      margin-bottom: 35px;
      #mastery_header {
        display: grid;
        grid-template-columns: auto auto;
        padding-top: 5px;
        padding-bottom: 5px;
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

      .group_header {
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
          padding-top: 2em;
        }
      }
    }
  }
}
</style>
