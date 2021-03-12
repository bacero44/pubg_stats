<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
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
  padding: 2vh 2vw 2vh 2vw;
}

#nav {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
