<template>
  <div>
    <input v-model="searchTerm" placeholder="Search for movies..." />
    <button @click="searchMovies">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    searchMovies() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>