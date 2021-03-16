<template>
  <div id="versus">
    <div id="players">
      <div
        class="player"
        v-for="(player, index) in players"
        :key="index + 'player'"
      >
        <div class="player_title" v-bind:class="{ small: isScroll }">
          <router-link :to="'/' + player.nametag">
            <small>Player</small>
            <h2>{{ player.nametag }}</h2>
          </router-link>
        </div>

        <div class="stats_group first">
          <h3>Stats</h3>
          <div id="stats">
            <div
              class="stat"
              :class="getPositionStat(i, player.stats[i])"
              v-for="(stat, i) in player.stats"
              :key="i + '_ps'"
            >
              <h4>{{ i }}</h4>
              <p>{{ stat }}</p>
            </div>
          </div>
        </div>
        <div class="stats_group">
          <h3>Mastery</h3>
          <div id="mastery">
            <div
              class="weapon"
              v-for="(weapon, i) in player.mastery"
              :key="i + '_m'"
            >
              <h4>{{ i }}</h4>
              <div class="score">
                <div>
                  <strong
                    :class="getPositionMastery(i, 'kills', weapon.kills)"
                    >{{ weapon.level }}</strong
                  >
                  <small>Level</small>
                </div>
                <div>
                  <strong
                    :class="getPositionMastery(i, 'kills', weapon.kills)"
                    >{{ weapon.kills }}</strong
                  >
                  <small>Kills</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function score_position(scores, compare) {
  if (Math.min(...scores) == compare) {
    return "lower";
  } else if (Math.max(...scores) == compare) {
    return "higher";
  } else {
    return "middle";
  }
}
import { mapState, mapActions } from "vuex";
export default {
  name: "Versus",
  components: {},
  data() {
    return {
      isScroll: false,
    };
  },
  methods: {
    handleScroll() {
      // TITLE

      if (document.getElementById("players").getBoundingClientRect().top < 0) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    },
    search(player) {
      this.fetch_player(player);
    },
    ...mapActions(["fetch_player"]),
    getPositionStat(stat, score) {
      const x = this.players.map(({ stats }) => stats[stat]);
      return score_position(x, score);
    },

    getPositionMastery(weapon, type, score) {
      const x = this.players.map(({ mastery }) => mastery[weapon][type]);
      return score_position(x, score);
    },
  },
  computed: {
    ...mapState(["players"]),
  },
  created: function () {
    if (this.players.length == 0) {
      for (let index in this.$route.params) {
        this.search(this.$route.params[index]);
      }
    }
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scope>
#versus {
  #players {
    display: table;
    table-layout: fixed;
    border-collapse: separate;

    width: 100%;
    height: 100px;

    .player {
      display: table-cell;
      &:nth-child(1) {
        padding-right: 5px;
      }
      &:nth-child(2) {
        padding-left: 5px;
      }

      .player_title {
        position: fixed;
        background-color: $dark;
        width: 100%;
        a {
          text-decoration: none;
          small {
            font-family: "Teko", sans-serif;
            color: $light_color;
            font-size: 1.5em;
          }
          h2 {
            font-family: "Pubg";
            font-size: 3.5em;
            font-weight: 500;
            color: $light_color;
          }
        }

        &.small {
          font-size: 0.6em;
        }
      }

      .stats_group {
        &.first {
          margin-top: 90px;
        }
        h3 {
          font-family: "Teko", sans-serif;
          color: $light_color;
          font-weight: 400;
        }
        #stats {
          display: table;
          width: 100%;
          font-family: "Teko";
          font-weight: 400;
          border: solid 2px $main_color;
          border-spacing: 0px;
          h4 {
            background-color: $main_color;
            text-transform: uppercase;
          }
          .stat {
            display: table-cell;
            text-align: center;
            &:not(:last-child) {
              border-right: solid 1px $main_color;
            }
            &:not(:first-child) {
              border-left: solid 1px $main_color;
            }

            &.lower {
            }
            &.higher {
              background-color: $second_color;
            }
            &.middle {
            }
          }
        }
        #mastery {
          .weapon {
            font-family: "Teko";

            text-align: center;
            border: solid 2px $main_color;
            margin-bottom: 5px;
            h4 {
              background-color: $main_color;
              text-transform: uppercase;
            }
            .score {
              display: grid;
              grid-template-columns: 1fr 1fr;
              * {
                display: block;
              }
              div {
                &:nth-child(1) {
                  border-right: solid 1px $main_color;
                }
                &:nth-child(2) {
                  border-left: solid 1px $main_color;
                }
                .lower {
                }
                .higher {
                  background-color: $second_color;
                }
                .middle {
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
