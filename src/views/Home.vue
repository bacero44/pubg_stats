<template>
  <div id="home">
    <Search :is_main="true"></Search>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Search: () => import("@/components/Search.vue"),
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
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
#home {
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
