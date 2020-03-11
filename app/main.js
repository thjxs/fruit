import choo from 'choo'
import {ipcRenderer} from 'electron'
import './main.css'
import layouts from './ui/layouts'
import mainView from './ui/mainView'
import data from './fruit'

var app = choo({hash: true})

app.use((state, emitter) => {
  state.fruitData = data
  state.current = 0
  state.loading = true
  ipcRenderer.on('cached', (e, msg) => {
    state.fruitData[state.current].imgUrl = msg.hash
    state.loading = false
    emitter.emit('render')
  })
  emitter.on('loadImg', (current) => {
    state.current = current
    state.loading = true
    ipcRenderer.send('loadImage', state.fruitData[state.current].origin)
    emitter.emit('render');
  })
  emitter.on('DOMContentLoaded', () => {
    console.log('loaded');

    ipcRenderer.send('loadImage', state.fruitData[state.current].origin)
  })
})
app.route('/', layouts(mainView))
app.mount('body')
