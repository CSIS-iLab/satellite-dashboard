<template>
  <div class="toggle">
    <input
      :id="id"
      type="checkbox"
      class="visually-hidden"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
    <label :for="id">
      <span :class="hideLabel ? 'visually-hidden' : ''">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    id: { type: String, default: '' },
    value: { type: String, default: '' },
    modelValue: { type: Boolean, default: false },
    label: { type: String, required: true },
    hideLabel: { type: Boolean, default: false },
    trueValue: { type: Boolean, default: true },
    falseValue: { type: Boolean, default: false }
  },
  computed: {
    isChecked() {
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked

      this.$emit('change', isChecked ? this.trueValue : this.falseValue)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/toggle';
</style>
