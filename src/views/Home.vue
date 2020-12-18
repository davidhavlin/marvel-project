<template>
  <article class="page-container">
    <LoadingComp v-if="loading" />
    <h3 class="results-title" v-if="!noResults() && !loading">
      Results for <i>"{{ lastWord }}"</i>
    </h3>
    <div v-show="!loading" class="results-container">
      <SuperHero v-for="hero in searchResults" :key="hero.id" :hero="hero" />
      <div v-if="noResults()" class="no-results">
        No results for "{{ lastWord }}"
      </div>
    </div>
  </article>
</template>

<script>
import SuperHero from '@/components/Home/super-hero.vue'
import LoadingComp from '@/components/LoadingComp.vue'

export default {
  name: 'Home',
  components: {
    SuperHero,
    LoadingComp
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults
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
  grid-template-columns: repeat(4, 1fr);
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
</style>
