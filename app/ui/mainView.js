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
  function save() {
    emit('save')
  }

  return html`
    <div class="flex">
    ${Furit(state.fruitData[state.current], state.loading)}
    </div>
    <div class="flex justify-center">
      <button class="bg-gray-300 hover:bg-gray-400 m-2 p-2 rounded" onclick="${prev}">prev</button>
      <button class="bg-gray-300 hover:bg-gray-400 m-2 p-2 rounded" onclick="${save}">save</button>
      <button class="bg-gray-300 hover:bg-gray-400 m-2 p-2 rounded" onclick="${next}">next</button>
    </div>
  `;
}
