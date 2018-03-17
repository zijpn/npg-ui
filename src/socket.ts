import io from 'socket.io-client'

let autoConnect = true
if (process.env.VUE_APP_SOCKET === 'false') {
  autoConnect = false
}

const socket = io({
  autoConnect,
  path: '/api',
})

export default socket
