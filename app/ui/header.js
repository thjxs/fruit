const html = require('choo/html');
const Component = require('choo/component');

class Header extends Component {
  constructor(name, state, emit) {
    super(name);
    this.state = state;
    this.emit = emit;
  }

  max() {
    this.emit('max');
  }

  min() {
    this.emit('min');
  }

  close() {
    this.emit('close');
  }

  update() {
    return false;
  }

  createElement() {
    return html`
      <header class="main-header flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          id="header-logo"
        >
          <!-- head -->
          <path d="M11,0 v2 h2 v-1 h-1 v-1 h-1" fill="red" />
          <!-- back -->
          <path
            d="M4,7 v2 h1 v-2z M19,7 v2 h1 v-2z
            M4,14 v1 h-1 v1 h1 v2 h1 v1 h1 v1 h1 v1 h10
            v-1 h1 v-1 h1 v-1 h1 v-2 h1 v-1 h-1 v-1"
            fill="#fec712"
          />
          <!-- main -->
          <path
            d="M13,2 h2 v1 h2 v1 h1 v1 h1 v4 h2 v1 h1 v1 h1 v4 h-3 v-1 h-1 v4
            h-1 v1 h-1 v1 h-10
            v-1 h-1 v-1 h-1 v-4 h-1 v1 h-3 v-4 h1 v-1 h1 v-1 h2 v-4
            h1 v-1 h1 v-1 h2 v-1"
            fill="#fef200"
          />
          <!-- foot eye -->
          <path
            d="M8,20 v2 h-1 v1 h3 v-1 h-1 v-2
            M15,20 v2 h-1 v1 h3 v-1 h-1 v-2
            M9,7 v1 h1 v-1
            M14,7 v1 h1 v-1"
            fill="back"
          />
          <path d="M11,9 v2 h2 v-2" fill="orange" />
          <path
            d="M70,70 v30 h-10 v70 h10 v20 h10 v10 h10 v10 h10 v10 h100
            v-10 h10 v-10 h10 v-10 h10 v-30 h10 v10 h-10 v-100
            "
            stroke="#fec712"
            stroke-width="10"
            fill="#fec712"
          />
          <path
            d="M 150,30 h30, v10, h20, v10, h10, v10, h10, v40 h20
            v10 h10 v10 h10 v40 h-20 v-10 h-20 v40 h-10 v10
            h-10 v10 h-100
            v-10 h-10 v-10 h-10 v-40 h-20 v10 h-20 v-40 h10
            v-10 h10 v-10 h20 v-40 h10 v-10 h10 v-10 h20 v-10z
            "
            fill="#fef200"
            stroke="#fef200"
          />
          <path
            d="M 140,0 v20 h20"
            stroke="red"
            fill="none"
            stroke-width="10"
          />
          <path
            d="M 120,80 h10 M 170,80 h10"
            stroke="black"
            stroke-width="10"
          />
          <path d="M 140,100 h20 v20 h-20 z" fill="#ff7f26" stroke-width="10" />
          <path
            d="M110,215 v20 M95,240 h30 M190,215 v20 M175,240 h30"
            fill="black"
            stroke="black"
            stroke-width="10"
          />
        </svg>
        <div class="tool-bar flex">
          <button
            onclick="${() => {
              this.min();
            }}"
            class="px-1"
          >
            <svg
              class="fill-current text-gray-500 hover:bg-red-100"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h12v2H6z" />
            </svg>
          </button>
          <button
            onclick="${() => {
              this.max();
            }}"
            class="px-1"
          >
            <svg
              class="fill-current text-gray-500 hover:bg-red-100"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
              />
            </svg>
          </button>
          <button
            onclick="${() => {
              this.close();
            }}"
            class="px-1"
          >
            <svg
              class="fill-current text-gray-500 hover:bg-red-700 hover:text-white"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>
      </header>
    `;
  }
}
module.exports = Header;
