import html from 'choo/html';
import Furit from './fruit';

export default function mainView(state, emit) {
  function prev() {
    if (state.current === 0) {
      return;
    }
    emit('loadImg', state.current - 1);
  }
  function next() {
    emit('loadImg', state.current + 1);
  }

  return html`
    <div class="flex flex-1 items-center">
      <button
        class="bg-gray-300 hover:bg-gray-400 py-4 m-2 px-2 rounded"
        onclick="${prev}"
      >
        <svg
          class="h-8 w-8 transform rotate-180"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
        </svg>
      </button>
      ${Furit(state.fruitData, state.loading)}
      <button
        class="bg-gray-300 hover:bg-gray-400 py-4 m-2 px-2 rounded"
        onclick="${next}"
      >
        <svg
          class="h-8 w-8"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
        </svg>
      </button>
    </div>
  `;
}
