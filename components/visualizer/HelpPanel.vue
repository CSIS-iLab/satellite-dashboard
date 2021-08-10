<template>
  <client-only>
    <tippy class="tippy--help" trigger="click" interactive @init="onTippyInit">
      <template v-slot:trigger>
        <button
          class="btn btn--controls btn--help"
          aria-label="Open Help Panel"
        >
          <Icon id="help" name="help" focusable="false" />
        </button>
      </template>

      <TabWrapper v-model="activeTab" scope="helpPanel">
        <Button
          class="btn btn--icon help__close"
          aria-label="Close Help Panel"
          @click="closePanel"
        >
          <Icon id="close-large" name="close-large" focusable="false" />
        </Button>
        <header class="help__panel-header">
          <TabList label="Controller" scope="helpPanel" class="help__buttons">
            <TabActivator tab="about" scope="helpPanel" class="tab--horizontal">
              Interactions
            </TabActivator>
            <TabActivator tab="view" scope="helpPanel" class="tab--horizontal">
              Interface Guide
            </TabActivator>
          </TabList>
        </header>

        <div class="help__panel-content">
          <TabPanel tab="about" scope="helpPanel">
            <dl>
              <div class="help__term--columns">
                <dt class="help__title">Pan</dt>
                <dd class="help__icon-layout">
                  <Icon id="pan-hand" name="pan-hand" /><span
                    class="help__icon-desc"
                    >Drag one finger</span
                  >
                </dd>
                <dd class="help__icon-layout">
                  <Icon id="pan-mouse" name="pan-mouse" /><span
                    class="help__icon-desc"
                    >Left click + drag</span
                  >
                </dd>
              </div>
              <div class="help__term--columns">
                <dt class="help__title help__title--line">Zoom</dt>
                <dd class="help__icon-layout">
                  <Icon id="zoom-hand" name="zoom-hand" /><span
                    class="help__icon-desc"
                    >Pinch Fingers</span
                  >
                </dd>
                <dd class="help__icon-layout">
                  <Icon id="zoom-mouse" name="zoom-mouse" /><span
                    class="help__icon-desc"
                    >Right click + drag, or scroll</span
                  >
                </dd>
              </div>
              <div class="help__term--columns">
                <dt class="help__title help__title--line">Rotate</dt>
                <dd class="help__icon-layout">
                  <Icon id="rotate-hand" name="rotate-hand" /><span
                    class="help__icon-desc"
                    >Drag fingers in different directions</span
                  >
                </dd>
                <dd class="help__icon-layout">
                  <Icon id="rotate-mouse" name="rotate-mouse" /><span
                    class="help__icon-desc"
                    >Middle click + drag or CTRL + Left/Right click + drag</span
                  >
                </dd>
              </div>
              <div class="help__term--columns">
                <dt class="help__title help__title--line">Tilt</dt>
                <dd class="help__icon-layout">
                  <Icon id="tilt-hand" name="tilt-hand" /><span
                    class="help__icon-desc"
                    >Drag two fingers</span
                  >
                </dd>
              </div>
            </dl>
          </TabPanel>
          <TabPanel tab="view" scope="helpPanel">
            <h2 class="panel__title">Left Sidebar</h2>
            <dl>
              <div class="help__term">
                <dt class="help__title">
                  <Icon
                    id="chevron-left"
                    name="chevron-left"
                    focusable="false"
                  />
                  Close Arrow
                </dt>
                <dd>
                  Click the
                  <Icon
                    id="chevron-left"
                    name="chevron-left"
                    focusable="false"
                  />
                  close arrow to collapse the side panel. Closing the panels
                  will not change the current view, remove filters, or remove
                  saved objects.
                </dd>
              </div>
              <div class="help__term">
                <dt class="help__title">
                  <Icon id="filter" name="filter" />
                  Filter
                </dt>
                <dd>
                  <p>
                    Use the Filter Panel to filter the objects in view by Name,
                    Norad ID, Country, Purpose, Status, and Users.
                  </p>
                  <p>
                    Once you have curated the filter options, click the “Apply”
                    button. You must apply at least one filter to view the list
                    of results.
                  </p>
                  <ul class="help__list help__list--inline" role="list">
                    <li>
                      <strong>Locate a result item in space:</strong> In the
                      results table, click the
                      <Icon id="orbit" name="orbit" /> orbit icon to zoom in on
                      a particular object and open a Details window that
                      provides more in-depth information about the object.
                    </li>
                    <li>
                      <strong>See applied filter categories:</strong>
                      The list of the active filter categories are listed at the
                      top of the panel for reference.
                    </li>
                    <li>
                      <strong>Edit filters:</strong> To edit the filters, click
                      the <Icon id="pen" name="pen" /> Edit icon.
                    </li>
                    <li>
                      <em>Note:</em> The date on the timeline does not affect
                      filter results. However, there will be a note to indicate
                      if an object listed in the results has not been launched
                      as of the active timeline date.
                    </li>
                  </ul>
                </dd>
              </div>
              <div class="help__term">
                <dt class="help__title">Focus List</dt>
                <dd>
                  <p>
                    The Focus List allows you to collect a set of hand-picked
                    satellites in one place.
                  </p>
                  <ul class="help__list help__list--inline" role="list">
                    <li>
                      <strong>Add an object:</strong>
                      To add an object to this list, click the
                      <Icon id="unpin" name="unpin" /> icon located near the
                      object’s name, such as in the filter results table or at
                      the top of the object’s Detail window. Once the object has
                      been added to the Focus List, the icon will appear filled
                      <Icon id="pin" name="pin" />. When at least one item has
                      been added to this list, opening this panel will remove
                      any unlisted satellite from view.
                    </li>
                    <li>
                      <strong>Edit the list:</strong>
                      To edit this list in the panel, click the
                      <Icon id="pen" name="pen" /> Edit icon. You can also click
                      the object’s <Icon id="pin" name="pin" /> icon to remove
                      it from the Focus Panel.
                    </li>
                  </ul>
                </dd>
              </div>
              <div class="help__term">
                <dt class="help__title">
                  <Icon id="reset" name="reset" /> Reset
                </dt>
                <dd>
                  Click the <Icon id="reset" name="reset" /> Reset button will
                  reset all applied filters, clear all selected satellites, and
                  reset the timeline to the current date and speed/time scales.
                </dd>
              </div>
            </dl>
            <h2 class="panel__title">Timeline</h2>
            <div class="help__term">
              <p>
                When first loaded, the positions of the satellites reflect data
                from 12AM UTC of the current day. You can see which day is
                selected via the large date label in the center of the timeline.
              </p>
              <p>
                The timeline only shows a certain period of time. By default, it
                only shows one week, starting on the current day and extending 7 days into the future.
              </p>
              <ul class="help__list help__list--inline" role="list">
                <li>
                  <strong
                    >Changing the date (and updating the satellite
                    positions):</strong
                  >
                  Press the <Icon id="play" name="play" /> play button to see
                  the satellites in the visualizer change position. The orange
                  <Icon id="playhead" name="playhead" /> playhead and the large
                  date label will reflect the active day. (Note that the player
                  will only play for the period of time visible on the
                  timeline.) You can also drag the playhead along the visible
                  timeline to change the satellite data.
                </li>
                <li>
                  <strong>Changing the date range on the timeline:</strong>
                  There are two ways you can update the range of dates in
                  view on the timeline:
                  <ol>
                    <li>
                      <strong>Change the scale:</strong> Update the “scale”
                      dropdown to change the period of time displayed in the
                      timeline.
                    </li>
                    <li>
                      <strong>Change the start date:</strong> To change scale’s
                      the starting date, click the
                      <Icon id="calendar" name="calendar" /> date picker.
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
            <h2 class="panel__title">Display Options</h2>
            <div class="help__term">
              <ul class="help__list help__list--icons" role="list">
                <li><Icon id="plus" name="plus" />Zoom in</li>
                <li><Icon id="minus" name="minus" />Zoom out</li>
                <li>
                  <Icon id="world" name="world" />Return to the initial position
                  and zoom level
                </li>
                <li>
                  <Icon id="sun-on" name="sun-on" />Add or remove the sun's
                  shadow on the earth
                </li>
              </ul>
            </div>
          </TabPanel>
        </div>
      </TabWrapper>
    </tippy>
  </client-only>
</template>

<script>
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'HelpPanel',
  components: {
    Icon,
    TabActivator,
    TabList,
    TabPanel,
    TabWrapper
  },
  data() {
    return {
      activeTab: 'about',
      tippyRef: null
    }
  },
  methods: {
    onTippyInit(el) {
      this.tippyRef = el
    },
    closePanel() {
      if (this.tippyRef) {
        this.tippyRef.hide()
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/help-panel';
</style>
