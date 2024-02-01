<template>
  <div>
    <div v-for="(row, rowIndex) in movieRows" :key="rowIndex" class="movie-row">
      <div v-for="movie in row" :key="movie.id" class="movie-item">
        <h3>{{ movie.title }}</h3>
        <img :src="movie.poster_image_url" :alt="movie.title" />
        <p>Popularity: {{ movie.popularity_summary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: Array,
  },
  computed: {
    movieRows() {
      const chunkedMovies = [];
      for (let i = 0; i < this.movies.length; i += 5) {
        chunkedMovies.push(this.movies.slice(i, i + 5));
      }
      return chunkedMovies;
    },
  },
};
</script>

<style scoped>
.movie-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.movie-item {
  flex: 0 0 18%;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>