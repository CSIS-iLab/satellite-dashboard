import Vue from 'vue'
import VueCesium from 'vue-cesium'

Vue.use(VueCesium, {
  cesiumPath: 'https://unpkg.com/cesium@1.84.0/Build/Cesium/Cesium.js',
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZjJhOGJjMi03NDAyLTRmOTEtOGM0OC05ZDZlYWRjN2Q5ZWYiLCJpZCI6MjkwMjUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTE3MjI4NzV9.yMqS4rU-P4ZXfth_2U3Tawn3KQ9C4AXX9pXuWj3_l4Q'
})
