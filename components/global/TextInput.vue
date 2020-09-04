<template>
  <div>
    <input v-model="message" class="textInput" placeholder="Placeholder Text" />
    <p class="test">Message: {{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/text-input';
</style>
