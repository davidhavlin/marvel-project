<template>
  <router-link
    class="super-hero"
    :to="{
      name: 'hero-page',
      params: { id: hero.id }
    }"
  >
    <div class="hero-image">
      <img :src="image" alt="" />
    </div>
    <div class="hero-content">
      <div class="hero-name">
        {{ hero.name }}
      </div>
      <button
        v-if="!isFavorite(hero)"
        class="favorite-btn add"
        @click.prevent="addToFavorite(hero)"
      >
        <i class="far fa-star"></i>
      </button>
      <button
        v-if="isFavorite(hero)"
        class="favorite-btn remove"
        @click.prevent="removeToFavorite(hero)"
      >
        <i class="fas fa-ban"></i>
      </button>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    hero: {
      type: Object
    }
  },
  computed: {
    image() {
      return this.hero.thumbnail.path + '/standard_large.jpg'
    }
  },
  methods: {
    addToFavorite(hero) {
      this.$store.commit('pushFavorite', hero)
    },
    removeToFavorite(hero) {
      this.$store.dispatch('removeFromFavorite', hero)
    },
    isFavorite(hero) {
      // vrati true alebo false podla toho ci je hrdina v oblubenych
      return this.$store.state.favorites.some(item => item.id === hero.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.super-hero {
  background: #263645;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  .hero-image {
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease;
    }
  }

  .hero-content {
    display: grid;
    grid-template-columns: 4fr 1fr;
    align-items: baseline;
  }

  .hero-name {
    color: #6b88a3;
    padding: 1rem;
    text-align: left;
  }

  &:hover {
    .hero-image {
      img {
        transform: scale(1.2);
      }
    }
    .hero-name {
      color: #fff;
    }
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
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}
</style>
