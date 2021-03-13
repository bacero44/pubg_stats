<template>
  <div id="stat">
    <h3>{{ stat.type_name }}</h3>

    <div id="table">
      <div class="stats">
        <small>Wins</small>
        <p>{{ stat.wins }}</p>
      </div>
      <div class="stats">
        <small>Kills</small>
        <p>{{ stat.kills }}</p>
      </div>
      <div class="stats">
        <small>Assists</small>
        <p>{{ stat.assists }}</p>
      </div>
      <div class="stats">
        <small>Damage</small>
        <p>{{ stat.damage }}</p>
      </div>
      <div class="stats">
        <small>Longest kill</small>
        <p>{{ stat.longest_kill }}</p>
      </div>
      <div class="stats">
        <small>Max Kill streaks</small>
        <p>{{ stat.max_kill_streaks }}</p>
      </div>
      <div class="stats">
        <small>Team Kills</small>
        <p>{{ stat.team_kills }}</p>
      </div>
      <div class="stats">
        <small>Top 10</small>
        <p>{{ stat.tops_ten }}</p>
      </div>
      <div class="stats">
        <small>Head Shot Kills</small>
        <p>{{ stat.head_shot_kills }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Stats",
  props: {
    stat: Object,
  },
};
</script>

<style lang="scss" scoped>
#stat {
  margin-bottom: 10px;
  h3 {
    padding: 5px 5px 0px 3px;
    font-family: "Pubg";
    font-weight: 400;
    background-color: $second_color;
  }

  #table {
    border: solid 2px $second_color;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .stats {
      font-family: "Teko";
      width: 100%;
      padding: 5px;
      text-align: center;
      &:nth-child(2),
      &:nth-child(5),
      &:nth-child(8) {
        border-left: solid 1px $light_color;
        border-right: solid 1px $light_color;
      }
      &:nth-child(-n + 6) {
        border-bottom: solid 1px $light_color;
      }
      small {
        color: $second_color;
      }
      p {
        font-size: 1.5em;
      }
    }
  }
}
</style>