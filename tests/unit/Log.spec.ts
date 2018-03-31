import Log from '@/components/Log.vue'
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.directive('tooltip', {})
localVue.component('font-awesome-icon', { render: (h) => h() })

describe('Log.vue', () => {
  it('render', () => {
    const wrapper = mount(Log, { localVue })
    expect(wrapper.text()).toMatch('empty log')
    expect(wrapper.vm.logs).toEqual([])
    expect(wrapper.vm.selected).toMatch('Info')
  })

  it('append log', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.appendLog({
      level: 'info',
      msg: 'info string',
      timestamp: new Date(),
    })
    expect(wrapper.vm.logs.length).toEqual(1)
  })

  it('clear log', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.appendLog({
      level: 'info',
      msg: 'info string',
      timestamp: new Date(),
    })
    wrapper.vm.clearLogs()
    expect(wrapper.vm.logs.length).toEqual(0)
  })
})
