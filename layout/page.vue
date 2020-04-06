<template>
  <div class="container">
    <header class="page__header">
      <h1 class="page__title">{{ title }}</h1>
      <slot name="header"></slot>
    </header>
    <main class="page__content" :class="{ 'page__content--bg': contentHasBg }">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    contentHasBg: {
      type: Boolean,
      default: false
    }
  },
  head: {
    bodyAttrs: {
      class: 'page-layout'
    }
  }
}
</script>

<style lang="scss">
.page {
  &__header {
    margin-top: rem(32px);
    margin-bottom: rem(24px);

    @include breakpoint('medium') {
      margin-top: rem(48px);
      margin-bottom: rem(32px);
    }

    @include breakpoint('large') {
      margin-top: rem(54px);
    }
  }

  &__title {
    color: $color-white-100;
    @extend %font-ui-heading-page-title-base;
    text-align: center;
  }

  &__content {
    padding-top: rem(32px);
    padding-bottom: rem(48px);

    @include breakpoint('medium') {
      padding-top: rem(64px);
      padding-bottom: rem(64px);
    }

    @include breakpoint('large') {
      padding-top: rem(80px);
      padding-bottom: rem(80px);
    }

    &.page__content--bg {
      color: $color-black-190;
      background: $color-white-100;

      // Ensures that background extends to edges on mobile devices
      @include breakpoint($break: 'medium', $dir: 'max-width') {
        @include full-width-background(
          $background: $color-white-100,
          $includeMargins: true
        );
      }
    }
  }
}
</style>
