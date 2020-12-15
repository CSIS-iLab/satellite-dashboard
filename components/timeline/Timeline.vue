<template>
  <div class="timeline-container">
    <div class="timeline-control">
      <div class="timeline-control-labels">
        <span class="timeline-label-header">Speed</span>
        <span class="timeline-label-value">
          <v-select
            :clearable="false"
            :options="playbackSpeeds"
            v-model="playbackSpeeds[0]"
            attach
            :menu-props="{ top: true, offsetY: true }"
          ></v-select>
        </span>
      </div>
    </div>
    <div class="timeline-series">
      <div class="timeline-current-value">
        <div class="timeline-value-change-back"></div>
        <div class="timeline-label-value-large">
          <client-only>
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
    </div>
    <div class="timeline-control">
      <div class="timeline-control-labels">
        <span class="timeline-label-header">Scale</span>
        <span class="timeline-label-value">
          <v-select
            :clearable="false"
            :options="timescales"
            v-model="chosenTimescale"
            attach
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
      playbackSpeeds: [
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
    }
  },
  methods: {
    selectNewDate(date) {
      this.$store.commit('satellites/updateTargetDate', date)
      this.$store.dispatch('satellites/getSatellites')
    },
    selectTimescale(timescale) {
      this.$store.commit('satellites/updateSelectedTimescale', timescale)
      this.$store.dispatch('satellites/getSatellites')
    }
  }
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select';

.timeline-container {
  display: flex;
  margin-top: 2em;
  color: #fff;
  background: rgba(0, 0, 0, 1);
}

.timeline-series {
  flex-grow: 1;
}

.timeline-control {
  display: flex;
}

.timeline-control-labels {
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.timeline-label-header {
  color: rgba(128, 128, 128, 0.8);
  text-transform: uppercase;
}

.timeline-control-button {
  width: 4em;
  height: 4em;
  margin: 1em;
  background: rgba(128, 128, 128, 0.5);
  border-radius: 50%;
}

.timeline-series {
  position: relative;
  flex-grow: 1;
}

.timeline-current-value {
  position: absolute;
  left: 50%;
  padding: 0.5em;
  transform: translateX(-50%);
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
</style>
