import StatusBar from '@/components/StatusBar.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('StatusBar.vue', () => {
  let store: any

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        serverVersion: 'dev',
      },
    })
  })

  it('render', () => {
    const msg = 'ui:0.1.0server:dev'
    const wrapper = shallowMount(StatusBar, {
      localVue,
      store,
    })
    expect(wrapper.text().replace(/\s/g, '')).toMatch(msg)
  })
})
