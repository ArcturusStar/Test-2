'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function renderCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${Number(
            data.population / 1000000
          ).toFixed()}M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
      </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
}

/*

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${
      Object.entries(data.languages)[0][1]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.entries(Object.entries(data.currencies)[0][1])[0][1]
    }</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //countriesContainer.style.opacity = 1;
};
*/

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

/*const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://restcountries.com/v3.1/name/{portugal}');
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${
      data.languages[Object.keys(data.languages)[0]]
    }</p>
    <p class="country__row"><span>💰</span>${
      data.currencies[Object.keys(data.currencies)[0]].name
    }</p>
  </div>
</article>
`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('usa');

//const html = `<article class="country">
//<img class="country__img" src="${data.flag}" />
//<div class="country__data">
//  <h3 class="country__name">${data.name}</h3>
//  <h4 class="country__region">${data.region}</h4>
//  <p class="country__row"><span>👫</span>${(
//    +data.population / 1000000
//  ).toFixed(1)}</p>
//  <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
//  <p class="country__row"><span>💰</span>${data.currencies}</p>
//</div>
//</article>

*/

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  console.log(request.responseText);

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) returns;

    // AJAX call country 2

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

/*

const countriesContainer = document.querySelector('.countries');
 
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
 
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);     // this will                           
 
    const languages = Object.values(data.languages);
   const currencies = Object.values(data.currencies);
    const html = `
  <article class="country">
 <img class="country__img" src= "${data.flags.svg}">
 <div class="country__data">
   <h3 class="country__name"> ${data.name.official}</h3>
   <h4 class="country__region">${data.region}</h4>
   <p class="country__row"><span>👫</span>${(data.population/1000000).toFixed(1)} million</p>         
   <p class="country__row"><span>🗣️</span>${languages[0]}</p>
   <p class="country__row"><span>💰</span>${currencies[0].name}</p>
 </div>
</article>`;
 
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
}

*/

//const request = new XMLHttpRequest();
//request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//request.send();

//const request = fetch('https://restcountries.com/v3.1/name/${country}');
//console.log(request);
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      //  const neighbour = data[0].borders[0];

      const neighbour = 'daeraaewrw';

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. TRY AGAIN!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

*/

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`)
    .then(data => {
      renderCountry(data[0]);
      console.log(data);
      const [neighbour] = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. TRY AGAIN!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

//getCountryData('dater2134');
