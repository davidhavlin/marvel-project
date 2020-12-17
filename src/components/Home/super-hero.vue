<template>
  <router-link
    :to="{
      name: 'hero-page',
      params: { id: hero.id }
    }"
  >
    <div class="super-hero">
      <div class="hero-image">
        <img :src="image" alt="" />
      </div>
      <div class="hero-name">
        {{ hero.name }}
      </div>
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
    img {
      width: 100%;
      height: auto;
    }
  }
  .hero-name {
    color: #b9d4df;
    padding: 1rem;
    text-align: left;
  }
}
</style>
