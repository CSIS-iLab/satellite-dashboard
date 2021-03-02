<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header id="modalTitle" class="modal__header">
          <slot name="header">
            This is the default tile!
            <Button
              type="button"
              class="modal__btn-close"
              aria-label="Close modal"
              :on-click="closeModal"
            >
              <Icon id="close-small" name="close-small" />
            </Button>
          </slot>
        </header>
        <section id="modalDescription" class="modal__body">
          <slot name="body">
            I'm the default body!
          </slot>
        </section>
        <footer class="modal__footer">
          <slot name="footer">
            THIS IS THE FOOOOTER!

            <Button
              type="button"
              class="modal__btn-slate"
              aria-label="Close modal"
              :on-click="close"
            >
              Close
              <Icon id="close-small" name="close-small" />
            </Button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from '~/components/global/Icon.vue'
import Button from '~/components/global/Button.vue'

export default {
  name: 'Modal',
  components: {
    Icon,
    Button
  },
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
