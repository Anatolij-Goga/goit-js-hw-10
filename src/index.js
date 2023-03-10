import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const { searchInput, countryList, countryInfo } = refs;

const DEBOUNCE_DELAY = 300;

searchInput.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(event) {
  const searchKey = event.target.value.trim();

  if (searchKey === '') {
    clearCountryList();
    clearCountryInfo();
  } else {
    fetchCountries(searchKey)
      .then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          clearCountryList();
          clearCountryInfo();
        } else if (data.length >= 2 && data.length <= 10) {
          clearCountryInfo();
          countryList.innerHTML = countryListMurkup(data);
        } else {
          clearCountryList();
          countryInfo.innerHTML = countryInfoMurkup(data);
        }
      })
      .catch(error => {
        console.log(error);
        Notify.failure('Oops, there is no country with that name.');
        clearCountryList();
        clearCountryInfo();
      });
  }
}

function countryListMurkup(countryData) {
  return countryData
    .map(({ name, flags }) => {
      return `<li class="country-list__item"><img src="${flags.svg}" alt="${name.common}" class="country-list_img"><span class="country-list__name">${name.common}</span></li>`;
    })
    .join('');
}

function countryInfoMurkup(countryData) {
  return countryData
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class="country-info__name"><img src="${flags.svg}" alt="${
        name.common
      }" class="country-info__img" />${name.official}</div>
        <p><span class="country-info__bold">Capital: </span>${capital}</p>
        <p><span class="country-info__bold">Population: </span>${population}</p>
        <p><span class="country-info__bold">Languages: </span>${Object.values(
          languages
        ).join(', ')}</p>`;
    })
    .join('');
}

function clearCountryList() {
  countryList.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}
