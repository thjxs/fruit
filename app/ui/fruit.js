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
    <div class="mx-auto fruit-container">
      <img
        id="fruit-img"
        class="fruit-img opacity-0 mx-auto"
        src="/images/${state.hash}"
      />
      <h2 class="fruit-text text-xl">
        <span class="inline-block w-32 text-right mr-4">Artist: </span
        >${state.artist}
      </h2>
      <p class="fruit-text">
        <span class="inline-block w-32 text-right mr-4">year: </span
        >${state.year}
      </p>
      <p class="fruit-text">
        <span class="inline-block w-32 text-right mr-4">Scientific name: </span
        >${state.scientific_name}
      </p>
      <p class="fruit-text">
        <span class="inline-block w-32 text-right mr-4">Common name: </span
        >${state.common_name}
      </p>
    </div>
  `;
}
