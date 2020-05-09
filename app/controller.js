import Rpc from './utils/rpc';
export default function (state, emitter) {
  const rpc = new Rpc(emitter);
  state.fruitData = {
    artist: null,
    common_name: null,
    scientific_name: null,
    year: null,
    imgUrl: null,
  };
  state.current = 0;
  state.loading = true;
  function render() {
    emitter.emit('render');
  }
  function keyPressed(code) {
    if (code === 39 || code === 37) {
      const i = code === 39 ? 1 : -1;
      if (i === -1 && state.current === 0) {
        return;
      }
      emitter.emit('loadImg', state.current + i);
    }
  }
  rpc.on('cached', (data) => {
    if (data.cached) {
      state.fruitData = data.fruitData;
      state.loading = false;
      setTimeout(() => {
        let el = document.getElementById('fruit-img');
        el.classList.add('opacity-100');
        el.classList.add('fade-in');
        el.style.transform = 'scale(1)';
      }, 100);
    } else {
      state.loading = true;
    }

    render();
  });
  emitter.on('loadImg', (current) => {
    state.current = current;
    rpc.emit('loadImg', current);
    render();
  });
  emitter.on('ready', () => {
    rpc.emit('loadImg', state.current);
  });
  emitter.on('DOMContentLoaded', () => {
    document.addEventListener('keyup', function (e) {
      keyPressed(e.keyCode);
    });
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
