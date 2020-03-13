const html = require('choo/html');
const Header = require('./header')

module.exports = function body(main) {
  return function(state, emit) {
    return html`
      <body class="w-screen h-screen flex flex-col">
        ${state.cache(Header, 'header').render()}
        ${main(state, emit)}
      </body>
    `;
  };
};
