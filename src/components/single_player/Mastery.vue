<template>
  <div id="item">
    <div id="level">
      <div>
        <h3>{{ mastery.name }}</h3>
        <h4>{{ mastery.level }}</h4>
        <small>Level</small>
      </div>
    </div>
    <div id="stast">
      <div>
        <small>Kills</small>
        <p>{{ mastery.kills }}</p>
      </div>
      <div>
        <small>Most Kills</small>
        <p>{{ mastery.most_kills }}</p>
      </div>
      <div>
        <small>Headshots</small>
        <p>{{ mastery.head_shots }}</p>
      </div>
      <div>
        <small>Most Headshots</small>
        <p>{{ mastery.most_head_shots }}</p>
      </div>
      <div>
        <small>Groggies</small>
        <p>{{ mastery.groggies }}</p>
      </div>
      <div>
        <small>Most Groggies</small>
        <p>{{ mastery.most_groggies }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Mastery",
  props: {
    mastery: Object,
  },
};
</script>
<style lang="scss" scoped>
#item {
  font-family: "Teko";
  display: grid;
  grid-template-columns: 25% 1fr;
  margin-bottom: 1vh;
  #level {
    background-color: $second_color;
    text-align: center;
    padding: 5px 5px 5px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 100%;
      h3 {
        text-align: center;
        line-height: 0.8em;
        margin-bottom: 5px;
        text-transform: uppercase;
        word-wrap: break-word;
      }
      h4 {
        color: white;
        font-size: 2.5em;
        line-height: 0.8em;
      }
    }
  }

  #stast {
    display: grid;
    padding: 5px;
    grid-template-columns: 1fr 1fr 1fr;
    border: solid 2px $main_color;
    border-left: none;
    small {
      color: $second_color;
    }
  }
}
</style>