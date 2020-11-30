<template>
  <div class="timeline-container">
    <div class="timeline-control">
      <div class="timeline-control-labels">
        <span class="timeline-label-header">Speed</span>
        <span class="timeline-label-value">1x</span>
      </div>
      <div class="timeline-control-button"></div>
    </div>
    <div class="timeline-series">
      <div class="timeline-current-value">
        <div class="timeline-value-change-back"></div>
        <div class="timeline-label-value-large">{{ currentTime }}</div>
        <div class="timeline-value-change-forward"></div>
      </div>
    </div>
    <div class="timeline-control">
      <div class="timeline-control-labels">
        <span class="timeline-label-header">Scale</span>
        <span class="timeline-label-value">Month</span>
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
  props: {},
  computed: {
    currentTime() {
      return new Date().toISOString()
    }
  }
}
</script>

<style lang="scss">
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
  padding: 0.5em;
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
</style>
