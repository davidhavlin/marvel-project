<template>
  <div>SKUSKA</div>
</template>

<script>
// import { hry } from './hry.js'
// import theLoader from '@/components/other/the-loader.vue'

export default {
  components: {
    // theLoader
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loaded: false,
      hra: null
    }
  },
  methods: {
    async bgColor(url) {
      const result = await analyze(url) // also supports base64 encoded image strings
      return result[0].color
    },

    async selectedGame() {
      this.hra = hry.find(game => game.slug === this.slug)
      this.hra.background = await this.bgColor(this.hra.img)

      setTimeout(() => {
        this.loaded = true
      }, 1000)
      return this.hra
    },

    goBack() {
      return this.$router.go(-1)
    }
  },

  mounted() {
    // this.selectedGame()
  }
}
</script>

<style lang="scss" scoped></style>
