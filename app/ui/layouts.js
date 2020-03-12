const html = require('choo/html');

module.exports = function body(main) {
  return function(state, emit) {
    return html`
      <body class="w-screen h-screen flex flex-col">
        ${main(state, emit)}
      </body>
    `;
  };
};
