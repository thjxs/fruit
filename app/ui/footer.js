const html = require('choo/html');
const Component = require('choo/component');

class Footer extends Component {
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
      <footer>I'm footer</footer>
    `;
  }
}

module.exports = Footer;
