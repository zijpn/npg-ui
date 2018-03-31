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

  it('append', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.appendLog({
      level: 'info',
      msg: 'info string',
      timestamp: new Date(),
    })
    expect(wrapper.vm.logs.length).toEqual(1)
  })

  it('clear', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.appendLog({
      level: 'info',
      msg: 'info string',
      timestamp: new Date(),
    })
    wrapper.vm.clearLogs()
    expect(wrapper.vm.logs.length).toEqual(0)
  })

  it ('filter', () => {
    const wrapper = mount(Log, { localVue })
    expect(wrapper.vm.logs.length).toEqual(0)
    expect(wrapper.vm.selected).toMatch('Info')
    wrapper.vm.appendLog({
      level: 'debug',
      msg: 'debug string',
      timestamp: new Date(),
    })
    expect(wrapper.vm.logs.length).toEqual(1)
    expect(wrapper.vm.filteredLogs.length).toEqual(0)
  })

  it ('debug', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.selected = 'debug'
    wrapper.vm.appendLog({
      level: 'debug',
      msg: 'debug string',
      timestamp: new Date(),
    })
    expect(wrapper.vm.filteredLogs.length).toEqual(1)
    const tr = wrapper.find('tr')
    expect(tr.attributes().class).toMatch('debug')
  })

  it('info', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.appendLog({
      level: 'info',
      msg: 'info string',
      timestamp: new Date(),
    })
    const tr = wrapper.find('tr')
    expect(tr.attributes().class).toMatch('info')
  })

  it('warning', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.appendLog({
      level: 'warning',
      msg: 'warning string',
      timestamp: new Date(),
    })
    const tr = wrapper.find('tr')
    expect(tr.attributes().class).toMatch('warning')
  })

  it('error', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.appendLog({
      level: 'error',
      msg: 'error string',
      timestamp: new Date(),
    })
    const tr = wrapper.find('tr')
    expect(tr.attributes().class).toMatch('error')
  })

  it('verbose', () => {
    const wrapper = mount(Log, { localVue })
    wrapper.vm.appendLog({
      level: 'verbose',
      msg: 'verbose string',
      timestamp: new Date(),
    })
    expect(wrapper.vm.logs.length).toBe(1)
  })

  it('multiple', () => {
    const wrapper = mount(Log, { localVue })
    for (let i = 0; i < 50; i++) {
      wrapper.vm.appendLog({ level: 'info', msg: `log message ${i}`, timestamp: new Date() })
    }
    wrapper.vm.appendLog({ level: 'warn', msg: 'watch out!', timestamp: new Date() })
    wrapper.vm.appendLog({ level: 'error', msg: 'error string that is somewhat longer', timestamp: new Date() })
    wrapper.vm.appendLog({ level: 'debug', msg: 'details ... ', timestamp: new Date() })
    expect(wrapper.vm.logs.length).toBe(53)
    expect(wrapper.vm.filteredLogs.length).toEqual(52)
  })
})
