import html from 'choo/html';
import Furit from './fruit'

export default function mainView(state, emit) {
  function prev() {
    if (state.current === 0) {
      return
    }
    emit('loadImg', state.current - 1)
  }
  function next() {
    emit('loadImg', state.current + 1)
  }

  return html`
    <div class="flex flex-1 items-center">
    ${Furit(state.fruitData, state.loading)}
    </div>
    <div class="flex justify-center">
      <button class="bg-gray-300 hover:bg-gray-400 m-2 px-2 rounded" onclick="${prev}">prev</button>
      <button class="bg-gray-300 hover:bg-gray-400 m-2 px-2 rounded" onclick="${next}">next</button>
    </div>
  `;
}
