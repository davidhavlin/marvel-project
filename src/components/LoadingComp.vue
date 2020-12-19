<template>
  <div class="loading">
    <h3>Loading...</h3>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  h3 {
    color: #6b88a3;
    font-weight: 100;
    font-style: italic;
  }
  margin: 4rem;
  animation: loading 1s infinite ease;
}

@keyframes loading {
  50% {
    transform: scale(1.2);
  }
}
</style>
