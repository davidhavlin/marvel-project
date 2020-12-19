<template>
  <article class="page-container">
    <LoadingComp v-if="loading" />
    <h3 class="results-title" v-if="!noResults() && !loading">
      Results for <i>"{{ lastWord }}"</i>
    </h3>
    <div v-show="!loading" class="results-container">
      <SuperHero v-for="hero in searchResults" :key="hero.id" :hero="hero" />
      <div v-if="noResults() && !firstVisit" class="no-results">
        No results for "{{ lastWord }}"
      </div>
      <div v-if="firstVisit" class="welcome-container">
        <div class="welcome-content">
          Welcome to <NavLogo class="logo" /> <span>Super Heroes Website</span>
          <br />
          search for your favorite heroes!
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import SuperHero from '@/components/Home/super-hero.vue'
import LoadingComp from '@/components/LoadingComp.vue'
import NavLogo from '@/components/Navigation/nav-logo.vue'

export default {
  name: 'Home',
  components: {
    SuperHero,
    LoadingComp,
    NavLogo
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults
    },

    firstVisit() {
      return this.$store.state.firstVisit
    },

    lastWord() {
      const words = this.$store.state.lastSearchedWords
      return words[words.length - 1]
    },

    loading() {
      return this.$store.state.loading
    }
  },

  methods: {
    noResults() {
      return this.searchResults.length < 1
    }
  }
}
</script>

<style lang="scss" scoped>
.results-title {
  color: #6b88a3;
}
.results-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.no-results {
  grid-column: 1 / -1;
  height: 150px;
  border-radius: 5px;
  display: grid;
  justify-content: center;
  align-content: center;
  font-style: italic;
  color: #486786;
  background: #263645;
}

.welcome-container {
  grid-column: 1 / -1;
  font-size: 2em;
  line-height: 4rem;
  color: #7192b1;
  height: 400px;
  display: grid;
  justify-content: center;
  align-content: center;

  span {
    color: #fff;
    font-weight: bold;
  }

  .logo {
    transform: none;
    pointer-events: none;
    display: inline-block;
    transform: translateY(14px);
  }
}
</style>
