<template>
  <article class="page-container">
    <h2 style="textAlign:left">Your Favorite SuperHeroes</h2>
    <transition-group name="hero" tag="div" class="results-container">
      <SuperHero v-for="hero in favoriteHeroes" :key="hero.id" :hero="hero" />
    </transition-group>
    <div v-if="favoriteHeroes.length < 1" class="no-results">
      You have no favorite Super Heroes :(
    </div>
  </article>
</template>

<script>
import SuperHero from '@/components/Home/super-hero.vue'

export default {
  components: {
    SuperHero
  },
  computed: {
    favoriteHeroes() {
      return this.$store.state.favorites
    }
  }
}
</script>

<style lang="scss" scoped>
.results-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
  gap: 1rem;
}

.no-results {
  height: 150px;
  border-radius: 5px;
  display: grid;
  justify-content: center;
  align-content: center;
  font-style: italic;
  color: #486786;
  background: #263645;
  opacity: 0;
  animation: fadein 0.5s forwards ease;
  animation-delay: 0.3s;
}
@keyframes fadein {
  to {
    opacity: 1;
  }
}

.hero-enter-active,
.hero-leave-active {
  transition: all 0.3s;
}
.hero-enter, .hero-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0.9);
}
</style>
