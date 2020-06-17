const options = {
  plugins: [require('tailwindcss')],
};

if (process.env.NODE_ENV === 'production') {
  options.plugins.push(require('cssnano'));
}

module.exports = options;
