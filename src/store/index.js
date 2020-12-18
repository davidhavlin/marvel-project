import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allHeros: [],
    favorite: [],
    searchResults: [],
    lastSearchedWords: [],
    loading: false
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
    removeFavorite(state, array) {
      state.favorite = array
    },
    setLoading(state) {
      state.loading = !state.loading
    }
  },
  actions: {
    fetchResults(context, word) {
      context.commit('setLoading')
      const key = process.env.VUE_APP_MARVELAPI
      const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${word}&apikey=${key}`
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
          context.commit('setLoading')
        })
    },

    fiveSearchWords(context, newWord) {
      let oldWords = context.state.lastSearchedWords
      if (oldWords.indexOf(newWord) !== -1) return

      let newArray = []
      newArray = [...oldWords, newWord]

      if (oldWords.length < 5) {
        context.commit('pushWord', newArray)
      } else {
        newArray.shift()
        context.commit('pushWord', newArray)
      }
    },

    organizeWords(context, oldWord) {
      let newArray = [...context.state.lastSearchedWords]
      let index = newArray.findIndex(word => word === oldWord)
      newArray.splice(index, 1)
      newArray.push(oldWord)
      context.commit('pushWord', newArray)
    },

    removeFromFavorite(context, hero) {
      let newArray = [...context.state.favorite]
      let index = newArray.findIndex(item => item.id === hero.id)
      newArray.splice(index, 1)
      context.commit('removeFavorite', newArray)
    }
  },
  modules: {}
})
