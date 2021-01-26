<template>
  <div class="timeline__container">
    <div class="timeline__speed">
      <span class="timeline-label-header">Speed</span>
      <span class="timeline-label-value">
        <v-select
          v-model="chosenPlaybackSpeed"
          :clearable="false"
          :options="playbackSpeeds"
          :menu-props="{ top: true, offsetY: true }"
          @input="selectPlaybackSpeed"
        ></v-select>
      </span>
    </div>
    <div class="timeline-control-button-container">
      <button class="timeline-control-button" @click="playOrPause">
        {{ isPlaying ? 'playing' : 'paused' }}
      </button>
    </div>
    <!-- <div class="timeline-control">
      <div class="timeline-control-labels">
        <span class="timeline-label-header">Speed</span>
        <span class="timeline-label-value">
          <v-select
            v-model="chosenPlaybackSpeed"
            :clearable="false"
            :options="playbackSpeeds"
            :menu-props="{ top: true, offsetY: true }"
            @input="selectPlaybackSpeed"
          ></v-select>
        </span>
      </div>
      <div class="timeline-control-button-container">
        <button class="timeline-control-button" @click="playOrPause">
          {{ isPlaying ? 'playing' : 'paused' }}
        </button>
      </div>
    </div> -->
    <div class="timeline-series">
      <div class="timeline-current-value">
        <div class="timeline-value-change-back"></div>
        <div class="timeline-label-value-large">
          <client-only>
            <div class="timeline-current-timepoint">
              {{ timelinePoint }}
            </div>
            <date-picker
              v-model="chosenDate"
              placeholder="MM/DD/YYYY"
              format="MM/dd/yyyy"
              calendar-class="datepicker-dark-calendar"
              input-class="datepicker-dark-input"
              @selected="selectNewDate"
            />
          </client-only>
        </div>
        <div class="timeline-value-change-forward"></div>
      </div>
      <div ref="scrubber" class="timeline-scrub"></div>
    </div>
    <div class="timeline__scale">
      <div class="timeline-control-labels">
        <span class="timeline-label-header">Scale</span>
        <span class="timeline-label-value">
          <v-select
            v-model="chosenTimescale"
            :clearable="false"
            :options="timescales"
            :menu-props="{ top: true, offsetY: true }"
            @input="selectTimescale"
          ></v-select>
        </span>
      </div>
    </div>
    <ul class="timeline__legend" role="list">
      <li data-status="active">Payload/active</li>
      <li>Payload/inactive</li>
      <li>Rocket Body</li>
      <li>Debris</li>
      <li>Uncategorized</li>
    </ul>
  </div>
</template>

<script>
import cesiumServiceProvider from '../../services/cesium-service'
const cesiumService = cesiumServiceProvider()
const playbackSpeeds = [
  {
    label: '1x',
    value: 1
  },
  {
    label: '10x',
    value: 10
  },
  {
    label: '100x',
    value: 100
  },
  {
    label: '1000x',
    value: 1000
  },
  {
    label: '10000x',
    value: 10000
  }
]
let cesium
export default {
  props: {
    selectedDate: {
      type: Date,
      required: true
    },
    timescales: {
      type: Array,
      required: true
    },
    selectedTimescale: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chosenDate: this.selectedDate,
      chosenTimescale: this.selectedTimescale,
      isPlaying: true,
      playbackSpeeds: playbackSpeeds,
      chosenPlaybackSpeed: playbackSpeeds[0],
      timelinePoint: this.selectedDate.toLocaleDateString()
    }
  },
  mounted() {
    cesiumService.getInstance().then((cesiumInstance) => {
      cesium = cesiumInstance
      const { viewer, Cesium } = cesiumInstance
      const timeline = viewer.timeline
      this.$refs.scrubber.insertBefore(timeline.container, null)
      timeline.container.addEventListener(
        'click',
        () => (this.isPlaying = false)
      )
      cesiumService.registerTimeline(timeline)
      timeline.resize()
      timeline.container.style.left = '0px'
      viewer.clockViewModel.shouldAnimate = true
      viewer.clock.onTick.addEventListener(() => {
        this.timelinePoint = Cesium.JulianDate.toDate(
          viewer.clock.currentTime
        ).toLocaleDateString()
      })
      const realDestroy = viewer.destroy
      viewer.destroy = () => {
        this.beforeViewerDestroy()
        realDestroy.bind(viewer)()
      }
    })
  },
  methods: {
    beforeViewerDestroy() {
      const { cesiumInstance } = cesiumService
      const { viewer } = cesiumInstance
      const timeline = viewer.timeline
      viewer.container
        .querySelector('.cesium-viewer')
        .insertBefore(timeline.container, null)
      cesiumService.deregisterInstance()
    },
    selectNewDate(date) {
      this.$store.commit('satellites/updateTargetDate', date)
      this.$store.dispatch('satellites/getSatellites')
    },
    selectPlaybackSpeed(playbackSpeed) {
      const { viewer } = cesium
      viewer.clock.multiplier = playbackSpeed.value
    },
    selectTimescale(timescale) {
      this.$store.commit('satellites/updateSelectedTimescale', timescale)
      this.$store.dispatch('satellites/getSatellites')
    },
    playOrPause() {
      if (!cesium) {
        return
      }
      const { viewer } = cesium
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
        viewer.clockViewModel.shouldAnimate = true
      } else {
        viewer.clockViewModel.shouldAnimate = false
      }
    }
  }
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select';
@import '../assets/css/components/timeline';
</style>
