<template>
  <div class="page-container">
    <div class="results-container">
      <div class="no-results">
        hero does not exist :[
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.results-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.no-results {
  grid-column: 1 / -1;
  height: 150px;
  border-radius: 5px;
  display: grid;
  justify-content: center;
  align-content: center;
  font-style: italic;
  color: #486786;
  background: #263645;
}
</style>
