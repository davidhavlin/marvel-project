<template>
  <article class="page-container">
    <button class="back-btn" @click="goBack()">
      <i class="fas fa-angle-double-left"></i>
      <span>
        go back
      </span>
    </button>
    <div class="hero-container">
      <h2 class="hero-name">{{ selectedHero.name }}</h2>
      <section class="hero-landscape">
        <img :src="heroImage" alt="Hero image" />
        <button
          class="favorite-btn add"
          @click="addToFavorite()"
          v-if="!isFavorite()"
        >
          <i class="far fa-star"></i> Add to Favorite
        </button>
        <button
          class="favorite-btn remove"
          @click="removeToFavorite()"
          v-if="isFavorite()"
        >
          <i class="fas fa-ban"></i> Remove from Favorite
        </button>
      </section>
      <section class="hero-description">
        <h5>description:</h5>
        <p>{{ selectedHero.description || 'No description for this hero' }}</p>
        <br />
        <h5>events:</h5>
        <p>
          {{
            firstFiveEvents(selectedHero.events.items) ||
              'No events for this hero'
          }}
        </p>
        <br />
        <div class="text-content">
          <a
            v-if="selectedHero.urls[0]"
            class="buy-btn"
            :href="selectedHero.urls[0].url"
            target="_blank"
            >More info</a
          >
          <a
            v-if="selectedHero.urls[2]"
            class="buy-btn"
            :href="selectedHero.urls[2].url"
            target="_blank"
            >Buy comics</a
          >
        </div>
      </section>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      heroId: +this.$route.params.id
    }
  },
  mounted() {
    console.log('z hero pagu: ' + this.$route.params.id)
  },

  computed: {
    selectedHero() {
      // vyhlada kliknuteho hrdinu zo search a oblubenych vysledkov na zaklade id.
      let heros = [
        ...this.$store.state.searchResults,
        ...this.$store.state.favorites
      ]
      return heros.find(hero => hero.id === this.heroId)
    },
    heroImage() {
      return this.selectedHero.thumbnail.path + '/standard_fantastic.jpg'
    }
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },

    firstFiveEvents(comics) {
      // vypise 5 poslednych eventov hrdinu
      let string = ''
      comics.map((item, index) => {
        if (index < 5) string += item.name + ', '
        else if (index === 5) string += item.name
      })
      return string
    },

    addToFavorite() {
      this.$store.commit('pushFavorite', this.selectedHero)
    },
    removeToFavorite() {
      this.$store.dispatch('removeFromFavorite', this.selectedHero)
    },

    isFavorite() {
      // vracia true/false podla toho ci je alebo nieje v oblubenych
      return this.$store.state.favorites.some(item => item.id === this.heroId)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 1rem;
  position: relative;
}

.hero-container {
  max-width: 600px;
  position: relative;
  margin: 0 auto;
  margin-top: 6rem;
  background: #263645;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
}
.hero-landscape {
  position: relative;
  margin-right: 1rem;
  text-align: left;

  img {
    border: 2px solid #6b88a3;
    display: block;
  }
}

.hero-name {
  position: absolute;
  left: 0;
  top: -2rem;
  margin: 0;
}
.buy-btn {
  font-size: 0.9rem;
  padding: 0.4rem 0.5rem;
  color: #1b2630;
  font-weight: bold;
  background: #6b88a3;
  border-radius: 10px;

  &:first-child {
    margin-right: 0.5rem;
  }
}
.favorite-btn.remove {
  color: #ffd710;
}
.favorite-btn {
  background: transparent;
  border: none;
  outline: none;
  color: #10ffb2;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 0.7rem;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}

.back-btn {
  display: flex;
  align-items: center;
  position: absolute;
  padding: 0;
  left: 1rem;
  background: transparent;
  color: #fff;
  font-size: 2.5rem;
  border: none;
  cursor: pointer;

  span {
    font-size: 1rem;
    margin-left: 0.5rem;
  }

  &:hover {
    color: #ec1d24;
  }
}

.hero-description {
  position: relative;
  width: 100%;

  .text-content {
    text-align: right;
    bottom: 0;
    right: 0;
    position: absolute;
  }
  h5 {
    margin: 0;
    text-align: left;
    color: #6b88a3;
  }
  p {
    text-align: left;
    font-size: 0.9rem;
    margin: 0.7rem 0;
  }
}
</style>
