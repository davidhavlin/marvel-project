<template>
  <div class="menu-links">
    <router-link to="/" exact>Home</router-link>
    <router-link class="favorite-link" to="/favorite" exact
      >Favorites<span><i class="fas fa-star"></i></span>({{
        favoriteCounter
      }})</router-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    favoriteCounter() {
      return this.$store.state.favorite.length
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-links {
  a {
    font-size: 0.9em;
    color: #6b88a3;
    text-decoration: none;

    &:hover,
    &:active {
      color: #ec1d24;
    }
  }

  .favorite-link {
    margin-left: 0.5rem;
  }

  .router-link-exact-active {
    color: #fff;
  }
}

@media (max-width: 620px) {
  .menu-links {
    order: 1;
    margin-bottom: 1rem;
  }
}
</style>
