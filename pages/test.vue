<template>
  <div class="test">
    <Button class="btn--controls" :on-click="showModal">
      Open Modal!
    </Button>
    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Lorem Ipsum
        <Button
          type="button"
          class="modal__btn-close-icon"
          aria-label="Close modal"
          :on-click="closeModal"
        >
          <Icon id="close-small" name="close-small" />
        </Button>
      </template>
      <template v-slot:body>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo
          consequat lectus, a fringilla sem dictum gravida. Suspendisse semper
          volutpat ipsum et luctus. Morbi a iaculis lectus. Proin sit amet
          fermentum est, nec varius ante.
        </p>
      </template>
      <template v-slot:footer>
        <div class="modal__footer-left">
          <Button type="button" class="modal__btn-footer" aria-label="Print">
            <Icon id="printer" name="printer" />
            Printer
          </Button>
        </div>
        <div class="modal__footer-right">
          <Button
            type="button"
            class="modal__btn-footer"
            aria-label="Close modal"
            :on-click="closeModal"
          >
            CSV
          </Button>
          <Button
            type="button"
            class="modal__btn-footer"
            aria-label="Close modal"
            :on-click="closeModal"
          >
            JPG
          </Button>
          <Button
            type="button"
            class="modal__btn-footer"
            aria-label="Close modal"
            :on-click="closeModal"
          >
            SVG
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Icon from '~/components/global/Icon.vue'
import Button from '~/components/global/Button.vue'
import Modal from '~/components/global/Modal'

export default {
  name: 'Test',
  components: {
    Icon,
    Button,
    Modal
  },
  data() {
    return {
      isModalVisible: false
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    }
  }
}
</script>

<style>
.test {
  display: flex;
  justify-content: center;
}
</style>
