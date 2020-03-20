import Rpc from './utils/rpc';
export default function(state, emitter) {
  const rpc = new Rpc(emitter);
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
  rpc.on('cached', data => {
    state.fruitData = data.fruitData;
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
    rpc.emit('loadImg', current);
    render();
  });
  emitter.on('ready', () => {
    rpc.emit('loadImg', state.current);
  });
  emitter.on('DOMContentLoaded', () => {
    // rpc.emit('loadImg', state.current)
  });
  emitter.on('max', () => {
    if (state.maxed) {
      rpc.emit('unmax', null);
      state.maxed = false;
    } else {
      rpc.emit('max', null);
      state.maxed = true;
    }
  });
  emitter.on('min', () => {
    rpc.emit('min', null);
  });
  emitter.on('close', () => {
    rpc.emit('close', null);
  });
}
