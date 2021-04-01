<template>
  <div id="app">
    <div id="main_bar">
      <div id="page_title">
        <router-link to="/about">
          <h1>Pubg Stats</h1>
          <small>By Bacero44</small>
        </router-link>
      </div>
      <div id="menu">
        <router-link to="/" v-if="this.$route.name != 'Home'">Home</router-link>
      </div>
    </div>
    <div id="player_bar" v-if="this.$route.name != 'Versus'">
      <router-link
        id="content"
        :to="{ name: 'Player', params: { player: main_player.nametag } }"
      >
        <div
          id="player_title"
          v-bind:class="{ small: isScroll || main_player.nametag == '' }"
        >
          <small v-if="main_player.nametag != ''">Player</small>
          <h2 v-if="main_player.nametag != ''">{{ main_player.nametag }}</h2>
        </div>
      </router-link>
    </div>
    <div id="main">
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["main_player"]),
  },
  data() {
    return {
      isScroll: false,
    };
  },
  methods: {
    handleScroll() {
      const pt = document.getElementById("player_title").offsetHeight;
      if (document.getElementById("main").getBoundingClientRect().top < pt) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    },
  },

  created: function () {
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
#app {
  position: relative;
  background-color: $dark;
  width: 100%;
  min-height: 100vh;
  color: white;
  padding: 0vh 2vw 2vh 2vw;
  #main_bar {
    width: 100%;
    background-color: $dark;
    position: fixed;
    left: 0;
    bottom: 0px;
    padding: 5px 2vw 5px 2vw;
    display: grid;
    grid-template-columns: auto 1fr;
    #page_title {
      position: relative;
      font-family: "Pubg";
      color: $main_color;
      a {
        text-decoration: none;
        color: $main_color;
      }
      h1 {
        font-size: 1.8em;
        font-family: "Pubg";
        font-weight: 400;
        margin-bottom: -8px;
      }
      small {
        font-size: 0.9em;
        font-family: "Teko";
        line-height: 10px;
      }
    }
    #menu {
      display: flex;
      align-items: center;
      margin-left: auto;
      a {
        font-family: "Pubg";
        font-size: 1.2em;
        color: $light_color;
        &:not(:first-child) {
          margin-left: 5px;
        }
        text-decoration: none;
        border: solid 1px $second_color;
        padding: 6px 3px 2px 3px;
      }
    }
  }
  #player_bar {
    background-color: $dark;
    position: sticky;
    top: 0;
    #content {
      position: relative;
      text-decoration: none;
      width: 100%;

      #player_title {
        padding-top: 2px;
        small {
          font-family: "Teko", sans-serif;
          color: $light_color;
          font-size: 1.5em;
        }
        h2 {
          font-family: "Pubg";
          font-size: 5em;
          font-weight: 500;
          color: $light_color;
          overflow-wrap: anywhere;
          margin-top: -2px;
        }
        &.small {
          font-size: 0.5em;
        }
      }
    }
  }
  #main {
    margin-bottom: 3em;
  }
}
</style>
