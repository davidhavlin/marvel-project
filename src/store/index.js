import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allHeros: [],
    favorites: [],
    searchResults: [],
    lastSearchedWords: [],
    loading: false,
    error: false,
    firstVisit: true
  },
  mutations: {
    setWords(state, array) {
      state.lastSearchedWords = array
    },
    setResults(state, array) {
      state.searchResults = array
    },
    pushFavorite(state, hero) {
      state.favorites.push(hero)
    },
    setFavorite(state, array) {
      state.favorites = array
    },
    setLoading(state, bool) {
      state.loading = bool
    },
    setError(state, bool) {
      state.error = bool
    },
    setFirstVisit(state, bool) {
      state.firstVisit = bool
    }
  },
  actions: {
    fetchResults(context, word) {
      context.commit('setLoading', true)
      // api key z env suboru ktory som naschval spristuplnil nech sa da stranka normalne vyskusat
      const key = process.env.VUE_APP_MARVELAPI
      // pouzil som tuto url, clovek nemusi zadat presny nazov hrdinu a je tam viac vysledkov
      const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${word}&apikey=${key}`
      axios
        .get(url)
        .then(response => {
          const results = response.data.data.results
          context.commit('setFirstVisit', false)
          context.commit('setResults', results)
        })
        .catch(error => {
          // ked nieco zlyha, otvori modal s oknom
          context.commit('setError', true)
        })
        .then(() => {
          // spusti sa vzdy, ukonci loading
          context.commit('setLoading', false)
        })
    },

    lastFiveWords(context, newWord) {
      let oldWords = context.state.lastSearchedWords
      if (oldWords.indexOf(newWord) !== -1) {
        // ked uz tam hladane slovicko je, len ho hodi nakoniec
        context.dispatch('organizeWords', newWord)
        return
      }

      let newArray = [...oldWords, newWord]

      if (oldWords.length < 5) {
        // pridavam slova a ked uz ich tam je 5, prve vzdy vyhodim
        context.commit('setWords', newArray)
      } else {
        newArray.shift()
        context.commit('setWords', newArray)
      }
    },

    organizeWords(context, oldWord) {
      // hladane slovicko ktore sa uz nachadza v historii hladania prehodi na koniec
      let newArray = [...context.state.lastSearchedWords]
      let index = newArray.findIndex(word => word === oldWord)
      newArray.splice(index, 1)
      newArray.push(oldWord)
      context.commit('setWords', newArray)
    },

    removeFromFavorite(context, hero) {
      // vymaze hrdinu z oblubenych hrdinov na zaklade indexu
      let newArray = [...context.state.favorites]
      let index = newArray.findIndex(item => item.id === hero.id)
      newArray.splice(index, 1)
      context.commit('setFavorite', newArray)
    },

    resetSearch(context) {
      // resetuje cele vyhladavanie aj s poslednymi hladanymi slovickami
      context.commit('setResults', [])
      context.commit('setWords', [])
      context.commit('setFirstVisit', true)
    }
  },
  modules: {}
})
