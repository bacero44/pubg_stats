<template>
  <div id="player">
    <div id="player_title">
      <small>Player</small>
      <h2>{{ player }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "Player",
  props: {
    player: String,
  },
};
</script>
<style lang="scss">
#player {
  color: white;

  #player_title {
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
    }
  }
}
</style>
