import Log from '@/components/Log.vue'
import { createLocalVue, mount } from '@vue/test-utils'

// wrapper.vm is typed as a generic Vue instance (shims.d.ts)
// https://github.com/vuejs/vue-test-utils/issues/255

const localVue = createLocalVue()
localVue.directive('tooltip', {})
localVue.component('font-awesome-icon', { render: (h) => h() })

describe('Log.vue', () => {
  it('render', () => {
    const wrapper = mount(Log, { localVue })
    expect(wrapper.text()).toMatch('empty log')
    // @ts-ignore
    expect(wrapper.vm.logs).toEqual([])
    // @ts-ignore
    expect(wrapper.vm.selected).toMatch('Info')
  })

  it('append log', () => {
    const wrapper = mount(Log, { localVue })
    // @ts-ignore
    wrapper.vm.appendLog({
      level: 'info',
      msg: 'info string',
      timestamp: Date.now(),
    })
    // @ts-ignore
    expect(wrapper.vm.logs.length).toEqual(1)
  })

  it('clear log', () => {
    const wrapper = mount(Log, { localVue })
    // @ts-ignore
    wrapper.vm.appendLog({
      level: 'info',
      msg: 'info string',
      timestamp: Date.now(),
    })
    // @ts-ignore
    wrapper.vm.clearLogs()
    // @ts-ignore
    expect(wrapper.vm.logs.length).toEqual(0)
  })
})
