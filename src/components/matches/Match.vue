<template>
  <div id="match">
    <div id="place">
      <div>
        <h4>{{ match.place }}</h4>
        <small>Place</small>
      </div>
    </div>
    <div id="info">
      <div class="element two">
        <div>
          <small>Map</small>
          <p>{{ match.map }}</p>
        </div>
        <div>
          <small>Date</small>
          <p>{{ match.date }}</p>
        </div>
      </div>
      <div class="element two">
        <div>
          <small>Mode</small>
          <p>{{ match.mode }}</p>
        </div>
        <div>
          <small>Kills</small>
          <p>{{ match.kills }}</p>
        </div>
      </div>

      <div class="element" v-if="match.team.length > 0">
        <div id="title_team">
          <small>Team</small>
          <p>
            <button @click="show_team = !show_team">
              <span v-if="!show_team">+</span>
              <span v-if="show_team">-</span>
            </button>
          </p>
        </div>

        <div v-if="show_team" id="team">
          <div
            v-for="(player, index) in match.team"
            :key="index + 'player'"
            class="teammate"
          >
            <div class="mate">
              <small>Player</small>
              <p v-if="player.gametag != main_player">
                <router-link
                  :to="{ name: 'Player', params: { player: player.gametag } }"
                >
                  {{ player.gametag }}
                </router-link>
                <router-link
                  class="vs"
                  :to="{
                    name: 'Versus',
                    params: {
                      player1: main_player,
                      player2: player.gametag,
                    },
                  }"
                >
                  VS
                </router-link>
              </p>
              <p v-if="player.gametag == main_player">
                {{ player.gametag }}
              </p>
            </div>

            <div class="mate two">
              <div>
                <small>Kills</small>
                <p>{{ player.kills }}</p>
              </div>
              <div>
                <small>Kill Place</small>
                <p>{{ player.kill_place }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Match",

  props: {
    match: Object,
    main_player: String,
  },
  data() {
    return {
      show_team: false,
    };
  },
};
</script>
<style lang="scss" scoped>
#match {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 80%;
  #place {
    background-color: $second_color;
    color: white;
    text-align: center;
    font-family: "Teko";
    display: flex;
    align-items: center;
    justify-content: center;
    h4 {
      font-size: 2.5em;
      line-height: 0.8em;
    }
  }
  #info {
    display: block;
    border: solid 2px $second_color;
    font-family: "Teko";
    padding: 5px;
    small {
      color: $second_color;
    }

    .two {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    #title_team {
      background-color: $second_color;
      padding-left: 2px;
      padding-right: 2px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      small {
        color: white;
      }
      p {
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-top: 4px;
        button {
          background: none;
          color: inherit;
          border: none;
          line-height: 0px;
          font-family: "Teko";
          font-weight: 400;
          font-size: 2em;
          cursor: pointer;
          outline: inherit;
        }
      }
    }
    #team {
      background-color: $second_color;
      padding: 2px;

      .teammate {
        &:not(:last-child) {
          margin-bottom: 5px;
        }
        .mate {
          padding-left: 2px;
          border: solid 1px $dark;
          &:first-child {
            border-bottom: none;
          }
          &.two div:first-child {
            border-right: solid 1px $dark;
          }
          div {
            padding-left: 2px;
          }
          a {
            text-decoration: none;
            color: white;
            &.vs {
              color: $lightest_color;
            }
          }
        }
      }
      small {
        color: $dark;
      }
    }
  }
}
</style>