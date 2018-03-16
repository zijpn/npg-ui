import StatusBar from '@/components/StatusBar.vue'
import { shallow } from '@vue/test-utils'

describe('StatusBar.vue', () => {
  it('renders', () => {
    const msg = 'ui 0.1.0, server dev'
    const wrapper = shallow(StatusBar, {
      //
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
