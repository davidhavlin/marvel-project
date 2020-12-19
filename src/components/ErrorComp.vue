<template>
  <div class="error-modal">
    <div class="error">
      <p>
        Something went wrong :(
      </p>

      <button @click="closeModal()" class="ok-btn">ok</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$store.commit('setError', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.error-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #263645a6;
  z-index: 1000;

  .error {
    padding: 2rem;
    background: #1a2631;
    border-radius: 10px;
  }

  .ok-btn {
    padding: 0.5rem 1rem;
    background: #ec1d24;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    outline: none;
    cursor: pointer;

    &:hover {
      background: #9d1217;
    }
  }
}
</style>
