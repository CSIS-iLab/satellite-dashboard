import Vue from 'vue'

Vue.filter('pluralize', (word, amount) =>
  amount > 1 || amount === 0 ? `${word}s` : word
)
