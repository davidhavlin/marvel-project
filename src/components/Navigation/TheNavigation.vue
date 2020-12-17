<template>
  <div id="nav">
    <div class="nav-container">
      <NavLogo />
      <NavSearch />
      <NavMenu />
    </div>
  </div>
</template>

<script>
import NavSearch from '@/components/Navigation/nav-search.vue'
import NavLogo from '@/components/Navigation/nav-logo.vue'
import NavMenu from '@/components/Navigation/nav-menu.vue'
export default {
  components: {
    NavLogo,
    NavSearch,
    NavMenu
  }
}
</script>

<style lang="scss" scoped>
#nav {
  background: #263645;
  width: 100%;
  display: flex;
  justify-content: center;

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    padding: 1rem 1rem;
    flex-grow: 1;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
