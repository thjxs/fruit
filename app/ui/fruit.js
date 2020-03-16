import html from 'choo/html';

export default function fruit(state, loading) {
  if (loading) {
    return html`
      <div class="mx-auto">
        <div class="loader">
          <svg class="circular" viewBox="25 25 50 50">
            <circle
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
      </div>
    `;
  }
  return html`
    <div class="mx-auto">
      <img
        id="fruit-img"
        class="fruit-img opacity-0"
        src="/images/${state.hash}"
      />
      <h2 class="text-white">Artist: ${state.artist}</h2>
      <p class="text-white">year: ${state.year}</p>
      <p class="text-white">Scientific name: ${state.scientific_name}</p>
      <p class="text-white">Common name: ${state.common_name}</p>
    </div>
  `;
}
