<template>
  <div class="checkbox">
    <input
      :id="id"
      class="visually-hidden"
      type="checkbox"
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
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    id: { type: String, default: '' },
    value: { type: String, default: '' },
    modelValue: { type: Array, default: () => [] },
    label: { type: String, required: true },
    hideLabel: { type: Boolean, default: false },
    trueValue: { type: Boolean, default: true },
    falseValue: { type: Boolean, default: false }
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/checkbox';
</style>
