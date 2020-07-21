window.onload = function () {
  const endpoint = `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`;
  const searchInput = document.querySelector(".search");
  const suggestions = document.querySelector(".suggestions");
  const cities = [];

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => cities.push(...data));

  function findMatchs(inputToMatch, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(inputToMatch, "gi");
      return place.city.match(regex) || place.state.match(regex);
    });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function displayMatches(x) {
    const matchArray = findMatchs(x.value, cities);
    const html = matchArray.map((place) => {
      const regex = new RegExp(x.value, 'gi')
      const cityName = place.city.replace(
        regex,
        `<span class="h1">${x.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="h1">${x.value}</span>`
      );
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
    }).join('');

    suggestions.innerHTML = html
  }

  function displayDef() {
    const html = `<li>
          <span class="name">Filter for A City</>
        </li>
        <li>
          <span class="name">Or A State</span>
        </li>`;
    suggestions.innerHTML = html
  }

  function valueCheck() {
    if (this.value === '') {
      displayDef();
    } else {
      displayMatches(this);
    }
  }

  searchInput.addEventListener("change", valueCheck);
  searchInput.addEventListener("keyup", valueCheck);
};
