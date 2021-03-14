<template>
  <div id="stat">
    <div id="stat_header">
      <h3>{{ stat.type_name }}</h3>
      <div>
        <button @click="show_secondary = !show_secondary">
          <span v-if="!show_secondary">+</span>
          <span v-if="show_secondary">-</span>
        </button>
      </div>
    </div>

    <div id="principal" class="table">
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
    </div>
    <div id="secondary" class="table" v-if="show_secondary">
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
  data() {
    return {
      show_secondary: false,
    };
  },
};
</script>

<style lang="scss" scoped>
#stat {
  margin-bottom: 10px;
  #stat_header {
    background-color: $second_color;
    display: grid;
    grid-template-columns: auto auto;
    padding: 0px 3px 0px 3px;
    h3 {
      display: flex;
      align-items: center;
      font-size: 1.2em;
      font-family: "Teko";
      font-weight: 400;

      text-transform: uppercase;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: flex-end;

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

  .table {
    border: solid 2px $second_color;
    border-top: none;
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

      small {
        color: $second_color;
      }
      p {
        font-size: 1.5em;
      }
    }
  }
  #secondary {
    &.table {
      .stats:nth-child(-n + 3) {
        border-bottom: solid 1px $light_color;
      }
    }
  }
}
</style>