<template>
  <div id="app">
    <TheNavigation />
    <main class="pages">
      <router-view />
    </main>
  </div>
</template>

<script>
import TheNavigation from '@/components/Navigation/TheNavigation.vue'

export default {
  components: {
    TheNavigation
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  background: #2c3e50;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.pages {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
