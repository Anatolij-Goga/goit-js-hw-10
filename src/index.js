import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputElement = document.getElementById('search-box');
const listElement = document.querySelector('.country-list');
const infoElement = document.querySelector('country-info');

const countriesListMarkup = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official} width="60" height="60">${name.official}</li>`
    )
    .join();
};

// countriesInfoMarkup
