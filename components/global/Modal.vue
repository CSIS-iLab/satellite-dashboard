<template>
  <div class="modal-backdrop">
    <div
      class="modal"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <header class="modal-header">
        <slot name="header">
          This is the default tile!

          <button type="button" class="btn-close" @click="close">
            x
          </button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          I'm the default body!
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          I'm the default footer!

          <button type="button" class="btn-green" @click="close">
            Close me!
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/components/modal';
</style>
