<template>
  <div id="app" class="container mt-4">
    <div class="row">
      <SearchForm @search="searchMovies" />
    </div>
    <div class="row">
      <MovieList :movies="searchResults" />
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import MovieList from "@/components/MovieList.vue";
import axios from "axios";

export default {
  components: {
    SearchForm,
    MovieList,
  },
  data() {
    return {
      searchResults: [],
    };
  },
  methods: {
    async fetchMoviesFromWebService(searchTerm) {
      try {
        const response = await axios.get(`/api/movies`, {
          params: { title: searchTerm },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
      }
    },

    async searchMovies(searchTerm) {
      try {
        const data = await this.fetchMoviesFromWebService(searchTerm);
        this.searchResults = data;
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    },
  },
};
</script>