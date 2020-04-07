<template>
  <div>
    Site Header
    <nuxt />Site Footer
  </div>
</template>

<style lang="scss">
.container {
  --container-padding: #{rem(16px)};
  max-width: $size__container-max-width;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--container-padding);
  padding-left: var(--container-padding);

  @include breakpoint('medium') {
    --container-padding: #{rem(32px)};
  }
}

.content-wrapper {
  max-width: $size__content-max-width;
  margin-right: auto;
  margin-left: auto;
}
</style>
