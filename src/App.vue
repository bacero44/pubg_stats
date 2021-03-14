<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/Bacero44/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  background-color: $dark;
  width: 100%;
  min-height: 100vh;
  color: white;
  padding: 0 2vw 2vh 2vw;
}

#nav {
  position: fixed;
  top: 3vh;
  right: 2vw;
  z-index: 99;
  a {
    font-family: "Pubg";
    font-size: 1.5em;
    color: $second_color;
    &:not(:first-child) {
      margin-left: 5px;
    }
    text-decoration: none;
    border: solid 1px $second_color;
    padding: 6px 3px 2px 3px;
  }
}
</style>
