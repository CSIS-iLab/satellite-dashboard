<template>
  <div class="timeline__container">
    <div class="timeline__speed">
      <label for="timeline-speed" class="timeline__control-label">Speed</label>
      <v-select
        id="timeline-speed"
        v-model="chosenPlaybackSpeed"
        :clearable="false"
        :options="playbackSpeeds"
        :searchable="false"
        @input="selectPlaybackSpeed"
      >
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes">
            <Icon id="triangle-down" name="triangle-down" />
          </span>
        </template>
        <template #option="{ label }">
          <Icon id="check" name="check" />{{ label }}
        </template>
      </v-select>
    </div>
    <div class="timeline__control">
      <Button
        class="btn--control"
        :on-click="playOrPause"
        :data-playing="isPlaying"
        :aria-label="isPlaying ? 'Play' : 'Pause'"
      >
        <Icon v-show="!isPlaying" id="play" name="play" />
        <Icon v-show="isPlaying" id="pause" name="pause" />
      </Button>
    </div>
    <div class="timeline__player">
      <div class="timeline__date">
        <Button
          class="btn--date"
          :on-click="(e) => selectPrevNextDate(e, 'prev')"
          aria-label="Go to previous date"
        >
          <Icon id="boomarang-left" name="boomarang-left" />
        </Button>
        <div class="timeline__date-current">
          <client-only>
            <div class="timeline__date-label">
              {{ timelinePointFormatted }}
              <Icon id="calendar" name="calendar" />
            </div>
            <date-picker
              v-model="chosenDate"
              placeholder="MM/DD/YYYY"
              format="MM/dd/yyyy"
              prefix-class="sd"
              input-class="datepicker__input"
              @pick="selectNewDate"
            >
              <template v-slot:footer="{ emit }">
                <Button class="btn--outlined" @click="emit(new Date())"
                  >Today</Button
                >
              </template>
            </date-picker>
          </client-only>
        </div>
        <Button
          class="btn--date"
          :on-click="(e) => selectPrevNextDate(e, 'next')"
          aria-label="Go to next date"
        >
          <Icon id="boomarang-right" name="boomarang-right" />
        </Button>
      </div>
      <div ref="scrubber" class="timeline__player-scrub"></div>
    </div>
    <div class="timeline__scale">
      <label for="timeline-scale" class="timeline__control-label">Scale</label>
      <v-select
        id="timeline-scale"
        v-model="chosenTimescale"
        :clearable="false"
        :options="timescales"
        @input="selectTimescale"
      >
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes">
            <Icon id="triangle-down" name="triangle-down" />
          </span>
        </template>
        <template #option="{ label }">
          <Icon id="check" name="check" />{{ label }}
        </template>
      </v-select>
    </div>
    <div class="timeline__legend">
      <StatusTypesLegend />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import Button from '~/components/global/Button'
import Icon from '~/components/global/Icon'
import StatusTypesLegend from '~/components/global/StatusTypesLegend'

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
  components: { Button, Icon, StatusTypesLegend },
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
      isPlaying: false,
      playbackSpeeds: playbackSpeeds,
      chosenPlaybackSpeed: playbackSpeeds[0],
      timelinePoint: this.selectedDate,
      dateOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    }
  },
  computed: {
    timelinePointFormatted() {
      return this.timelinePoint.toLocaleDateString('en-US', this.dateOptions)
    }
  },
  mounted() {
    cesiumService.getInstance().then((cesiumInstance) => {
      cesium = cesiumInstance
      const { viewer, Cesium } = cesiumInstance

      const timeline = viewer.timeline

      /**
       *
       * Modify makeLabel function.
       * From: https://sandcastle.cesium.com/index.html#c=bZFPa8QgEMW/ypBTCkXpuUkobE9loYctPeXimtntsBMNOmbZln736qb/aFcQnfH93lPUGh5nDIEGhMEIwi45K+RdBPGwpxmBvTUMQiP2boWR0qiecsHkUE3Bi5fThGo0B1ybLTK03x5QF+oK3noHYLOnLGb3JaiFT7OHxGRc6SnxZVmo2wIFlBTcD5UV67LHjQRy+7qo3vPs3WwCzIRHDNnZ4fHL/fncq/vKnuuVd2LyzUNfFba6rpooJ8aupJVxR+Pkg0AKXCulBceJc3DU22QPKMrGuFwNoNG/0WagGWhoLySBZRNjPtkl5g29Yl91jc76fyh7M+R3lS9hcyqyl5tuvTSVUo3O5WVSvOetCX+cPwA
       *
       */

      viewer.timeline.makeLabel = function(time) {
        const localDate = Cesium.JulianDate.toDate(time)

        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
          timeZoneName: 'short',
          hour: '2-digit'
        }

        return localDate.toLocaleString('en-US', options)
      }

      this.$refs.scrubber.insertBefore(timeline.container, null)
      timeline.container.addEventListener(
        'click',
        () => (this.isPlaying = false)
      )
      cesiumService.registerTimeline(timeline)
      timeline.resize()
      timeline.container.style.left = '0px'
      viewer.clockViewModel.shouldAnimate = false
      viewer.clock.onTick.addEventListener(() => {
        this.timelinePoint = Cesium.JulianDate.toDate(viewer.clock.currentTime)
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
    stopPlayback() {
      this.isPlaying = false
      const { viewer } = cesium
      viewer.clockViewModel.shouldAnimate = false
    },
    selectNewDate(date) {
      this.stopPlayback()
      this.updateTargetDate(date)
      this.getOrbits()
    },
    selectPlaybackSpeed(playbackSpeed) {
      this.stopPlayback()
      const { viewer } = cesium
      viewer.clock.multiplier = playbackSpeed.value
    },
    selectTimescale(timescale) {
      this.stopPlayback()
      this.updateSelectedTimescale(timescale)
      this.getOrbits()
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
    },
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }

      return date.toLocaleString('en-US', options)
    },
    selectPrevNextDate(e, direction) {
      const milliseconds = this.chosenTimescale.value * 1000
      let newDate

      if (direction === 'next') {
        newDate = new Date(this.timelinePoint.getTime() + milliseconds)
      } else {
        newDate = new Date(this.timelinePoint.getTime() - milliseconds)
      }

      this.selectNewDate(newDate)
    },
    ...mapActions({
      getOrbits: 'satellites/getOrbits'
    }),
    ...mapMutations({
      updateSelectedTimescale: 'satellites/updateSelectedTimescale',
      updateTargetDate: 'satellites/updateTargetDate'
    })
  }
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select';
@import '~/assets/css/components/datepicker';
@import '../assets/css/components/timeline';
</style>
