import Vue from 'vue'
import VueTippy, { TippyComponent } from 'vue-tippy'
import GlossaryTooltip from '~/components/global/GlossaryTooltip'

Vue.use(VueTippy)

Vue.component('tippy', TippyComponent)
Vue.component('GlossaryTooltip', GlossaryTooltip)
