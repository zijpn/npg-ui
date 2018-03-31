import StatusBar from '@/components/StatusBar.vue'
import { createLocalVue, shallow } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('StatusBar.vue', () => {
  const store = new Vuex.Store({
    state: {
      serverVersion: 'dev',
    },
  })
  it('render', () => {
    const msg = 'ui 0.1.0, server dev'
    const wrapper = shallow(StatusBar, {
      localVue,
      mocks: {
        $store: store,
      },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
