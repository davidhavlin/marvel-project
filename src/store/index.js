import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorite: [],
    searchResults: [],
    lastSearchedWords: []
  },
  mutations: {
    pushWord(state, array) {
      state.lastSearchedWords = array
    },
    pushResults(state, array) {
      state.searchResults = array
    },
    pushFavorite(state, hero) {
      state.favorite.push(hero)
    },
    removeFavorite() {}
  },
  actions: {
    fetchResults(context, payload) {
      const key = process.env.VUE_APP_MARVELAPI
      const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${payload}&apikey=${key}`
      axios
        .get(url)
        .then(response => {
          const results = response.data.data.results
          console.log(results)

          context.commit('pushResults', results)
        })
        .catch(error => {
          // handle error
          console.log(error)
        })
        .then(() => {
          // always executed
        })
    },

    fiveSearchWords(context, payload) {
      let oldWords = context.state.lastSearchedWords
      if (oldWords.indexOf(payload) !== -1) return

      let newArray = []
      newArray = [...oldWords, payload]

      if (oldWords.length < 5) {
        context.commit('pushWord', newArray)
      } else {
        newArray.shift()
        context.commit('pushWord', newArray)
      }
    }
  },
  modules: {}
})
