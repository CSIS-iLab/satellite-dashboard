<template>
  <div class="input__wrapper">
    <input id="jack" v-model="checkedNames" type="checkbox" value="Jack" />
    <label for="jack">Jack</label>
    <input id="john" v-model="checkedNames" type="checkbox" value="John" />
    <label for="john">John</label>
    <input id="mike" v-model="checkedNames" type="checkbox" value="Mike" />
    <label for="mike">Mike</label>
    <br />
    <span>Checked names: {{ checkedNames }}</span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      checkedNames: []
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/forms';
</style>
