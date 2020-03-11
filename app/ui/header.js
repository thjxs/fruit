const html = require('choo/html');
const Component = require('choo/component');

class Header extends Component {
  constructor(name, state, emit) {
    super(name);
    this.state = state;
    this.emit = emit;
  }

  update() {
    return false;
  }

  createElement() {
    return html`
      <header class="main-header">Header</header>
    `;
  }
}
module.exports = Header;
