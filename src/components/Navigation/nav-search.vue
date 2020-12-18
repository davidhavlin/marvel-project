<template>
  <form @submit.prevent="searchHeroes()" class="search-container">
    <input
      v-model="searchValue"
      ref="searchInput"
      class="search-input"
      type="text"
      placeholder="Search your SuperHeroes.."
    />
    <button class="search-icon">
      <i class="fas fa-search"></i>
    </button>

    <div class="last-searched-words">
      <div
        @click="searchAgain(word)"
        class="word"
        v-for="word in lastSearchedWords"
        :key="word"
      >
        {{ word }}
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchValue: ''
    }
  },
  mounted() {
    this.$refs.searchInput.focus()
  },
  computed: {
    lastSearchedWords() {
      return this.$store.state.lastSearchedWords
    }
  },
  methods: {
    searchHeroes() {
      if (!this.searchValue) return
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/')
      }
      //   this.$store.dispatch('fetchResults', this.searchValue.trim())
      this.$store.dispatch('fiveSearchWords', this.searchValue.trim())
      this.searchValue = ''
      this.$refs.searchInput.focus()
    },

    searchAgain(word) {
      this.searchValue = word
      this.$refs.searchInput.focus()
      this.$store.dispatch('organizeWords', word)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: #2c3e50;
  border-radius: 10px;
  padding: 0 1.3rem;

  .search-input {
    width: 100%;
    padding: 0.8rem 0;
    font-size: 1em;
    background: transparent;
    color: #fff;
    border: none;
    outline: none;
  }

  .search-icon {
    font-size: 1.2em;
    margin-left: 1rem;
    color: #ec1d24;
    height: 100%;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;

    &:hover {
      color: #fff;
    }
  }

  ::placeholder {
    color: #6b88a3;
  }

  .last-searched-words {
    position: absolute;
    font-size: 0.7em;
    display: flex;
    bottom: -18px;
    left: 0;

    .word {
      margin-right: 0.2rem;
      padding: 0.1rem 0.4rem;
      background: #ec1d24;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}

@media (max-width: 620px) {
  .search-container {
    order: 2;
    width: 100%;
  }
}
</style>
