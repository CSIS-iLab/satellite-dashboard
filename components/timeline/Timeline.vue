<template>
  <div class="timeline-container">
    <div class="timeline-control">
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
    </div>
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
    <div class="timeline-control">
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
    <div class="timeline-key">
      <ul>
        <li>Payload/active</li>
        <li>Payload/inactive</li>
        <li>Rocket Body</li>
        <li>Debris</li>
        <li>Uncategorized</li>
      </ul>
    </div>
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
      timelinePoint: this.selectedDate
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
    })
  },
  methods: {
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

.timeline-container {
  display: flex;
  min-height: 300px;
  margin-top: 2em;
  color: #fff;
  background: rgba(0, 0, 0, 1);
}

.timeline-series {
  flex-grow: 1;
}

.timeline-scrub {
  position: relative;
  height: 30px;
}

.timeline-control {
  display: flex;
  margin-top: 50px;
}

.timeline-control-labels {
  display: flex;
  flex-direction: column;
  padding: 0 1em;
}

.timeline-label-header {
  color: rgba(128, 128, 128, 0.8);
  text-transform: uppercase;
}

.timeline-control-button {
  width: 4em;
  height: 4em;
  margin: 0 1em;
  background: rgba(128, 128, 128, 0.5);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}

.timeline-series {
  position: relative;
  flex-grow: 1;
}

.timeline-current-value {
  margin: 0 auto;
  padding: 0.5em;
  text-align: center;
}

.timeline-key {
  flex-grow: 0.5;
  font-size: 0.8em;
}

.timeline-key ul {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100px;
  margin: 0 0 0 1em;
}

.timeline-container .datepicker-dark-calendar {
  bottom: 0;
  padding: 1em;
  background: #222;
  border: 0;
}

.timeline-container .datepicker-dark-input {
  width: 8em;
  padding: 0 1em;
  color: #fff;
  background: #222;
  border: 0;
}

.timeline-container .datepicker-dark-input:focus {
  background: #333;
  outline: 0;
}

.timeline-container .datepicker-dark-calendar .up:not(.disabled):hover {
  background: #444;
}

.timeline-container .vs__selected {
  color: #ddd;
}

.cesium-viewer-animationContainer {
  display: none;
}

.cesium-viewer .cesium-widget-credits {
  display: none !important;
}

.cesium-timeline-bar {
  height: 2.5em;
}

.timeline-series .vdp-datepicker {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
}

.timeline-series .vdp-datepicker input {
  cursor: pointer;
  opacity: 0;
}
</style>
