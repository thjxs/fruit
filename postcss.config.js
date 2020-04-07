const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./app/ui/*.js', './app/*.js'],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

const options = {
  plugins: [require('tailwindcss')],
};

if (process.env.NODE_ENV === 'production') {
  options.plugins.push(purgecss);
  options.plugins.push(require('cssnano'));
}

module.exports = options;
