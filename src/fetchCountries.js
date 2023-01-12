export { fetchCountries };

const BASE_URL = 'https://restcountries.com/v3.1';

const fetchCountries = name => {
  return fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
