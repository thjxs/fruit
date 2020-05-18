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
        class="fruit-img opacity-0 mx-auto"
        src="/images/${state.hash}"
      />
      <h2 class="fruit-text">Artist: ${state.artist}</h2>
      <p class="fruit-text">year: ${state.year}</p>
      <p class="fruit-text">Scientific name: ${state.scientific_name}</p>
      <p class="fruit-text">Common name: ${state.common_name}</p>
    </div>
  `;
}
