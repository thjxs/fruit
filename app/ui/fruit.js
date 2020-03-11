import html from 'choo/html'

export default function fruit(state, loading) {
  if (loading) {
    return html`
      <div class="mx-auto">
        <img src="/images/loading.gif">
      </div>
    `
  }
  return html`
    <div class="mx-auto">
      <img class="fruit-img" src="/images/${state.imgUrl}">
      <h2 class="text-white">Artist: ${state.artist}</h2>
      <p class="text-white">year: ${state.year}</p>
      <p class="text-white">Scientific name: ${state.scientific_name}</p>
      <p class="text-white">Common name: ${state.common_name}</p>
    </div>
  `
}
