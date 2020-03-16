import { ipcRenderer } from 'electron';

function loadImg(current) {
  ipcRenderer.send('loadImage', current);
}
function adjustWin(type) {
  ipcRenderer.send(type);
}
export default function(state, emitter) {
  state.fruitData = {
    artist: null,
    common_name: null,
    scientific_name: null,
    year: null,
    imgUrl: null
  };
  state.current = 0;
  state.loading = true;
  function render() {
    emitter.emit('render');
  }
  ipcRenderer.on('cached', (e, msg) => {
    state.fruitData = msg.fruitData;
    state.loading = false;
    setTimeout(() => {
      let el = document.getElementById('fruit-img');
      el.classList.add('opacity-100');
    }, 100);
    render();
  });
  emitter.on('loadImg', current => {
    state.current = current;
    state.loading = true;
    loadImg(current);
    render();
  });
  emitter.on('DOMContentLoaded', () => {
    loadImg(state.current);
  });
  emitter.on('max', () => {
    if (state.maxed) {
      adjustWin('unmax');
      state.maxed = false;
    } else {
      adjustWin('max');
      state.maxed = true;
    }
  });
  emitter.on('min', () => {
    adjustWin('min');
  });
  emitter.on('close', () => {
    adjustWin('close');
  });
}
