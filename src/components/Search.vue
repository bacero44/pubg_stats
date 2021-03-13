<template>
  <div id="search">
    <form v-on:submit.prevent="search">
      <label>Player</label>
      <input
        type="text"
        placeholder="Name player"
        v-model="gametag"
        :disabled="disabled"
      />
      <div class="warning">
        <small v-if="min_characters_notice">Minimum 4 characters</small>
      </div>
      <div class="warning" id="notfound">
        <small v-if="notfound">Player {{ gametag }} not found</small>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Search",
  props: {
    is_main: Boolean,
  },
  data() {
    return {
      gametag: "",
      disabled: false,
      notfound: false,
    };
  },
  methods: {
    search() {
      if (this.gametag.length > 4) {
        this.disabled = true;
        this.fetch_player(this.gametag).then((response) => {
          this.disabled = false;
          if (response) {
            console.log("gol");
            if (this.is_main) {
              console.log("chaolin");
              this.$router.push("/" + this.gametag);
            }
          } else {
            this.notfound = true;
          }
        });
      }
    },
    ...mapActions(["fetch_player"]),
  },
  computed: {
    min_characters_notice: function () {
      if (this.gametag.length < 4 && this.gametag.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    gametag: function () {
      this.notfound = false;
    },
  },
};
</script>


<style lang="scss">
#search {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  display: block;

  label {
    color: $light_color;
    font-family: "Teko";
    line-height: 0em;
    font-size: 2em;
  }

  input {
    width: 100%;
    font-family: "Teko";
    font-size: 3em;
    line-height: 1.42857143;
    color: $light_color;
    background-color: transparent;
    height: 1em;
    padding: 0px;
    margin: 0px;

    border: 0px;
    vertical-align: baseline;

    outline: none;
    &:hover,
    &:focus {
      outline: none;
    }
    border-bottom: solid 2px $second_color;
  }
  button {
    font-size: 1.5em;
  }
  .warning {
    text-align: right;
    color: $gray;
    font-family: "Teko";
  }

  #notfound {
    color: red;
    font-size: 1.3em;
  }
}
</style>
