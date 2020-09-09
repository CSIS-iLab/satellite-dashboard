<template>
  <div class="input__wrapper">
    <label :for="id">{{ labelText }}</label>
    <input
      :id="id"
      type="text"
      :name="name"
      class="input"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    labelText: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/forms';
</style>
